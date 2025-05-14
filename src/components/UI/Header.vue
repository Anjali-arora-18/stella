<template>
  <div ref="pageContainer" class="page-container">
    <div class="header-section">
      <div v-if="restDetails" class="cover-header" :style="headerBackgroundStyle">
        <div class="header-overlay"></div>
        <div class="logo-container">
          <img :src="restDetails.logoUrl" alt="Restaurant Logo" class="restaurant-logo" />
        </div>
      </div>
    </div>
    <header :class="{ 'sticky-category': isSticky }" ref="categoryHeader" class="category-header">
      <nav>
        <ul class="menu">
          <li v-for="item in menuItems" :key="item.id">
            <button
              :id="`category-${item._id}`"
              @click="scrollToSection(item)"
              :class="{ active: selectedItem && selectedItem === item.id }"
              :style="getButtonStyle(selectedItem === item.id)"
            >
              {{ toTitleCase(item.label) }}
            </button>
          </li>
        </ul>
        <ul class="menu" v-if="subCategories.length">
          <li v-for="item in subCategories.filter((a) => a.menuItems.length)" :key="item.id">
            <button
              @click="scrollToSubSection(item.id)"
              :class="{ active: selectedSubCategory && selectedSubCategory === item.id }"
              :style="getButtonStyle(selectedSubCategory === item.id)"
              class="sub-category"
              :id="`sub-category-header-${item.id}`"
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
import { computed, ref, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const emits = defineEmits(['getCat'])
const categoryHeader = useTemplateRef('categoryHeader')
const isSticky = ref(false)
const headerHeight = ref(0)
const selectedItem = ref(null)
const selectedSubCategory = ref(null)
let headerOffsetTop = 150

const props = defineProps({
  categories: Array,
  restDetails: Object,
})

const headerBackgroundStyle = computed(() => {
  if (!props.restDetails) return {}

  const hasHeaderImage = props.restDetails.headerUrl && props.restDetails.headerUrl !== ''
  return hasHeaderImage
    ? {
        background: `url(${props.restDetails.headerUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }
    : { backgroundColor: props.restDetails.headerColor }
})

const getButtonStyle = (isActive) => {
  const primaryColor = props.restDetails?.primaryColor || '#d9534f'
  const backgroundColor = props.restDetails?.backgroundColor || '#ffffff'
  return {
    backgroundColor: isActive ? primaryColor : '#fff',
    border: !isActive ? `1px solid ${primaryColor}` : 'none',
    color: isActive ? backgroundColor : primaryColor,
    fontWeight: isActive ? 'bold' : '600',
  }
}

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
    _id: category._id,
    name: category.name,
    label: category.name,
  }))
})

watch(
  menuItems,
  (newVal) => {
    if (newVal.length && !selectedItem.value) {
      selectedItem.value = newVal[0].id
    }
  },
  { immediate: true },
)

const refs = computed(() => {
  const refObj = {}
  menuItems.value.forEach((item) => {
    refObj[item.id] = useTemplateRef(item.id)
  })
  return refObj
})

watch(selectedItem.value, (newVal) => {
  console.log('selectedItem', newVal)
  refs[newVal].scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
})

const subCategories = computed(() => {
  if (selectedItem.value) {
    const item = props.categories.find((a) => a._id === selectedItem.value)
    if (item) {
      return item.subCategories.map((e) => {
        return { label: e.name, id: e._id, menuItems: e.menuItems }
      })
    } else {
      return []
    }
  }
  return []
})

const scrollToSection = (item) => {
  selectedItem.value = item._id
  const section = document.getElementById(item._id)
  if (section) {
    let offset = (categoryHeader.value?.offsetHeight || 0) + 10

    if (!isSticky.value) {
      offset = 120
    }
    const y = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
const scrollToSubSection = (id) => {
  selectedSubCategory.value = id
  const section = document.getElementById(`subCategories-${id}`)
  if (section) {
    let offset = (categoryHeader.value?.offsetHeight || 0) + 10
    if (!isSticky.value) {
      offset -= 50
    }
    const y = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const scrollSectionToLeftOrRight = (element) => {
  const parent = element.parentElement.parentElement // getting header width
  const elementLeft = element.offsetLeft
  const elementWidth = element.offsetWidth
  const containerWidth = parent.offsetWidth
  const scrollLeft = parent.scrollLeft
  if (elementLeft < scrollLeft || elementLeft + elementWidth > scrollLeft + containerWidth) {
    parent.scrollTo({
      left: elementLeft - containerWidth / 2 + elementWidth / 2,
      behavior: 'smooth',
    })
  }
}
const handleScroll = () => {
  if (categoryHeader.value) {
    headerOffsetTop = categoryHeader.value.offsetHeight + 150
    headerHeight.value = categoryHeader.value.offsetHeight
  }
  isSticky.value = window.scrollY >= headerOffsetTop
  const mostVisibleId = getMostVisibleElementId()
  const mostVisibleSubCategoryId = getMostVisibleElementSubCategoriesId()
  if (mostVisibleSubCategoryId) {
    selectedSubCategory.value = mostVisibleSubCategoryId.split('-')[1]
    const element = document.getElementById(`sub-category-header-${selectedSubCategory.value}`)
    if (element) {
      scrollSectionToLeftOrRight(element)
    }
  }

  if (mostVisibleId) {
    selectedItem.value = mostVisibleId
    const element = document.getElementById(`category-${mostVisibleId}`)
    if (element) {
      scrollSectionToLeftOrRight(element)
    }
  }
}
function getMostVisibleElementId() {
  // Get all elements with IDs
  const elements = Array.from(document.querySelectorAll('[id]')).filter(
    (el) => el.id !== 'app' && !el.id.startsWith('subCategories-'),
  )
  let maxVisibleArea = 0
  let mostVisibleElement = null

  elements.forEach((element) => {
    // Get element's rectangle
    const rect = element.getBoundingClientRect()

    // Calculate visible area
    const viewHeight = window.innerHeight
    const viewWidth = window.innerWidth

    // Calculate intersection with viewport
    const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 20)
    const visibleWidth = Math.min(rect.right, viewWidth) - Math.max(rect.left, 20)

    // Calculate visible area
    const visibleArea = visibleHeight * visibleWidth

    // Update if this element has larger visible area
    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea
      mostVisibleElement = element
    }
  })

  return mostVisibleElement ? mostVisibleElement.id : null
}

function getMostVisibleElementSubCategoriesId() {
  // Get all elements with IDs
  const elements = Array.from(document.querySelectorAll('[id]')).filter(
    (el) => el.id !== 'app' && el.id.startsWith('subCategories-'),
  )
  let minDistanceToCenter = Infinity
  let mostVisibleElement = null

  const viewportCenter = window.innerHeight / 2

  elements.forEach((element) => {
    // Get element's rectangle
    const rect = element.getBoundingClientRect()

    // Calculate distance from element's center to viewport center
    const elementCenter = rect.top + rect.height / 2
    const distanceToCenter = Math.abs(elementCenter - viewportCenter)

    // Check if element is visible
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible && distanceToCenter < minDistanceToCenter) {
      minDistanceToCenter = distanceToCenter
      mostVisibleElement = element
    }
  })

  return mostVisibleElement ? mostVisibleElement.id : null
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
nav {
  width: 100%;
  overflow-x: auto;
}
.category-header nav {
  overflow-x: auto;
}
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
.logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
}

.restaurant-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.header-section {
  width: 100%;
  overflow: hidden;
  background-color: white;
}
.cover-header {
  width: 100%;
  /* height: 100%; */
  /* max-height: 400px; */
  padding-top: 50%; /* 2:1 Aspect Ratio (i.e., 4:2) */
  /* aspect-ratio: 4 / 2; */
  position: relative;
  overflow: hidden !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  border-bottom-left-radius: 60% 5%;
  border-bottom-right-radius: 60% 5%;
}
.header-section .cover-header .header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
}
.menu {
  list-style: none;
  display: flex;
  gap: 14px;
  margin: 0;
  padding: 6px;
  scrollbar-width: none;
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
  border-radius: 8px;
  border-bottom: none;
}
.menu li .sub-category {
  border-radius: 16px;
}

.content {
  padding-top: 20px;
}

@media (max-width: 768px) {
  .header-section {
    /* height: 180px; */
  }
  .cover-header {
    background-size: cover !important;
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
@media (min-width: 1024px) {
  .cover-header {
    background: none !important;
    padding-top: 30%;
  }

  .header-overlay {
    display: none !important;
  }

  .restaurant-logo {
    width: 140px;
    height: 140px;
  }
  .menu {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }

  .menu::-webkit-scrollbar {
    display: none;
  }
  .menu li {
    flex-shrink: 0;
  }
  .menu li button {
    font-size: 18px;
    padding: 10px 16px;
  }
  .menu li .sub-category {
    font-size: 17px;
    padding: 10px 16px;
  }
  .category-header {
    box-shadow: none !important;
  }
  nav {
    max-width: 1280px;
    margin: auto;
  }
  .sticky-category {
    nav {
      padding: 0 3rem;
    }
  }
}
</style>
