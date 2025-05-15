<template>
  <div class="content_ui" v-if="categories.length">
    <div>
      <div class="content_items" v-for="category in categories" :key="category._id">
        <div :id="category._id">
          <h2 class="content_title" :style="{ borderBottom: `1px solid ${outlet.primaryColor}` }">
            {{ category.name }}
          </h2>
          <div
            class="sub_category_block"
            v-for="subCategory in category.subCategories.filter((a) => a.menuItems.length)"
            :key="subCategory._id"
          >
            <div :id="`subCategories-${subCategory._id}`">
              <h3 v-if="subCategory.menuItems.length" class="content_sub_title">
                {{ subCategory.name }}
              </h3>
              <div class="content_item_product-block">
                <div
                  class="content_item_product subcategory_border"
                  v-for="item in subCategory.menuItems"
                  :key="item._id"
                  @click="goToProduct(item._id)"
                >
                  <div
                    class="product_list_item product_underline"
                    :class="{ 'no-image': !item.imageUrl }"
                  >
                    <div class="item_info">
                      <div class="item_title">
                        {{ item.name }}
                      </div>
                      <template v-if="item.allergenIds && item.allergenIds.length">
                        <img
                          v-for="(id, index) in item.allergenIds.slice(0, 5)"
                          :key="id"
                          :src="allergenIcons[id]"
                          :alt="`Allergen ${id}`"
                          class="allergen_icon"
                        />
                        <span v-if="item.allergenIds.length > 5" class="allergen_more">...</span>
                      </template>
                      <div class="item_description">{{ item.description }}</div>
                      <div class="item_price" v-if="parseFloat(item.price)">
                        <span class="currency_symbol">€ </span>
                        <span class="currency_val">{{ parseFloat(item.price).toFixed(2) }}</span>
                      </div>
                    </div>
                    <div class="item_thumb">
                      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" />
                    </div>
                    <div class="product_list_item_info red"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content_item_product-block">
            <div
              class="content_item_product"
              v-for="item in category.menuItems"
              :key="item._id"
              @click="goToProduct(item._id)"
            >
              <div
                class="product_list_item product_underline"
                :class="{ 'no-image': !item.imageUrl }"
              >
                <div class="item_info">
                  <div class="item_title">
                    {{ item.name }}
                  </div>
                  <template v-if="item.allergenIds && item.allergenIds.length">
                    <img
                      v-for="(id, index) in item.allergenIds.slice(0, 5)"
                      :key="id"
                      :src="allergenIcons[id]"
                      :alt="`Allergen ${id}`"
                      class="allergen_icon"
                    />
                    <span v-if="item.allergenIds.length > 5" class="allergen_more">...</span>
                  </template>
                  <div class="item_description">{{ item.description }}</div>
                  <div class="item_price" v-if="parseFloat(item.price)">
                    <span class="currency_symbol">€ </span>
                    <span class="currency_val">{{ parseFloat(item.price).toFixed(2) }}</span>
                  </div>
                </div>
                <div class="item_thumb">
                  <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" />
                </div>
                <div class="product_list_item_info red"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import ProductDescription from '../ProductDescription.vue'
import CartView from '../CartView.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

export default {
  props: ['selectedCategory', 'categories', 'outlet'],
  components: {
    ProductDescription,
  },
  methods: {
    goToProduct(id) {
      this.$router.push({ name: 'ProductDescription', params: { id: id } })
    },
  },
  setup() {
    const selectedProduct = ref(null)
    const cart = ref([])
    const cartCount = computed(() => {
      return cart.value.reduce((total, item) => total + item.quantity, 0)
    })
    const cartTotal = computed(() => {
      return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })
    const addToCart = (item) => {
      const existingItem = cart.value.find((cartItem) => cartItem._id === item._id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.value.push({ ...item, quantity: 1 })
      }
    }
    const removeFromCart = (item) => {
      const existingItem = cart.value.find((cartItem) => cartItem._id === item._id)
      if (existingItem) {
        existingItem.quantity -= 1
        if (existingItem.quantity <= 0) {
          cart.value = cart.value.filter((cartItem) => cartItem._id !== item._id)
        }
      }
    }
    const clearCart = () => {
      cart.value = []
    }
    const checkout = () => {
      console.log('Checkout:', cart.value)
    }
    const showCart = ref(false)
    const openCart = () => {
      showCart.value = true
    }
    const closeCart = () => {
      showCart.value = false
    }
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
      selectedProduct,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      checkout,
      showCart,
      openCart,
      closeCart,
      allergenIcons,
    }
  },
}
</script>

