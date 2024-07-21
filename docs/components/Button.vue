<template>
    <button @click="onToggleCard" type="button" class="btn btn-primary">
        {{ buttonLabel }}
    </button>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['clicked'])

const buttonLabel = ref('Show card');
const isToggled = ref(false);

const onToggleCard = () => {
    isToggled.value = !isToggled.value;

    emit('clicked', isToggled.value);

    buttonLabel.value = isToggled.value ? 'Hide card' : 'Show card';
};
</script>