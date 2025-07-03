const cartList = document.getElementById("cart-list");

function addToCart(productName) {
  const li = document.createElement("li");
  li.className = "cart-item";
  li.innerHTML = `
    <span>${productName}</span>
    <button class="delete-btn" onclick="deleteItem(this)">Remove</button>
  `;
  cartList.appendChild(li);
}

function deleteItem(button) {
  const item = button.parentElement;
  cartList.removeChild(item);
}
