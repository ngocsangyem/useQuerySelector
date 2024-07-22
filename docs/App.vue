<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <Banner class="mb-4" />

                <Card
                    id="card"
                    title="Card 1"
                    :image-src="image1"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import Card from './components/Card.vue';
import Banner from './components/Banner.vue';
import image1 from './images/images-1.avif';
</script>
