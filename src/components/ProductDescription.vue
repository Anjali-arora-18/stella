<template>
  <div
    class="modal_overlay"
    v-if="product"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="modal_content" :style="{ transform: `translateX(${currentX}px)` }">
      <div class="modal_content_info">
        <div class="header_closer">
          <a class="close_btn" href="#" @click.prevent="closeModal">
            <span>✕</span>
          </a>
        </div>
        <div class="image_wrapper" v-if="product" :style="imageBackgroundStyle">
          <img
            class="modal_image"
            v-if="product.imageUrl"
            :src="product.imageUrl"
            :alt="product.name"
          />
        </div>
        <div class="product_info">
          <div class="content">
            <div class="product_name_and_icons">
              <div class="product_name">{{ product.name }}</div>
              <div class="allergen_icons" v-if="product.allergenIds && product.allergenIds.length">
                <img
                  v-for="id in product.allergenIds"
                  :key="id"
                  :src="allergenIcons[id]"
                  :alt="`Allergen ${id}`"
                  class="allergen_icon"
                />
              </div>
            </div>
            <div class="product_price_info" v-if="product.price">
              from
              <span class="product_currency">€ </span>
              <span class="product_price">{{ parseFloat(product.price).toFixed(2) }}</span>
            </div>
          </div>
          <div class="product_description">{{ product.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useMenuStore } from '@/stores/getMenu'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
  setup(props, { emit }) {
    const closeModal = () => {
      if (window.history.length > 1) {
        router.back()
        return
      }
    }
    const selectedVariation = ref([])
    const count = ref(1)
    const menuStore = useMenuStore()
    const route = useRoute()
    const router = useRouter()
    const product = ref({})
    const cartStore = useCartStore()
    const url = import.meta.env.VITE_APP_API_URL
    const getMenuItems = async () => {
      axios.get(`${url}menuItemvoById/${route.params.id}`, {}).then((response) => {
        product.value = response.data
      })
    }
    const outlet = computed(() => menuStore.restDetails)

    getMenuItems()
    const addToSelection = (isMultiple, optionId, typeId) => {
      if (isMultiple) {
        if (!selectedVariation.value[optionId]) {
          selectedVariation.value[optionId] = []
        }
        const index = selectedVariation.value[optionId].indexOf(typeId)
        if (index === -1) {
          selectedVariation.value[optionId].push(typeId)
        } else {
          selectedVariation.value[optionId].splice(index, 1)
        }
      } else {
        selectedVariation.value[optionId] = [typeId]
      }
    }

    const addToCart = () => {
      const items = {
        id: product.value.id,
        count: count.value,
        name: product.value.name,
        imageUrl: product.value.imageUrl,
        options: [],
      }

      product.value.options.forEach((option) => {
        const options = option
        const selectedOption = selectedVariation.value[option.id]
        if (selectedOption) {
          options.types.forEach((type) => {
            if (selectedOption.includes(type.id)) {
              items.options.push({
                id: type.id,
                name: type.name,
                price: type.price,
              })
            }
          })
        }
      })
      cartStore.addToCart(items)
      router.push('/')
    }

    const startX = ref(0)
    const currentX = ref(0)
    const isDragging = ref(false)

    const handleTouchStart = (e) => {
      startX.value = e.touches[0].clientX
      isDragging.value = true
    }

    const handleTouchMove = (e) => {
      if (!isDragging.value) return
      currentX.value = e.touches[0].clientX - startX.value
      if (currentX.value < 0) currentX.value = 0
    }

    const handleTouchEnd = () => {
      if (currentX.value > 100) {
        router.push('/')
      }
      currentX.value = 0
      isDragging.value = false
    }

    const imageBackgroundStyle = computed(() => {
      if (!Object.keys(product.value).length) return {}

      const hasHeaderImage = product.value.imageUrl && product.value.imageUrl !== ''
      return hasHeaderImage
        ? {
            background: `url(${product.value.imageUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            borderBottomLeftRadius: '60% 5%',
            borderBottomRightRadius: '60% 5%',
          }
        : { backgroundColor: outlet.value.headerColor, height: '20vh' }
    })
    const allergenIcons = {
      1: '/allergens/vegan.png',
      2: '/allergens/plant_based.png',
      3: '/allergens/vegetarian.png',
      4: '/allergens/pescatarian.png',
      5: '/allergens/spicy.png',
      6: '/allergens/halal.png',
      7: '/allergens/kosher.png',
      8: '/allergens/gluten_free.png',
      9: '/allergens/dairy_free.png',
      10: '/allergens/nut_free.png',
      11: '/allergens/gluten.png',
      12: '/allergens/crustaceans.png',
      13: '/allergens/eggs.png',
      14: '/allergens/fish.png',
      15: '/allergens/peanuts.png',
      16: '/allergens/soybeans.png',
      17: '/allergens/milk.png',
      18: '/allergens/nuts.png',
      19: '/allergens/celery.png',
      20: '/allergens/mustard.png',
      21: '/allergens/sesame_seeds.png',
      22: '/allergens/sulphur_dioxide.png',
      23: '/allergens/lupin.png',
      24: '/allergens/molluscs.png',
    }
    return {
      closeModal,
      product,
      selectedVariation,
      addToSelection,
      addToCart,
      count,
      imageBackgroundStyle,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      allergenIcons,
    }
  },
}
</script>
<style scoped>
.modal_overlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: opacity 0.5s ease-in-out;
  overflow: hidden;
}

.modal_content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
  transform: translateY(100%);
  animation: slideUp 0.5s ease-in-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.allergen_icons {
  margin: 0.2em 0;
  display: flex;
  flex-wrap: wrap;
}
.allergen_icon {
  height: 20px;
  width: 20px;
  margin-right: 4px;
}
.header_closer {
  position: absolute;
  left: 1em;
  top: 1em;
  z-index: 10;
}

.close_btn {
  text-decoration: none;
  color: #c9386f;
  background: #feffff;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}
.image_wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
  border-bottom-left-radius: 60% 5%;
  border-bottom-right-radius: 60% 5%;
}

.modal_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.modal_content_info {
  padding-bottom: 5em;
  flex: 1;
  overflow-y: auto;
  height: 100vh;
  position: relative;
  background: #f7f7f7;
}
.modal_content_info > div:first-child {
  width: 100%;
  max-height: 100vw;
  overflow: hidden;
}
.product_info {
  overflow: hidden;
  border-bottom: solid 1px #f2f2f2;
  background: #fbfbfb;
  padding: 1em;
  font-weight: bold;
  box-sizing: border-box;
}
.content {
  display: flex;
  margin-bottom: 0.7em;
  justify-content: space-between;
  align-items: flex-start;
}
.product_name_and_icons {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 0.7em;
}
.product_name {
  flex: 1;
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 0.7em;
}
.product_price_info {
  flex-shrink: 0;
  font-weight: bold;
  text-align: right;
}
.product_price_info span {
  font-weight: bold;
}
.product_description {
  font-size: 1em;
  font-weight: 300;
  color: #6b6b6b;
}
.product_content_ui {
  padding-bottom: 2rem;
}
.product_widget {
  background: #fbfbfb;
  padding: 1em;
}
.product_widget .widget_info {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.product_widget .widget_info .widget_title {
  flex-grow: 1;
  font-weight: bold;
}
.product_widget .widget_info .options_required_info {
  flex-shrink: 0;
  font-size: 0.8em;
  background: #c8d5fb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 1em;
  color: #3d69e8;
  font-weight: 500;
}
.product_widget .widget_radio_entry {
  display: flex;
  padding: 0.8em 0em;
  cursor: pointer;
}
.primary_color_border {
  border-color: #c9386f;
}
.primary_color_background {
  background: #c9386f;
}
.product_widget .widget_radio_entry .radio_symbol,
.square_symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.1em;
  height: 1.1em;
  border-radius: 1em;
  border-width: 2px;
  border-style: solid;
  margin-right: 0.7em;
  margin-top: 3px;
}
.product_widget .widget_radio_entry .square_symbol {
  border-radius: 0px;
}
.product_widget .widget_radio_entry .radio_symbol .radio_fill,
.square_symbol .square_fill {
  width: 0.5em;
  height: 0.5em;
  border-radius: 1em;
  display: none;
}
.product_widget .widget_radio_entry .radio_symbol .radio_fill.show,
.square_symbol .square_fill.show {
  display: block;
}
.product_widget .widget_radio_entry .square_symbol .square_fill span {
  font-weight: bold;
  font-size: 0.8em;
}
.icon-check:before {
  content: '✓';
  font-size: 14px;
  position: relative;
  top: -7px;
  color: #c9386f;
  bottom: 0;
  font-weight: 700;
}
.product_widget .widget_radio_entry .variant_info {
  flex: 1;
  font-weight: 300;
  font-size: 1em;
}
.product_widget .widget_radio_entry .variant_price {
  flex-shrink: 0;
  color: #6b6b6b;
  font-weight: 300;
}
.product_widget .max_allowed {
  color: #313131;
  font-weight: 300;
  font-size: 0.8em;
  margin-top: -1em;
  margin-bottom: 0.7em;
}
.if_form_control {
  padding: 1em;
  background: #fbfbfb;
}
.if_form_control .label {
  font-size: 1em;
  margin-bottom: 0.3em;
  font-weight: bold;
}
.if_textarea_input {
  padding: 0.7em;
  font-weight: 300;
  font-size: 1em;
  border-radius: 4px;
  border-width: 1px;
  border-color: #cccccc;
  border-style: solid;
  box-sizing: border-box;
  width: 100%;
  outline: none;
}
.product_widget .widget_info .options_required_info.optional {
  background: #f1f1f1;
  color: #969696;
}
.screen_bottom_controls {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  padding: 1em;
  box-sizing: border-box;
}
.screen_bottom_controls .udapte_controls {
  flex-shrink: 0;
  margin-right: 20px;
}
.cart_add_remove_controls {
  display: flex;
  align-items: center;
  justify-content: center;
}
.round_nav_fill:link.inactive {
  cursor: default;
  background: #cccccc;
}
.round_nav_fill:hover.inactive {
  cursor: default;
  background: #cccccc;
}
.round_nav_fill:hover {
  color: #feffff;
}
.round_nav_fill:link {
  text-decoration: none;
  color: #feffff;
  background: #c9386f;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}
.icon-minus:before {
  content: '-';
  font-size: 2em;
  color: #fff;
}
.icon-plus:before {
  content: '+';
  font-size: 2em;
  color: #fff;
}
.cart_add_remove_controls .cart_add_info {
  width: 2em;
  text-align: center;
  margin: 0 0.1em;
  font-size: 1.2em;
  font-weight: bold;
}
.apt_button.inactive {
  cursor: default;
  background: #cccccc;
}
.apt_button.primary {
  color: #feffff;
  background: #c9386f;
  box-shadow: none;
}
.apt_button {
  padding: 0.7em 1.5em;
  border-radius: 0.4em;
  border: 0px !important;
  margin-top: 15px;
  text-decoration: none;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: #fff;
}
.screen_bottom_controls .add_to_cart_btn {
  flex: 1;
}
</style>
