import { beers } from "./lager-lists.js";

// We will fetch this from the backend now
let cartItems = [];

document.addEventListener("DOMContentLoaded", async () => {
  const tableContainer = document.getElementById("table-container");
  const cartContainer = document.getElementById("cart-container");

  // Get Session Data
  const session = Cookies.get("user_session");
  if (!session) {
    window.location.href = "../../app/login.html";
    return;
  }
  const userData = JSON.parse(session);
  const userId = userData.id;

  // Helper: Set Headers
  const config = {
    headers: { "x-user-id": userId },
  };

  // --- 1. Fetch Cart from Backend ---
  async function syncCart() {
    try {
      const res = await axios.get(
        `http://localhost:3001/cart/${userId}`,
        config,
      );
      // Prisma returns { items: [ { beer: {...}, quantity: 5 } ] }
      cartItems = res.data.items || [];
      renderCart();
    } catch (err) {
      console.error("Cart Sync Error:", err);
    }
  }

  function calculateSubtotal() {
    return cartItems.reduce((sum, item) => {
      return sum + item.beer.price * item.quantity;
    }, 0);
  }

  // --- 2. Render Table ---
  function renderTable() {
    // Note: 'beers' comes from your local lager-lists.js
    tableContainer.innerHTML = `
      <table class="w-full border border-gray-300 bg-white shadow rounded-xl overflow-hidden">
        <thead class="bg-beer-dark text-white">
          <tr>
            <th class="p-3 text-left pl-6">Beer</th>
            <th class="p-3">Price</th>
            <th class="p-3">Stock</th>
            <th class="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          ${beers
            .map(
              (beer) => `
              <tr class="text-center border-t">
                <td class="p-3 text-left pl-6 font-medium">${beer.name}</td>
                <td class="p-3">$${beer.price.toFixed(2)}</td>
                <td class="p-3">${beer.stock}</td>
                <td class="p-3 flex justify-center items-center gap-2">
                  <input type="number" min="1" value="1" id="qty-${beer.id}" class="w-16 border rounded text-center" />
                  <button data-id="${beer.id}" class="add-btn bg-beer-gold text-white px-3 py-1 rounded">Add</button>
                </td>
              </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>`;
  }

  // --- 3. Render Cart ---
  function renderCart() {
    const subtotal = calculateSubtotal();
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const discount = totalQty > 5 ? subtotal * 0.1 : 0;

    cartContainer.innerHTML = `
      <h2 class="text-xl font-bold mb-4">🛒 Cart</h2>
      <div class="space-y-3 mb-4">
        ${
          cartItems.length === 0
            ? `<p>Empty</p>`
            : cartItems
                .map(
                  (item) => `
          <div class="flex justify-between border-b py-2">
            <div>
              <p class="font-bold">${item.beer.name}</p>
              <p class="text-sm">${item.quantity} x $${item.beer.price}</p>
            </div>
            <button data-id="${item.beer.id}" class="remove-btn text-red-500">Remove</button>
          </div>
        `,
                )
                .join("")
        }
      </div>
      <div class="border-t pt-2 font-bold">Total: $${(subtotal - discount).toFixed(2)}</div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  // --- 4. Event Listeners (Axios Calls) ---
  document.addEventListener("click", async (e) => {
    // ADD TO CART
    if (e.target.classList.contains("add-btn")) {
      const beerId = e.target.dataset.id; // String UUID
      const qtyInput = document.getElementById(`qty-${beerId}`);
      const quantity = parseInt(qtyInput.value);

      try {
        await axios.post(
          `http://localhost:3001/cart/${userId}/items`,
          {
            beerId: beerId,
            quantity: quantity,
          },
          config,
        );

        await syncCart(); // Refresh from Redis/DB
      } catch (err) {
        alert("Failed to add to cart");
      }
    }

    // REMOVE FROM CART
    if (e.target.classList.contains("remove-btn")) {
      const beerId = e.target.dataset.id;
      try {
        await axios.delete(
          `http://localhost:3001/cart/${userId}/items/${beerId}`,
          config,
        );
        await syncCart();
      } catch (err) {
        alert("Failed to remove");
      }
    }
  });

  renderTable();
  await syncCart(); // Initial load
});
