import { cart, removeFromCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateQuantity } from "../data/cart.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id-update="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id-save="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});

export function calculateCartQuantity(newQuantity) {
  let emptyCart = `
        <div class="empty-cart-div">
          <h2>Cart empty! (Shop Now)</h2>
          <a href="amazon.html" class="button-primary shop-now">Shop Now</a>
        </div>
      `;
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  if (newQuantity) {
    cartQuantity = newQuantity;
  }
  document.querySelector(".js-cart-quantity-checkout").innerHTML =
    `${cartQuantity} items`;
  // cart quantity of order summary
  document.querySelector(".js-quantity-order-summary").innerHTML =
    `Items (${cartQuantity})`;
    if (cartQuantity === 0){
      document.querySelector('.js-main-checkout').innerHTML = emptyCart;
    }
}
calculateCartQuantity();

function updateQuantityCart() {
  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        const productId = updateLink.dataset.productIdUpdate;
        const cartItemContainer = updateLink.closest(".cart-item-container");
        cartItemContainer.classList.add("is-editing-quantity");
      });
    });
    saveingQuantity();
}
updateQuantityCart();

function saveingQuantity(){
document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
  saveLink.addEventListener("click", () => {      
    handleSave(saveLink);
  });
  const quantityInput = saveLink.parentElement.querySelector('.quantity-input');
  if(quantityInput) {
    quantityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter"){
        handleSave(saveLink);
      }
    })
  }
});
}

function handleSave(saveLink) {
  const cartItemContainer = saveLink.closest(".cart-item-container");
  cartItemContainer.classList.remove("is-editing-quantity");
  const newQuantity = saveLink.parentElement.querySelector(".quantity-input").value;
  const finalQuantity = Number(newQuantity);
    const productId = saveLink.dataset.productIdSave;
    updateQuantity(productId, finalQuantity);
}
