<template>
  <div>
    <Header :restDetails="restDetails" :categories="filteredCategories" />
    <main class="screen_content">
      <RestaurantDetails :restDetails="restDetails" />
      <RestaurantItems
        style="margin-top: 20px"
        v-if="!isLoading"
        :selectedCategory="selectedCategory"
        :categories="filteredCategories"
      />
    </main>
  </div>
</template>
<script setup>
import Header from '@/components/UI/Header.vue'
import RestaurantDetails from '@/components/RestaurantDetails.vue'
import RestaurantItems from '@/components/UI/RestaurantItems.vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
const categories = ref([])
const restDetails = ref(null)
const selectedCategory = ref('')
const isLoading = ref(false)
const route = useRoute()
const url = import.meta.env.VITE_APP_API_URL
const outletName = window.location.hostname.split('.')[0]
const getMenuItems = async (item) => {
  axios
    .get(`${url}menuItemsvo`, {
      params: {
        outletName: outletName,
        categoryId: item._id,
      },
    })
    .then((response) => {
      const categoryIndex = categories.value.findIndex((category) => category._id === item._id)
      if (categoryIndex !== -1) {
        const itemsWithSubCategories = response.data.filter((item) => item.subCategories.length)
        const itemsWithoutSubCategories = response.data.filter((item) => !item.subCategories.length)
        categories.value[categoryIndex] = {
          ...categories.value[categoryIndex],
          menuItems: itemsWithoutSubCategories,
          subCategories: categories.value[categoryIndex].subCategories.map((e) => {
            const subCategoryItems = itemsWithSubCategories.filter(
              (item) => item.subCategories && item.subCategories.includes(e._id),
            )
            return {
              ...e,
              menuItems: subCategoryItems,
            }
          }),
        }
        if (!selectedCategory.value) {
          selectedCategory.value = categories.value[categoryIndex]
        }
      }
    })
}

const filteredCategories = computed(() => {
  return categories.value.filter(
    (category) =>
      category.menuItems.length > 0 ||
      (category.subCategories.length &&
        category.subCategories.filter((a) => a.menuItems.length).length),
  )
})

onMounted(async () => {
  isLoading.value = true
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
        categories.value = res.data.map((e) => ({
          ...e,
          menuItems: [],
          subCategories: e.subCategories.map((subCategory) => ({
            ...subCategory,
            menuItems: [],
          })),
        }))
        res.data.forEach(async (category) => {
          await getMenuItems(category)
        })
      }
    })
  isLoading.value = false
})
</script>
