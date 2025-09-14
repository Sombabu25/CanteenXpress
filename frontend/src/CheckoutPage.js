import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cart.length === 0) {
    return <h2>No items in cart</h2>;
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  const placeOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, paymentMethod }),
      });

      if (res.ok) {
        setOrderPlaced(true);
        setTimeout(() => {
          navigate("/"); // redirect to home after 3 sec
        }, 3000);
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      {/* Order Summary */}
      <h2>Order Summary</h2>
      {cart.map((item) => (
        <p key={item._id}>
          {item.name} × {item.quantity} = ₹{item.price * item.quantity}
        </p>
      ))}
      <h3>Total: ₹{total}</h3>

      {/* Payment Options */}
      <h2>Select Payment Method</h2>
      <label>
        <input
          type="radio"
          value="cash"
          checked={paymentMethod === "cash"}
          onChange={() => setPaymentMethod("cash")}
        />
        Cash on Delivery
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="online"
          checked={paymentMethod === "online"}
          onChange={() => setPaymentMethod("online")}
        />
        Online Payment (QR)
      </label>

      {/* Show QR if Online */}
      {paymentMethod === "online" && (
        <div style={{ marginTop: "20px" }}>
          <h3>Scan QR Code to Pay</h3>
          <QRCode value={`upi://pay?pa=merchant@upi&am=${total}&cu=INR`} size={200} />
          <p>UPI ID: merchant@upi</p>
          <button onClick={placeOrder} style={{ marginTop: "10px" }}>
            I Have Paid
          </button>
        </div>
      )}

      {/* Cash Option */}
      {paymentMethod === "cash" && (
        <button onClick={placeOrder} style={{ marginTop: "20px" }}>
          Place Order (Cash)
        </button>
      )}

      {/* Confirmation */}
      {orderPlaced && <h2>✅ Order Placed Successfully! Redirecting...</h2>}
    </div>
  );
}

export default CheckoutPage;
