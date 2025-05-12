<template>
  <div>
    <Header :restDetails="restDetails" :categories="filteredCategories" />
    <main class="screen_content">
      <RestaurantDetails :restDetails="restDetails" />
      <RestaurantItems
        style="padding-top: 20px"
        :outlet="restDetails"
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
import { useMenuStore } from '@/stores/getMenu.js'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
const restDetails = ref(null)
const selectedCategory = ref('')
const isLoading = ref(false)
const route = useRoute()
const menuStore = useMenuStore()

const categories = computed(() => menuStore.categories)

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
  if (!categories.value.length) {
    await menuStore.getOutletDetails()
    await menuStore.getCategories()
  }
  // if (!selectedCategory.value) {
  //             selectedCategory.value = this.categories[categoryIndex]
  //           }

  isLoading.value = false
})
</script>