<style scoped>
.content_ui {
  padding: 0em 0em !important;
  background: #f7f7f7;
  margin-top: 0px !important;
}
.content_items {
  margin-bottom: 20px;
  background: #fbfbfb;
  padding: 1em;
}
.content_title {
  font-size: 1.4em;
  margin: 0.5em 0;
  font-weight: bold;
  color: #333;
  padding-bottom: 0.3em;
}
.content_sub_title {
  font-size: 1.2em;
  margin: 0.5em 0 0;
  font-weight: 600;
  color: #444;
}
.sub_category_block {
  padding-right: 1em;
  margin-bottom: 1em;
}
.content_item_product {
  border-bottom: 1px solid #efefef;
  cursor: pointer;
}
.sub_category_block .content_item_product:last-child {
  border-bottom: none;
}
.content_items > div > .content_item_product:last-child {
  border-bottom: none;
}
.allergen_icons {
  margin: 0.2em 0;
}
.allergen_icon {
  height: 20px;
  width: 20px;
  margin: 0 2px;
}
.allergen_more {
  font-size: 1em;
  color: #999;
  margin-left: 4px;
}
.product_list_item.no-image {
  flex-direction: column;
}
.product_list_item.no-image .item_info {
  margin-right: 0;
  width: 100%;
}
.product_list_item.no-image .item_title,
.product_list_item.no-image .item_description {
  text-align: left;
  width: 100%;
}
.product_list_item.no-image .item_thumb {
  display: none;
}
.product_list_item {
  display: flex;
  padding: 0.5em 0;
  position: relative;
}
.product_list_item .product_underline {
  border-bottom: solid 1px #efefef;
}
.item_info {
  flex-grow: 1;
  margin-right: 0.5em;
}
.item_info .item_title {
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: 0.2em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item_info .item_description {
  font-weight: 300;
  font-size: 1em;
  margin-bottom: 1em;
  color: #6b6b6b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item_thumb {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  background: #fbfbfb;
}
.item_thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.product_list_item_info {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  display: none;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  display: none;
  overflow: hidden;
  border-radius: 2em;
}
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

.header_closer {
  position: absolute;
  left: 1em;
  top: 1em;
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

.modal_image {
  width: 100%;
  max-height: 30vh;
  object-fit: cover;
  display: block;
  border-bottom-left-radius: 60% 5%;
  border-bottom-right-radius: 60% 5%;
}
.modal_content_info {
  padding-bottom: 5em;
  flex: 1;
  overflow-y: auto;
  background: #f7f7f7;
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
.screen_bottom_controls.hide {
  display: block;
}
.screen_bottom_controls {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 600;
  display: flex;
  align-items: center;
  min-height: 80px;
  padding: 0 1em;
  box-sizing: border-box;
}
.screen_bottom_controls .view_cart_btn {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.info_number.white {
  color: #feffff;
  border: solid 2px #feffff;
}
.info_number {
  overflow: hidden;
  border-radius: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5em;
  min-height: 1.5em;
}
.screen_bottom_controls .view_cart_btn .view_label {
  width: 200px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (min-width: 1024px) {
  .content_title {
    text-align: center;
    font-size: 2em;
  }
  .content_sub_title {
    font-size: 1.5em;
    text-align: left;
  }
  .item_thumb {
    width: 130px;
    height: 120px;
  }
  .content_item_product-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* gap: 20px; */
  }
  .content_item_product {
    padding-right: 1rem;
  }
}
</style>
