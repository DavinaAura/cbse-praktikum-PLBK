import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Swal from "sweetalert2";
import dayjs from "dayjs"; // Poin 2: Import dayjs
import { useCart } from "../context/CartContext";

const schema = z.object({
  nama: z.string().min(1, "Nama lengkap wajib diisi"),
  nim: z.string().min(1, "Kode pos wajib diisi"),
  email: z.string().email("Format email salah"),
  prodi: z.string().min(1, "Alamat lengkap wajib diisi"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    nim: "",
    email: "",
    prodi: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.errors);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pastikan semua data diisi dengan benar!',
        confirmButtonColor: '#007bff'
      });
    } else {
      setErrors([]);
      
      // Poin 2: Menggunakan dayjs untuk mengambil tanggal order saat ini
      const tanggalOrder = dayjs().format("DD MMMM YYYY, HH:mm");

      clearCart();
      navigate("/loading");
      
      setTimeout(() => {
        Swal.fire({
          title: "Checkout Berhasil!",
          // Menampilkan tanggal pada pesan order
          text: `Pesanan Anda berhasil diproses pada ${tanggalOrder}`,
          icon: "success",
          confirmButtonColor: "#007bff",
          confirmButtonText: "OK"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }, 2000);
    }
  };

  const getErrorMessage = (path) => {
    if (!errors || !Array.isArray(errors)) return null;
    const error = errors.find((err) => err.path[0] === path);
    return error ? error.message : null;
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
    color: "#333",
    boxSizing: "border-box"
  };

  const errorStyle = {
    color: "red",
    fontSize: "11px",
    marginTop: "5px",
    display: "block"
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Form Input Biodata</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <input type="text" placeholder="Nama Lengkap" style={inputStyle} value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          {getErrorMessage("nama") && <span style={errorStyle}>{getErrorMessage("nama")}</span>}
        </div>

        <div>
          <input type="text" placeholder="Kode Pos" style={inputStyle} value={form.nim} onChange={(e) => setForm({ ...form, nim: e.target.value })} />
          {getErrorMessage("nim") && <span style={errorStyle}>{getErrorMessage("nim")}</span>}
        </div>

        <div>
          <input type="email" placeholder="Alamat Email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {getErrorMessage("email") && <span style={errorStyle}>{getErrorMessage("email")}</span>}
        </div>

        <div>
          <input type="text" placeholder="Alamat Lengkap" style={inputStyle} value={form.prodi} onChange={(e) => setForm({ ...form, prodi: e.target.value })} />
          {getErrorMessage("prodi") && <span style={errorStyle}>{getErrorMessage("prodi")}</span>}
        </div>

        <div>
          <input type="text" placeholder="Nomor Telepon Seluler" style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          {getErrorMessage("phone") && <span style={errorStyle}>{getErrorMessage("phone")}</span>}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px"
          }}
        >
          SIMPAN
        </button>
      </form>
    </div>
  );
};

export default Checkout;