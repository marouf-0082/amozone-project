export let cart = JSON.parse(localStorage.getItem('cart'));

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += productQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem); 
    }
  });

  cart = newCart;
  saveToStorage();
  location.reload();
}

export function updateQuantity(productId, newQuantity){
  if (newQuantity >= 0 && newQuantity < 1000){
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId){
        cartItem.quantity = newQuantity;
        saveToStorage();
        location.reload();
      }
    })
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}