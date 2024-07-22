<template>
    <div class="alert alert-info" role="alert">
        Card id {{ element?.id }}
    </div>
</template>

<script setup>
import { useQuerySelector } from '../../src';

const { element } = useQuerySelector('#card');
</script>