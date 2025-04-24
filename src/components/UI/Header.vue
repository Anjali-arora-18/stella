<template>
  <div ref="pageContainer" class="page-container" @scroll.passive="onScroll">
    <div class="header-section">
      <div
        v-if="restDetails"
        class="cover-header"
        :style="{ background: `url(${restDetails.headerUrl})` }"
      ></div>
    </div>
    <div :style="{ height: isSticky ? `${headerHeight}px` : '0px' }"></div>
    <header :class="{ 'sticky-category': isSticky }" ref="categoryHeader" class="category-header">
      <nav>
        <ul class="menu">
          <li v-for="item in menuItems" :key="item.id">
            <button
              @click="scrollToSection(item)"
              :class="{ active: selectedItem && selectedItem.id === item.id }"
            >
              {{ toTitleCase(item.label) }}
            </button>
          </li>
        </ul>
        <ul class="menu" v-if="subCategories.length">
          <li v-for="item in subCategories" :key="item.id">
            <button
              @click="scrollToSubSection(item.id)"
              :class="{ active: selectedItem && selectedItem.id === item.id }"
            >
              {{ toTitleCase(item.label) }}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const emits = defineEmits(['getCat'])
const categoryHeader = ref(null)
const isSticky = ref(false)
const headerHeight = ref(0)
let headerOffsetTop = 0

const props = defineProps({
  categories: Array,
  restDetails: Object,
})

const toTitleCase = (text) => {
  if (!text) return ''
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const menuItems = computed(() => {
  return props.categories.map((category) => ({
    id: category._id,
    _id: category.wCode,
    name: category.name,
    label: category.name,
  }))
})

const subCategories = computed(() => {
  if (selectedItem.value) {
    const item = props.categories.find((a) => a._id === selectedItem.value)
    if (item) {
      return item.subCategories.map((e) => {
        return { label: e.name, id: e._id }
      })
    } else {
      return []
    }
  }
  return []
})
const selectedItem = ref(null)

const scrollToSection = (item) => {
  selectedItem.value = item._id
  const section = document.getElementById(item._id)
  emits('getCat', item)
  if (section) {
    const offset = (categoryHeader.value?.offsetHeight || 0) + 10
    const y = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
const scrollToSubSection = (id) => {
  selectedItem.value = id
  const section = document.getElementById(id)
  if (section) {
    const offset = (categoryHeader.value?.offsetHeight || 0) + 10
    const y = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
const handleScroll = () => {
  isSticky.value = window.scrollY >= headerOffsetTop
}
onMounted(() => {
  if (categoryHeader.value) {
    headerOffsetTop = categoryHeader.value.offsetTop
    headerHeight.value = categoryHeader.value.offsetHeight
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.page-container {
  width: 100%;
}
.category-header {
  background: white;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 600;
}

.sticky-category {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-section {
  width: 100%;
  height: 30vh;
  border-bottom-left-radius: 60% 5%;
  border-bottom-right-radius: 60% 5%;
}
.cover-header {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  background-size: contain !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  flex-direction: column;
}
.menu {
  list-style: none;
  display: flex;
  gap: 14px;
  margin: 0;
  padding: 6px;
}

.menu li button {
  background-color: #f0f0f0;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: #323232;
  transition: all 0.3s ease-in-out;
  padding: 8px;
  border-radius: 20px;
  border-bottom: none;
}

.menu li button:hover {
  background-color: #e0e0e0;
  color: #d9534f;
}

.menu li button.active {
  background-color: #d9534f;
  color: white;
  font-weight: bold;
}

.content {
  padding-top: 20px;
}

@media (max-width: 768px) {
  .header-section {
    font-size: 28px;
  }
  .cover-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-size: contain !important;
    background-repeat: no-repeat !important;
  }
  .category-header {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }

  /* .category-header::-webkit-scrollbar {
    display: none;
  }

  .category-header:hover {
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
  }

  .category-header::-webkit-scrollbar {
    height: 5px;
  }

  .category-header:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  .category-header:hover::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  } */

  .menu {
    display: flex;
    gap: 10px;
    overflow-x: auto;
  }

  .menu li {
    flex-shrink: 0;
  }

  .menu li button {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
