<template>
  <div>
    <Header />
    <main class="screen_content">
      <RestaurantDetails />
      <RestaurantItems />
    </main>
  </div>
</template>
<script setup>
import Header from '@/components/UI/Header.vue'
import RestaurantDetails from '@/components/RestaurantDetails.vue'
import RestaurantItems from '@/components/UI/RestaurantItems.vue'
</script>
