<template>
  <div>
    <div class="header-section">
      <div class="cover-header">
        <div class="header-title">Stella</div>
      </div>
    </div>

    <header class="top-menu">
      <nav>
        <ul class="menu">
          <li v-for="item in menuItems" :key="item.id">
            <button @click="scrollToSection(item.id)" :class="{ active: selectedItem === item.id }">
              {{ item.label }}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { id: '20%off', label: '20% Off' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'soups', label: 'Soups' },
  { id: 'steak', label: 'Steak' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'cocktails', label: 'Cocktails' },
])

const selectedItem = ref(null)

const scrollToSection = (id) => {
  selectedItem.value = id
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
<style scoped>
.header-section {
  width: 100%;
  height: 30vh;
  background: url('/images/bg_img.jpg') center/cover no-repeat;
  border-bottom-left-radius: 60% 5%;
  border-bottom-right-radius: 60% 5%;
}
.cover-header {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  flex-direction: column;
}
.header-title {
  font-size: 2em;
  font-weight: 500;
}
.top-menu {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 600;
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.menu li button {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #323232;
  transition: all 0.3s ease-in-out;
  padding-bottom: 5px;
  border-bottom: 3px solid transparent;
}

.menu li button:hover {
  color: #d9534f;
}

.menu li button.active {
  font-weight: bold;
  color: #d9534f;
  border-bottom: 3px solid #d9534f;
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
  }
  .header-title {
    font-size: 1.2em;
  }
  .top-menu {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }

  .top-menu::-webkit-scrollbar {
    display: none;
  }

  .top-menu:hover {
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
  }

  .top-menu:hover::-webkit-scrollbar {
    height: 5px;
  }

  .top-menu:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  .top-menu:hover::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

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
