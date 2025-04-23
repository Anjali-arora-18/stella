<template>
  <div>
    <Header :restDetails="restDetails" :categories="categories" />
    <main class="screen_content">
      <RestaurantDetails :restDetails="restDetails" />
      <RestaurantItems :categories="categories" :menuItems="menuItems" />
    </main>
  </div>
</template>
<script setup>
import Header from '@/components/UI/Header.vue'
import RestaurantDetails from '@/components/RestaurantDetails.vue'
import RestaurantItems from '@/components/UI/RestaurantItems.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const categories = ref([])
const menuItems = ref([])
const restDetails = ref(null)
const route = useRoute()
onMounted(async () => {
  const url = import.meta.env.VITE_APP_API_URL
  const outletName = window.location.hostname.split('.')[0]
  axios
    .get(`${url}outletsvo`, {
      params: {
        outletName: outletName,
      },
    })
    .then((response) => {
      if (response.data.length) {
        restDetails.value = response.data[0]
      }
    })
  axios
    .get(`${url}menuCategoriesvo`, {
      params: {
        outletName: outletName,
      },
    })
    .then((response) => {
      if (response.data.length) {
        categories.value = response.data
      }
    })
  axios
    .get(`${url}menuItemsvo`, {
      params: {
        outletName: outletName,
      },
    })
    .then((response) => {
      if (response.data.length) {
        menuItems.value = response.data
      }
    })
})
</script>
