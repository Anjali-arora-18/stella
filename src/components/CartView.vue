<template>
  <!-- <div class="cart_screen" style="opacity: 1; top: 0px"> -->
    <div class="modal_overlay">
      <div class="modal_content" @click.stop>
        <div class="cart_nav_top">
          <div class="cart_nav_top_header">
            <div class="cart_nav_top_header_content">
              <div class="cart_content_left">
                <a class="close_cart" href="#" @click.prevent="$emit('closeModal')"
                  ><span>✕</span></a
                >
                <div class="title">Cart</div>
              </div>
              <div class="total_info">
                <div class="price_label">
                  Total
                  <span class="price_total">
                    <span class="currency_symbol">£</span>
                    <span class="currency_val">0.00</span>
                  </span>
                </div>
                <div class="price_info">(incl. VAT)</div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart_nav_content">
          <div class="cart_items_ui">
            <div class="cart_underline">
              <div class="cart_product_entry">
                <div class="product_info_ui">
                  <div class="product_info">
                    <div class="title">
                      <span class="edit_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-edit"
                        >
                          <path d="M11 4h9M4 20h16" />
                          <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                        </svg>
                      </span>
                      French onion soup
                      <span class="variation_info">(Large)</span>
                    </div>
                    <div class="summary">Lobster bisque en croute</div>
                  </div>
                  <div class="product_price">
                    <span class="currency_symbol">£</span>
                    <span class="currency_val">5.00</span>
                  </div>
                </div>
                <div class="product_quantity">
                  <div class="quantity_info">1</div>
                  <div class="quantity_controls">
                    <a class="square_min" href="#">
                      <span>-</span>
                    </a>
                    <div class="separator"></div>
                    <a class="square_plus" href="#">
                      <span>+</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="cart_underline">
              <div class="cart_product_entry">
                <div class="product_info_ui">
                  <div class="product_info">
                    <div class="title">
                      <span class="edit_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-edit"
                        >
                          <path d="M11 4h9M4 20h16" />
                          <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                        </svg>
                      </span>
                      soup
                      <span class="variation_info">(Large)</span>
                    </div>
                    <div class="summary">bisque en</div>
                  </div>
                  <div class="product_price">
                    <span class="currency_symbol">£</span>
                    <span class="currency_val">5.00</span>
                  </div>
                </div>
                <div class="product_quantity">
                  <div class="quantity_info">1</div>
                  <div class="quantity_controls">
                    <a class="square_min" href="#">
                      <span>-</span>
                    </a>
                    <div class="separator"></div>
                    <a class="square_plus" href="#">
                      <span>+</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="cart_underline">
              <div class="cart_product_entry">
                <div class="product_info_ui">
                  <div class="product_info">
                    <div class="title">
                      <span class="edit_icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-edit"
                        >
                          <path d="M11 4h9M4 20h16" />
                          <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                        </svg>
                      </span>
                      onion soup
                      <span class="variation_info">(Large)</span>
                    </div>
                    <div class="summary">Lobster bisque en croute</div>
                  </div>
                  <div class="product_price">
                    <span class="currency_symbol">£</span>
                    <span class="currency_val">5.00</span>
                  </div>
                </div>
                <div class="product_quantity">
                  <div class="quantity_info">1</div>
                  <div class="quantity_controls">
                    <a class="square_min" href="#">
                      <span>-</span>
                    </a>
                    <div class="separator"></div>
                    <a class="square_plus" href="#">
                      <span>+</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart_nav_bottom">
          <div class="nav_bottom">
            <span class="min_order_val_info"></span>
            <a class="review_btn" href="#" @click.prevent="orderReview">
              Review Order
              </a>
              <OrderReview @closeModal="closeModal" v-show="showReview" />
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import { ref } from 'vue'
import OrderReview from './OrderReview.vue';

export default {
  components: {
    OrderReview,
  },
  setup() {
    const showReview = ref(false)

    const closeModal = () => {
      showReview.value = false
    }

    const orderReview = () => {
      showReview.value = true
    }

    return {
      showReview,
      closeModal,
      orderReview,
    }
  },
}
</script>
<style scoped>
.modal_overlay {
  position: fixed;
  z-index: 1009;
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
.cart_nav_top {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 60px;
  box-sizing: border-box;
  box-shadow: 0px 12px 6px -11px rgba(0, 0, 0, 0.12);
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  background: #ffffff;
}
.cart_nav_top_header {
  display: flex;
  justify-content: center;
  height: 60px;
}
.cart_nav_top_header_content {
  display: flex;
  align-items: center;
  padding: 0em 1em;
  width: 100%;
  justify-content: space-between;
}
.cart_content_left {
  display: flex;
  align-items: center;
}
.close_cart {
  background: #f5f5f5;
  color: #c9386f;
  text-decoration: none;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}
.cart_content_left .title {
  font-weight: bold;
  margin-left: 1em;
  font-size: 1.2em;
}
.cart_nav_top_header_content .total_info {
  text-align: right;
}
.cart_nav_top_header_content .price_label,
.price_info {
  font-size: 0.9em;
  font-weight: bold;
}
.cart_nav_content {
  padding-top: 60px;
  padding-bottom: 60px;
  overflow-y: auto;
  scroll-behavior: smooth;
  height: calc(100% - 150px);
}
.cart_underline {
  border-bottom: solid 1px #efefef;
  background: #fbfbfb;
  padding: 1em;
}
.cart_product_entry {
  display: flex;
  flex-direction: column;
}
.cart_product_entry .product_info_ui {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
  cursor: pointer;
}
.cart_product_entry .product_info_ui .product_info {
  flex: 1;
}
.cart_product_entry .product_info_ui .product_info .title {
  font-size: 1em;
  font-weight: 600;
  color: #c9386f;
}
.edit_icon {
  margin-right: 5px;
}
.cart_product_entry .product_info_ui .product_info .title .variation_info {
  font-weight: normal;
  font-size: 0.9em;
}
.cart_product_entry .product_info_ui .product_info .summary {
  font-weight: 300;
  font-size: 1em;
}
.cart_product_entry .product_info_ui .product_price {
  flex-shrink: 0;
}
.cart_product_entry .product_quantity {
  display: flex;
  align-items: center;
}
.cart_product_entry .product_quantity .quantity_info {
  border: solid 1px #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  height: 2em;
  padding: 0 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
}
.quantity_controls {
  border: solid 1px #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.square_min,
.square_plus {
  text-decoration: none;
  color: #c9386f;
  width: 2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}
.square_min span,
.square_plus span {
  font-size: 2em;
}
.cart_product_entry .product_quantity .quantity_controls .separator {
  height: 1.8em;
  width: 1px;
  background: #ccc;
}
.cart_nav_bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 60px;
  background: #ffffff;
}
.nav_bottom {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
.review_btn {
  background: #c9386f;
  color: #fff;
  text-decoration: none;
  padding: 0.7em 1.5em;
  border-radius: 0.4em;
  display: flex;
  align-items: center;
  font-size: 1em;
  justify-content: center;
}
</style>
