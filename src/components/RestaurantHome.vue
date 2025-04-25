<template>
  <div>
    <Header :restDetails="restDetails" :categories="categories" />
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
  if (!selectedCategory.value) {
    selectedCategory.value = item
  }
  axios
    .get(`${url}menuItemsvo`, {
      params: {
        outletName: outletName,
        categoryId: item._id,
      },
    })
    .then((response) => {
      const name = item._id
      menuItems.value[name] = response.data.map((menu) => {
        return { ...menu, category_id: item._id }
      })
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
        outletName: restDetails.value.name,
      },
    })
    .then((res) => {
      if (res.data.length) {
        categories.value = res.data
        res.data.forEach((category) => {
          getMenuItems(category)
        })
      }
    })
})
</script>
