import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, totalPrice, removeItem, increment, decrement } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Keranjang Kosong</h2>
        <p>Belum ada produk di keranjang Anda.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Keranjang Belanja</h2>

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />

          <div className="cart-info">
            <h4>{item.title}</h4>
            <p>${item.price.toFixed(2)} x {item.quantity}</p>

            <div className="qty-control">
              <button onClick={() => decrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>
          </div>

          <p className="price">
            ${(item.price * item.quantity).toFixed(2)}
          </p>

          <button
            className="remove-btn"
            onClick={() => removeItem(item.id)}
          >
            Hapus
          </button>
        </div>
      ))}

      <div className="cart-footer">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}