import { getCurrentInstance, onMounted, ref } from 'vue';

/**
 * Detect if the component is mounted
 * @reference vueuse/core
 * @see https://vueuse.org/core/useMounted/#usemounted
 */

const useMounted = () => {
  const isMounted = ref(false);

  const instance = getCurrentInstance();

  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }

  return isMounted;
};

export default useMounted;
