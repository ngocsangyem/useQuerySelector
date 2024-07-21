import useMutationObserver, {
  notNullish,
  tryOnScopeDispose,
  isVueInstance,
  unrefElement,
} from './useMutationObserver';
import useMounted from './useMounted';
import useQuerySelector from './useQuerySelector';

export type {
  ConfigurableWindow,
  VueInstance,
  MaybeElement,
  MaybeElementRef,
  MaybeComputedElementRef,
  UnRefElementReturn,
  UseMutationObserverOptions,
  UseMutationObserverReturn,
} from './useMutationObserver.ts';

export {
  useMutationObserver,
  useMounted,
  useQuerySelector,
  notNullish,
  tryOnScopeDispose,
  isVueInstance,
  unrefElement,
}