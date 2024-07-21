import {
  type ComponentPublicInstance, computed, getCurrentScope, type MaybeRef, type MaybeRefOrGetter,
  onScopeDispose, toValue, watch,
} from 'vue';

/**
 * Configurable window instance
 * @reference vueuse/core
 * @see https://vueuse.org/
 */
export type ConfigurableWindow = {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
      */
  window?: Window;
};

/**
 * Vue instance type
 * @reference vueuse/core
 * @see https://vueuse.org/
 */
export type VueInstance = ComponentPublicInstance;
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;
export type MaybeElementRef<Type extends MaybeElement = MaybeElement> = MaybeRef<Type>;
export type MaybeComputedElementRef<
  Type extends MaybeElement = MaybeElement
> = MaybeRefOrGetter<Type>;
export type UnRefElementReturn<Type extends MaybeElement = MaybeElement> = Type extends VueInstance
  ? Exclude<MaybeElement, VueInstance> : Type | undefined;
export type UseMutationObserverOptions = MutationObserverInit & ConfigurableWindow;

export const notNullish = <Type = unknown>(val?: Type | null | undefined): val is Type => val != null;

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 * @reference vueuse/core
 * * @see https://vueuse.org/
 * @param fn
 */
export const tryOnScopeDispose = (fn: () => void) => {
  if (getCurrentScope()) {
    onScopeDispose(fn);

    return true;
  }

  return false;
};

export const isVueInstance = (el: unknown): el is VueInstance => el !== null && typeof el === 'object' && '$el' in el;

/**
 * Get the dom element of a ref of element or Vue component instance
 * @reference vueuse/core
 * @see https://vueuse.org/
 * @param elRef
 */
export const unrefElement = <Type extends MaybeElement>(
  elRef: MaybeComputedElementRef<Type>,
): UnRefElementReturn<Type> => {
  const plain = toValue(elRef);

  if (isVueInstance(plain)) {
    return plain.$el as UnRefElementReturn<Type>;
  }

  return plain as UnRefElementReturn<Type>;
};

/**
 * Reactive MutationObserver
 * @reference vueuse/core
 * @see https://vueuse.org/core/useMutationObserver/#usemutationobserver
 * @param target
 * @param callback
 * @param options
 */
const useMutationObserver = (
  target: MaybeComputedElementRef | MaybeComputedElementRef[] | MaybeRefOrGetter<MaybeElement[]>,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) => {
  const { window, ...mutationOptions } = options;
  let observer: MutationObserver | undefined;

  const isSupported = computed(() => typeof window !== 'undefined' && 'MutationObserver' in window);

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const targets = computed(() => {
    const value = toValue(target);
    const items = (Array.isArray(value)
      ? value
      : [value])
      .map(unrefElement)
      .filter(notNullish);

    return new Set(items);
  });

  const stopWatch = watch(
    () => targets.value,
    (targetsList) => {
      cleanup();

      if (targetsList.size) {
        observer = new MutationObserver(callback);
        targetsList.forEach((el) => observer!.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: 'post' },
  );

  const takeRecords = () => observer?.takeRecords();

  const stop = () => {
    stopWatch();
    cleanup();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop,
    takeRecords,
  };
};

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>;

export default useMutationObserver;
