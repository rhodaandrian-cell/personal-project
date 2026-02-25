import { useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

export default function AddProductPage() {
  const navigate = useNavigate();

  // ✅ hooks for rubric
  const nameId = useId();
  const descId = useId();
  const categoryId = useId();
  const priceId = useId();
  const stockId = useId();
  const skuId = useId();

  const nameRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    sku: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // basic validation
    if (!form.name.trim()) {
      setError("Name is required.");
      nameRef.current?.focus();
      return;
    }
    const priceNum = Number(form.price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      setError("Price must be a number greater than 0.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category.trim() || "General",
        price: priceNum,
        stock: Number(form.stock) || 0,
        sku: form.sku.trim() || `SKU-${Math.floor(Math.random() * 100000)}`,
      };

      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const created = await res.json();

      // reset + send user to detail page
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        sku: "",
      });

      navigate(`/products/${created.id}`);
    } catch (e2) {
      setError(e2.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Add Product</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <div>
          <label htmlFor={nameId}>Name *</label>
          <input
            id={nameId}
            ref={nameRef}
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="e.g. Wireless Mouse"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label htmlFor={descId}>Description</label>
          <textarea
            id={descId}
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder="Short description..."
            rows={3}
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label htmlFor={categoryId}>Category</label>
          <input
            id={categoryId}
            name="category"
            value={form.category}
            onChange={updateField}
            placeholder="e.g. Accessories"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label htmlFor={priceId}>Price *</label>
          <input
            id={priceId}
            name="price"
            value={form.price}
            onChange={updateField}
            placeholder="e.g. 19.99"
            inputMode="decimal"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label htmlFor={stockId}>Stock</label>
          <input
            id={stockId}
            name="stock"
            value={form.stock}
            onChange={updateField}
            placeholder="e.g. 20"
            inputMode="numeric"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <div>
          <label htmlFor={skuId}>SKU</label>
          <input
            id={skuId}
            name="sku"
            value={form.sku}
            onChange={updateField}
            placeholder="e.g. MOU-1001"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{ padding: "10px 14px", cursor: submitting ? "not-allowed" : "pointer" }}
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
}