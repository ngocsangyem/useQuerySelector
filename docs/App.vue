<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <Button class="mb-4" @clicked="onToggle" />

                <div class="alert" role="alert" :class="{
                    'alert-success': isElementVisible,
                    'alert-info': !isElementVisible
                }">
                    Card id
                    <template v-if="element && element.id">
                        {{ element.id }}
                    </template>
                </div>

                <Card
                    v-if="cardId === '#card1'"
                    id="card1"
                    title="Card 1"
                    image-src="https://fastly.picsum.photos/id/10/2500/1667"
                />
                <Card
                    v-else
                    id="card2"
                    title="Card 2"
                    image-src="https://fastly.picsum.photos/id/11/2500/1667"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuerySelector } from '../src';
import Card from './components/Card.vue';
import Button from './components/Button.vue';

const isCardVisible = ref(true);
const cardId = ref('#card1');

const { element } = useQuerySelector(cardId);

const onToggle = (value) => {
    isCardVisible.value = value;

    cardId.value = isCardVisible.value ? '#card1' : '#card2';
}
</script>
