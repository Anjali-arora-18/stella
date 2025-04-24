<template>
  <div>
    <Header @getCat="getMenuItems" :restDetails="restDetails" :categories="categories" />
    <main class="screen_content">
      <RestaurantDetails :restDetails="restDetails" />
      <RestaurantItems
        :selectedCategory="selectedCategory"
        :categories="categories"
        :menuItems="menuItems"
      />
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
const menuItems = ref({})
const restDetails = ref(null)
const selectedCategory = ref('')
const route = useRoute()
const url = import.meta.env.VITE_APP_API_URL
const outletName = window.location.hostname.split('.')[0]
const getMenuItems = async (item) => {
  selectedCategory.value = item
  axios
    .get(`${url}menuItemsvo`, {
      params: {
        outletName: outletName,
        categoryId: item.id,
      },
    })
    .then((response) => {
      if (response.data.length) {
        const name = selectedCategory.value.name.trim()
        menuItems.value[name] = response.data.map((item) => {
          return { ...item, category_id: selectedCategory.value.wCode }
        })
        console.log(menuItems.value)
      }
    })
}

onMounted(async () => {
  const response = await axios.get(`${url}outletsvo`, {
    params: {
      outletName: outletName,
    },
  })
  if (response.data.length) {
    restDetails.value = response.data[0]
  }
  await axios
    .get(`${url}menuCategoriesvo`, {
      params: {
        outletName: response.data._id,
      },
    })
    .then((res) => {
      if (res.data.length) {
        categories.value = res.data
        selectedCategory.value = res.data[0]
        const name = selectedCategory.value.name.trim()
        menuItems.value[name] = []
        getMenuItems(res.data[0])
      }
    })
})
</script>
