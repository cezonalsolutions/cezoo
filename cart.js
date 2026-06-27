document.getElementById("cartFloatBox").addEventListener("click", () => {
  openCartPagePopup();
});

document.getElementById("closeCartPage").addEventListener("click", () => {
  closeCartPagePopup();
});

function openCartPagePopup(){
  const popup = document.getElementById("cartPagePopup");

  popup.classList.add("open");
  document.body.style.overflow = "hidden";

  document.querySelector(".floatBarWrap").classList.add("popupMode");

  document.getElementById("cartHeaderVillage").innerText =
    document.getElementById("village")?.innerText || "Selected Location";

  document.getElementById("cartHeaderStreet").innerText =
    document.getElementById("street")?.innerText || "Delivery address";

  showCartPageShimmer();

  setTimeout(() => {
    renderCartPage();
  }, 150);
}

function closeCartPagePopup(){
  document.getElementById("cartPagePopup").classList.remove("open");
  document.body.style.overflow = "";
  document.querySelector(".floatBarWrap").classList.remove("popupMode");
}

function showCartPageShimmer(){
  const box = document.getElementById("cartPageContent");

  box.innerHTML = `
    <div class="cartShimmerBox">
      <div class="cartShimmerLine" style="width:70%;"></div>
      <div class="cartShimmerSmall"></div>

      ${Array(4).fill(`
        <div class="cartShimmerItem">
          <div class="cartShimmerImg"></div>
          <div>
            <div class="cartShimmerLine"></div>
            <div class="cartShimmerSmall"></div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="cartShimmerBox">
      <div class="cartShimmerLine" style="width:60%;"></div>
      <div class="cartShimmerLine"></div>
      <div class="cartShimmerLine"></div>
      <div class="cartShimmerSmall"></div>
    </div>
  `;
}

function getCartTotals(){
  const items = Object.values(cart || {});

  let mrpTotal = 0;
  let itemTotal = 0;
  let totalQty = 0;

  items.forEach(item => {
    const qty = Number(item.qty || 0);
    const mrp = Number(item.original_price || item.discount_price || 0);
    const price = Number(item.discount_price || 0);

    mrpTotal += mrp * qty;
    itemTotal += price * qty;
    totalQty += qty;
  });

const deliveryFee = 35;

/* Handling Fee Logic */
const handlingFee = 10;

const deliveryPay = 0;

/* ₹10 only if cart has MORE THAN 15 items */
const handlingPay = totalQty > 15 ? handlingFee : 0;

const toPay = itemTotal + handlingPay;

const savings =
  (mrpTotal - itemTotal) +
  deliveryFee;
  return {
    items,
    mrpTotal,
    itemTotal,
    totalQty,
    deliveryFee,
    handlingFee,
    deliveryPay,
    handlingPay,
    toPay,
    savings
  };
}

function renderCartPage(){
  const box = document.getElementById("cartPageContent");
  const t = getCartTotals();

  document.getElementById("cartToPayBottom").innerText = `₹${t.toPay}`;

  if(t.totalQty <= 0){
    box.innerHTML = `
      <div style="padding:50px;text-align:center;font-weight:900;">
        Your cart is empty
      </div>
    `;
    return;
  }

  box.innerHTML = `
    <div class="cartDeliveryCard">

   <div class="cartDeliveryTop">

  <div class="cartDeliveryLeft">

    <div class="cartClockIcon">
      <i class="fa-regular fa-clock"></i>
    </div>

    <div class="deliveryInfoWrap">

      <div class="deliveryTimeText">
        Delivering in 6 mins
      </div>

      <div class="deliveryItemsText">
        ${t.totalQty} items
      </div>

    </div>

  </div>

  <div class="scheduleBtn">
    <i class="fa-regular fa-calendar"></i>
    <span>Schedule</span>
  </div>
</div>

      ${t.items.map(item => renderCartItemRow(item)).join("")}

      <div class="addMoreCart">
        Forgot something? <span onclick="closeCartPagePopup()">Add More Items</span>
      </div>

    </div>
<div class="cartCouponCard">

  <div class="couponTitle">
    Apply Coupon
  </div>

  <div class="couponRow">

    <input
      type="text"
      id="couponCode"
      class="couponInput"
      placeholder="Enter coupon code">

    <button
      class="applyCouponBtn"
      onclick="applyCoupon()">
      APPLY
    </button>

  </div>

</div>
    <div class="cartBillCard">

    <div class="billHeader">
  <div class="billIcon">
    <i class="fa-solid fa-receipt"></i>
  </div>
  <h3>Bill Summary</h3>
</div>
      <div class="billRows">

        <div class="billRow">
          <span>Item Total</span>
          <strong>
            <del>₹${t.mrpTotal}</del> ₹${t.itemTotal}
          </strong>
        </div>

     <div class="billRow">
  <span>Delivery Fee</span>
  <strong>
    <del>₹${t.deliveryFee}</del> FREE
  </strong>
</div>
   <div class="billRow">
  <span>Handling Fee</span>
  <strong>
    ${t.handlingPay === 0 ? "₹0" : "₹10"}
  </strong>
</div>
        <div class="billRow billTotal">
          <span>To Pay</span>
          <strong>
           <del>₹${t.mrpTotal}</del>
₹${t.toPay}
          </strong>
        </div>

      </div>
    </div>

    <div class="cartSavingsCard">
      <div class="savingsTop">
        <span>Savings on this order</span>
        <span class="savingsBadge">₹${t.savings}</span>
      </div>

      <div class="savingsInner">
       <div class="savingLine">
  <span>Discount on MRP</span>
  <strong>₹${t.mrpTotal - t.itemTotal}</strong>
</div>

<div class="savingLine">
  <span>FREE delivery savings</span>
  <strong>₹${t.deliveryFee}</strong>
</div>
      </div>
    </div>
  `;
}

function renderCartItemRow(item){
  const key = `${item.table}_${item.id}`;

  return `
    <div class="cartItem">

      <div class="cartItemImg">
        <div class="cartImgLoader"></div>
        <img
          src="${item.image1 || ""}"
          onload="this.previousElementSibling.remove()"
          onerror="this.previousElementSibling.remove()">
      </div>

      <div class="cartItemMiddle">
        <div class="cartItemName">${item.name || ""}</div>

        <div class="cartItemQty">
          ${item.quantity || ""} ${item.unit || ""}
        </div>

        <div class="cartPriceBox">
          <del>₹${Number(item.original_price || 0) * Number(item.qty || 1)}</del>
          <span>₹${Number(item.discount_price || 0) * Number(item.qty || 1)}</span>
        </div>
      </div>

      <div class="cartItemRight">
        <div class="cartQtyBox">
          <button onclick="cartPageDecrease('${key}')">−</button>
          <span>${item.qty}</span>
          <button onclick="cartPageIncrease('${key}')">+</button>
        </div>
      </div>

    </div>
  `;
}

function cartPageIncrease(key){
  if(!cart[key]) return;

  const box = document.getElementById("cartPageContent");
  const oldScroll = box.scrollTop;

  cart[key].qty++;
  cart[key].addedTime = Date.now();

  saveCart();
  updateCartFloat();
  updatePopupCartSummary();
  restoreCartButtons(document);

  renderCartPage();

  box.scrollTop = oldScroll;
}

function cartPageDecrease(key){
  if(!cart[key]) return;

  const box = document.getElementById("cartPageContent");
  const oldScroll = box.scrollTop;

  cart[key].qty--;

  if(cart[key].qty <= 0){
    delete cart[key];
  }

  saveCart();
  updateCartFloat();
  updatePopupCartSummary();
  restoreCartButtons(document);

  renderCartPage();

  box.scrollTop = oldScroll;
}

function cartPageDecrease(key){
  if(!cart[key]) return;

  cart[key].qty--;

  if(cart[key].qty <= 0){
    delete cart[key];
  }

  saveCart();
  updateCartFloat();
  updatePopupCartSummary();
  restoreCartButtons(document);
  renderCartPage();
}
function applyCoupon(){
  const code = document.getElementById("couponCode").value.trim();

  if(!code) return;

  console.log("Coupon:", code);
}
