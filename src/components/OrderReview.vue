<template>
  <div class="modal_overlay">
    <div class="modal_content" @click.stop>
      <div class="both_nav_apt_top_nav">
        <div class="cart_top_nav_header_content_ui">
          <div class="cart_top_nav_header_content">
            <div class="cart_nav">
              <a
                class="round_nav_fill reverse-color close_page"
                href="#"
                @click.prevent="$emit('closeModal')"
                ><span>✕</span></a
              >
              <div class="title">Order Review</div>
            </div>
          </div>
        </div>
      </div>

      <div class="both_nav_apt_content_ui">
        <div></div>
        <div></div>
        <div class="apt_content_widget order_summary_widget">
          <div class="in_content">
            <div class="wgt_header">
              <div class="wgt_title_ui">
                <span class="icon-file-text wgt_icon"></span>
                <div class="wgt_title">Order summary</div>
              </div>
            </div>
            <div class="wgt_content mt_10">
              <div class="line_item">
                <div class="line_item_title">
                  <span>2x</span>London broil <span class="variation_info">(100g)</span>
                </div>
                <div class="ml_15">
                  <span class="currency_symbol">€</span><span class="currency_val">178.00</span>
                </div>
              </div>

              <div class="wgt_hr_line mt_10 mb_10"></div>
              <div class="order_summary_dynamic_content">
                <div class="line_item space_b">
                  <div class="line_item_title"><span>Subtotal</span></div>
                  <div class="ml_15">
                    <span class="currency_symbol">€</span><span class="currency_val">178.00</span>
                  </div>
                </div>
                <div class="line_item space_b">
                  <div class="line_item_title"><span>Tip (15 %)</span></div>
                  <div class="ml_15">
                    <span class="currency_symbol">€</span><span class="currency_val">26.70</span>
                  </div>
                </div>
                <div class="line_item space_b">
                  <div class="line_item_title"><span>Delivery fee</span></div>
                  <div class="ml_15">Free</div>
                </div>
                <div class="line_item space_b">
                  <div class="line_item_title"><span>Total</span></div>
                  <div class="ml_15">
                    <span class="currency_symbol">€</span><span class="currency_val">204.70</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="apt_content_widget mt_20 bm_20 delivery_address_widget">
            <div class="in_content">
              <div class="wgt_header space_btw clickable">
                <div class="wgt_title_ui">
                  <span class="icon-location wgt_icon"></span>
                  <div class="wgt_title">Delivery information</div>
                </div>
                <div class="wgt_main_action"><span class="icon-edit-3"></span></div>
              </div>
              <div class="wgt_content mt_10">
                <div class="wgt_info_clickable">Add delivery information</div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div>
          <div class="apt_content_widget mt_20 bm_20 payment_method_widget">
            <div class="in_content">
              <div class="wgt_header space_btw">
                <div class="wgt_title_ui">
                  <span class="icon-wallet wgt_icon"></span>
                  <div class="wgt_title">Payment method</div>
                </div>
              </div>
              <div class="wgt_content mt_10">
                <div class="wgt_mayment_methods">
                  <div
                    class="product_widget delivery_widget local_delivery payment_type"
                    data-payment-type="cash_on_delivery"
                  >
                    <div class="widget_radio_entry">
                      <div class="radio_symbol primary_color_border">
                        <div class="radio_fill primary_color_background show"></div>
                      </div>
                      <div class="variant_info">Cash on delivery</div>
                    </div>
                  </div>

                  <div
                    class="product_widget delivery_widget local_delivery payment_type"
                    data-payment-type="stripe"
                  >
                    <div class="widget_radio_entry">
                      <div class="radio_symbol primary_color_border">
                        <div class="radio_fill primary_color_background show"></div>
                      </div>
                      <div class="variant_info">Card (Stripe)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="user_privacy">
          <div class="product_widget apt_no_padding no_background pt_10 pb_10">
            <div class="widget_radio_entry selected">
              <div class="square_symbol primary_color_border">
                <div class="square_fill primary_color show terms_check_ui">
                  <span class="icon-check"></span>
                </div>
              </div>
              <div class="variant_info">
                I agree with the <a href="%23" class="terms_btn">Terms and Conditions</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
  background: #f7f7f7;
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
.both_nav_apt_top_nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 60px;
  box-shadow: 0px 12px 6px -11px rgba(0, 0, 0, 0.12);
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  background: #ffffff;
}
.cart_top_nav_header_content_ui {
  display: flex;
  justify-content: center;
  height: 60px;
}
.cart_top_nav_header_content {
  display: flex;
  align-items: center;
  padding: 0em 1em;
  width: 100%;
  justify-content: space-between;
}
.cart_top_nav_header_content .cart_nav {
  display: flex;
  align-items: center;
}
.round_nav_fill {
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
.cart_top_nav_header_content .cart_nav .title {
  font-weight: bold;
  margin-left: 1em;
  font-size: 1.2em;
}
.both_nav_apt_content_ui{
    padding-top: 60px;
    padding-bottom: 60px;
    overflow-y: auto;
    scroll-behavior: smooth;
    height: calc(100% - 150px);
}
.apt_content_widget{
    padding: 0em 1em;
    margin-top: 20px;
}
.apt_content_widget .in_content{
    box-shadow: 0px 12px 6px -11px rgba(0, 0, 0, 0.12);
    border-radius: 0.5em;
    background: #FFFFFF;
    padding: 1em;
}
.apt_content_widget .in_content .wgt_header{
    display: flex;
}
.apt_content_widget .in_content .wgt_header .wgt_title_ui{
    display: flex;
    align-items: baseline;
}
.apt_content_widget .in_content .wgt_header .wgt_title_ui .wgt_icon{
    color: #c9386f;
    margin-right: 0.7em;
}
.apt_content_widget .in_content .wgt_header .wgt_title_ui .wgt_title{
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 0.2em;
}
.wgt_content{
    margin-top: 10px;
}
.order_summary_widget .line_item{
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 1em;
}
.order_summary_widget .line_item .line_item_title span{
    margin-right: 10px;
}
.ml_15{
    margin-left: 15px;
}
.apt_content_widget .in_content .wgt_hr_line{
    width: 100%;
    background: #e9e9e9;
    height: 1px;
    margin-bottom: 10px;
    margin-top: 10px;
}
.order_summary_widget .line_item.space_b{
    margin-bottom: 0.4em;
}
.order_summary_widget .line_item{
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 1em;
}
.mt_20{
    
}
</style>
