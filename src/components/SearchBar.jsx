export default function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Cari produk..."
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: '0.5rem',
        width: '100%',
        marginBottom: '1rem'
      }}
    />
  );
}