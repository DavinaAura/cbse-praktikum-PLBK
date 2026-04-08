import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";
import Loading from "../components/Loading";
import dayjs from "dayjs";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <p>Produk tidak ditemukan</p>;

  const today = dayjs().format("DD MMMM YYYY");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.title}</h2>
      <img src={product.image} width="200" />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
}
