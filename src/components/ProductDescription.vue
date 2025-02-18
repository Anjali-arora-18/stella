<template>
  <div class="modal_overlay" @click.prevent="$emit('closeModal')">
    <div class="modal_content" @click.stop>
      <div class="modal_content_info">
        <div class="header_closer">
          <a class="close_btn" href="#" @click.prevent="$emit('closeModal')">
            <span>✕</span>
          </a>
        </div>
        <img class="modal_image" :src="selectedProduct.image" :alt="selectedProduct.title" />
        <div class="product_info">
          <div class="content">
            <div class="product_name">{{ selectedProduct.title }}</div>
            <div class="product_price_info">
              from
              <span class="product_currency">$</span>
              <span class="product_price">{{ selectedProduct.price }}</span>
            </div>
          </div>
          <div class="product_description">{{ selectedProduct.description }}</div>
        </div>
        <div class="product_content_ui">
          <div
            class="screen_bottom_controls"
            style="opacity: 1; display: block"
            v-if="selectedVariation"
          >
            <div class="udapte_controls">
              <div class="cart_add_remove_controls">
                <a
                  href="#"
                  @click="count > 0 ? count-- : null"
                  class="round_nav_fill primary minus inactive"
                  ><span class="icon-minus"></span
                ></a>
                <div class="cart_add_info">{{ count }}</div>
                <a href="#" @click="count++" class="round_nav_fill primary plus"
                  ><span class="icon-plus"></span
                ></a>
              </div>
            </div>
            <button @click="addToCart" class="apt_button primary add_to_cart_btn inactive">
              Add to cart
            </button>
          </div>
          <div
            class="product_widget"
            v-for="(variation, index) in selectedProduct.options"
            :key="index"
          >
            <div class="widget_info">
              <div class="widget_title">{{ variation.title }}</div>
              <div v-if="variation.isRequired" class="options_required_info">1 Required</div>
              <div v-else class="options_required_info optional">Optional</div>
            </div>
            <div class="widget_entries" v-for="(type, vIndex) in variation.types" :key="vIndex">
              <div
                class="widget_radio_entry"
                :class="{
                  selected:
                    selectedVariation[variation.id] !== undefined &&
                    selectedVariation[variation.id].includes(type.id),
                }"
                @click="addToSelection(variation.multiple, variation.id, type.id)"
              >
                <div
                  class="primary_color_border"
                  :class="{
                    square_symbol: variation.multiple,
                    radio_symbol: !variation.multiple,
                  }"
                >
                  <div
                    class="primary_color_background"
                    :class="{
                      show:
                        selectedVariation[variation.id] !== undefined &&
                        selectedVariation[variation.id].includes(type.id),
                      square_fill: variation.multiple,
                      radio_fill: !variation.multiple,
                    }"
                  ></div>
                </div>
                <div class="variant_info">{{ type.name }}</div>
                <div class="variant_price">
                  <span class="currency_symbol">€</span
                  ><span class="currency_val">{{ type.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="if_form_control">
            <div class="label">Additional notes</div>
            <textarea class="if_textarea_input additional_notes" spellcheck="false"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
export default {
  props: {
    selectedProduct: Array,
  },
  setup(props, { emit }) {
    const selectedVariation = ref([])
    const count = ref(1)
    const cartStore = useCartStore()
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
        id: props.selectedProduct.id,
        count: count.value,
        title: props.selectedProduct.title,
        image: props.selectedProduct.image,
        options: [],
      }

      props.selectedProduct.options.forEach((option) => {
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
      emit('closeModal')
    }

    return {
      selectedVariation,
      addToSelection,
      addToCart,
      count,
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
</style>
