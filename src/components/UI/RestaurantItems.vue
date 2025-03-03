<template>
  <div class="content_ui">
    <div class="content_items">
      <h2 class="content_title">20% Off</h2>
      <div class="content_item_product" v-for="(product, index) in products" :key="index">
        <div class="product_list_item product_underline" @click="openModal(product)">
          <div class="item_info">
            <div class="item_title">{{ product.title }}</div>
            <div class="item_description">{{ product.description }}</div>
            <div class="item_price">
              <span class="currency_symbol">$</span>
              <span class="currency_val">{{ product.price }}</span>
            </div>
          </div>
          <div class="item_thumb">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="product_list_item_info red"></div>
        </div>
      </div>
    </div>
    <ProductDescription
      @closeModal="closeModal"
      :selectedProduct="selectedProduct"
      v-if="showDescription"
    />

    <div class="screen_bottom_controls hide" style="opacity: 1">
      <a href="#" class="apt_button primary view_cart_btn" @click.prevent="openCart">
        <span class="quantity_info info_number white">1</span>
        <span class="view_label">View cart</span>
        <span class="price_info"
          ><span class="currency_symbol">€</span><span class="currency_val">79.99</span></span
        >
      </a>
      <CartView @closeModal="closeModal" v-show="showCart" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductDescription from '../ProductDescription.vue'
import CartView from '../CartView.vue'

export default {
  components: {
    ProductDescription,
    CartView,
  },
  setup() {
    const showDescription = ref(false)
    const showCart = ref(false)
    const selectedProduct = ref(null)

    const products = ref([
      {
        title: 'London Broil',
        id: 1,
        description: 'Broiling marinated beef, cut into thin strips',
        price: '12.99',
        image: '/images/wrap.jpg',
        options: [
          {
            title: 'Variation',
            id: 101,
            isRequired: true,
            caption: 'Any caption if needed',
            multiple: false,
            types: [
              { name: 'Small', id: 1011, price: '1.99', description: 'Lobster bisque en croute' },
              { name: 'Medium', id: 1012, price: '4.99', description: 'Lmk bisque en croute' },
              { name: 'Large', id: 1013, price: '8.99', description: 'Lobster bisque en croute' },
            ],
          },
          {
            title: 'Slides',
            id: 102,
            isRequired: false,
            caption: 'Any caption if needed',
            multiple: true,
            types: [
              {
                name: 'slide 1 small',
                id: 1021,
                price: '1.99',
                description: 'Lobster bisque en croute',
              },
              {
                name: 'Slide 2 medium',
                id: 1022,
                price: '4.99',
                description: 'Lmk bisque en croute',
              },
              {
                name: 'slide 3 large',
                id: 1023,
                price: '8.99',
                description: 'Lobster bisque en croute',
              },
            ],
          },
        ],
      },
      {
        title: 'Ajiaco',
        id: 2,
        description: 'Colombian chicken and potato soup',
        price: '14.99',
        image: '/images/bg_img.jpg',
        options: [
          {
            title: 'Variation',
            id: 201,
            isRequired: true,
            caption: 'Any caption if needed',
            multiple: false,
            types: [
              { name: 'Small', id: 2011, price: '1.99', description: 'Lobster bisque en croute' },
              { name: 'Medium', id: 2012, price: '4.99', description: 'Lmk bisque en croute' },
              { name: 'Large', id: 2013, price: '8.99', description: 'Lobster bisque en croute' },
            ],
          },
          {
            title: 'Slides',
            id: 202,
            isRequired: false,
            caption: 'Any caption if needed',
            multiple: true,
            types: [
              {
                name: 'slide 1 small',
                id: 2021,
                price: '1.99',
                description: 'Lobster bisque en croute',
              },
              {
                name: 'Slide 2 medium',
                id: 2022,
                price: '4.99',
                description: 'Lmk bisque en croute',
              },
              {
                name: 'slide 3 large',
                id: 2023,
                price: '8.99',
                description: 'Lobster bisque en croute',
              },
            ],
          },
        ],
      },
      {
        title: 'French Onion Soup',
        id: 3,
        description: 'A rich and savory soup with melted cheese',
        price: '10.99',
        image: '/images/wrap.jpg',
        options: [
          {
            title: 'Variation',
            id: 301,
            isRequired: true,
            caption: 'Any caption if needed',
            multiple: false,
            types: [
              { name: 'Small', id: 3011, price: '1.99', description: 'Lobster bisque en croute' },
              { name: 'Medium', id: 3012, price: '4.99', description: 'Lmk bisque en croute' },
              { name: 'Large', id: 3013, price: '8.99', description: 'Lobster bisque en croute' },
            ],
          },
          {
            title: 'Slides',
            id: 302,
            isRequired: false,
            caption: 'Any caption if needed',
            multiple: true,
            types: [
              {
                name: 'slide 1 small',
                id: 3021,
                price: '1.99',
                description: 'Lobster bisque en croute',
              },
              {
                name: 'Slide 2 medium',
                id: 3022,
                price: '4.99',
                description: 'Lmk bisque en croute',
              },
              {
                name: 'slide 3 large',
                id: 3023,
                price: '8.99',
                description: 'Lobster bisque en croute',
              },
            ],
          },
        ],
      },
    ])

    const openModal = (product) => {
      selectedProduct.value = product
      showDescription.value = true
    }

    const closeModal = () => {
      showDescription.value = false
      showCart.value = false
    }

    const openCart = () => {
      showCart.value = true
    }

    return {
      showDescription,
      showCart,
      selectedProduct,
      openModal,
      closeModal,
      openCart,
      products,
    }
  },
}
</script>

<style scoped>
.content_ui {
  padding: 0em 0em;
  background: #f7f7f7;
}
.content_items {
  margin-bottom: 20px;
  background: #fbfbfb;
  padding: 1em;
}
.content_title {
  font-size: 1.3em;
  margin: 0;
  font-weight: bold;
}
.content_item_product {
  border-bottom: 1px solid #efefef;
}
.product_list_item {
  display: flex;
  padding: 1em 0em;
  cursor: pointer;
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
}
.item_info .item_description {
  font-weight: 300;
  font-size: 1em;
  margin-bottom: 1em;
  color: #6b6b6b;
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
/* Modal Overlay */
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
</style>
