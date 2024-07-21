import {
    computed, isRef, type MaybeRef, ref, type Ref,
    watch,
} from 'vue';
import useMounted from './useMounted';
import useMutationObserver, { type MaybeElement } from './useMutationObserver';

type UseQuerySelectorOptions = {
    root?: MaybeElement;
};

type UseQuerySelectorReturn = {
    stop: () => void;
    element: Readonly<Ref<Element | null>>;
};

const useQuerySelector = (
    selector: MaybeRef<string>,
    { root = document.documentElement }: UseQuerySelectorOptions = {},
): UseQuerySelectorReturn => {
    const rootRef = ref(root);
    const isMounted = useMounted();

    const selectorRef = computed(() => (isRef(selector)
        ? selector.value
        : selector));

    const result = ref<Element | null>(null);

    // Find the first matching element inside a root element
    const findElement = (
        rootItem: ParentNode,
    ): Element | null => rootItem.querySelector(selectorRef.value);

    // Check if a given element matches the selector
    const matches = (element: Element): boolean => element.matches(selectorRef.value);

    // Check if a given element precedes the current result
    const precedes = (
        otherElement: Element,
    ): boolean => !result.value
        || (result.value.compareDocumentPosition(otherElement)
            && Node.DOCUMENT_POSITION_PRECEDING) !== 0;

    // Reset the result whenever the selector or the root node changes
    watch(
        [selectorRef, rootRef, isMounted],
        () => {
            if (rootRef.value instanceof HTMLElement || rootRef.value instanceof Document) {
                result.value = findElement(rootRef.value);
            }
        },
        { immediate: true },
    );

    const observer = useMutationObserver(
        rootRef,
        (mutations: MutationRecord[]) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Handle removed elements
                    if (result.value) {
                        Array.from(mutation.removedNodes).forEach((removedNode) => {
                            if (removedNode instanceof Element && removedNode.contains(result.value)
                                && (rootRef.value instanceof HTMLElement || rootRef.value instanceof Document)
                                && (removedNode.classList.contains(selectorRef.value) || removedNode.id === selectorRef.value)) {
                                result.value = findElement(rootRef.value);
                            }
                        });
                    }

                    // Handle added elements
                    Array.from(mutation.addedNodes).forEach((addedNode) => {
                        if (addedNode instanceof Element) {
                            if (!precedes(addedNode)) {
                                return;
                            }

                            if (matches(addedNode) && (addedNode.classList.contains(selectorRef.value) || addedNode.id === selectorRef.value)) {
                                result.value = addedNode;
                            } else if (addedNode.classList.contains(selectorRef.value) || addedNode.id === selectorRef.value) {
                                result.value = findElement(addedNode);
                            }
                        }
                    });
                } else if (mutation.type === 'attributes') {
                    // Handle changed attributes
                    if (result.value === mutation.target) {
                        if (mutation.target instanceof Element && !matches(mutation.target)
                            && (rootRef.value instanceof HTMLElement || rootRef.value instanceof Document)
                            && (mutation.target.classList.contains(selectorRef.value) || mutation.target.id === selectorRef.value)) {
                            result.value = findElement(rootRef.value);
                        }
                    } else if (mutation.target instanceof Element
                        && matches(mutation.target) && precedes(mutation.target)
                        && (mutation.target.classList.contains(selectorRef.value) || mutation.target.id === selectorRef.value)
                    ) {
                        result.value = mutation.target;
                    }
                }
            });
        },
        {
            childList: true,
            subtree: false,
            attributes: true,
        },
    );

    return {
        stop: observer.stop,
        element: result,
    };
};

export default useQuerySelector;
