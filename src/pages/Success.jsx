import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success">
      <h2>🎉 Pesanan Berhasil!</h2>
      <p>Terima kasih sudah berbelanja 💚</p>

      <button onClick={() => navigate("/")}>
        Kembali ke Home
      </button>
    </div>
  );
}