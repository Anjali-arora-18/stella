<template>
  <div class="page_wrapper">
    <div >
      <Header v-if="restDetails" :restDetails="restDetails" :categories="filteredCategories" />
      <main class="screen_content">
        <RestaurantDetails v-if="showRestaurantDetails" :restDetails="restDetails" />
        <RestaurantItems
          style="padding-top: 20px"
          :outlet="restDetails"
          v-if="!isLoading"
          :selectedCategory="selectedCategory"
          :categories="filteredCategories"
        />
      </main>
    </div>
  </div>
</template>
<script setup>
import Header from '@/components/UI/Header.vue'
import RestaurantDetails from '@/components/RestaurantDetails.vue'
import RestaurantItems from '@/components/UI/RestaurantItems.vue'
import { useMenuStore } from '@/stores/getMenu.js'
import { ref, onMounted, computed } from 'vue'
const isLoading = ref(false)
const menuStore = useMenuStore()

const categories = computed(() => menuStore.categories)
const restDetails = computed(() => menuStore.restDetails)

const showRestaurantDetails = computed(() => {
  return restDetails.value && !restDetails.value.hideDetails
})

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
  isLoading.value = false
})
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  margin: 0 auto;
  padding-left: 0;
  padding-right: 0;
}

@media (min-width: 1024px) {
  .page_wrapper {
    max-width: 1280px;
    padding: 0 3rem;
    margin: auto;
  }
}
</style>
