import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch menu from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  // ✅ Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c._id === item._id);
      if (existing) {
        return prevCart.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // ✅ Navigate to checkout
  const goToCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <div>
      <h1>🍴 Canteen Menu</h1>

      {/* Menu Items */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {menu.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>🛒 Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div>
            {cart.map((c) => (
              <p key={c._id}>
                {c.name} × {c.quantity} = ₹{c.price * c.quantity}
              </p>
            ))}
            <h3>
              Total: ₹
              {cart.reduce((sum, c) => sum + c.price * c.quantity, 0)}
            </h3>
            <button onClick={goToCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
