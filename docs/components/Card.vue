<template>
    <div class="card" style="width: 18rem;">
        <img :src="imageSrc"
            class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
        </div>
    </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  }
})
</script>