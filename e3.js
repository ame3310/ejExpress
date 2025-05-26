import express from "express";

const app = express();
app.use(express.json());

let products = [
  { id: 1, nombre: "Taza de Harry Potter", precio: 300 },
  { id: 2, nombre: "FIFA 22 PS5", precio: 1000 },
  { id: 3, nombre: "Figura Goku Super Saiyan", precio: 100 },
  { id: 4, nombre: "Zelda Breath of the Wild", precio: 200 },
  { id: 5, nombre: "Skin Valorant", precio: 120 },
  { id: 6, nombre: "Taza de Star Wars", precio: 220 },
];

app.get("/products", (req, res) => {
  let filteredProducts = [...products];

  if (req.query.precioMin || req.query.precioMax) {
    const min = req.query.precioMin ? Number(req.query.precioMin) : 0;
    const max = req.query.precioMax ? Number(req.query.precioMax) : Infinity;
    filteredProducts = filteredProducts.filter(
      (p) => p.precio >= min && p.precio <= max
    );
  }

  if (req.query.id) {
    filteredProducts = filteredProducts.filter(
      (p) => p.id === Number(req.query.id)
    );
  }

  if (req.query.nombre) {
    filteredProducts = filteredProducts.filter((p) =>
      p.nombre.toLowerCase().includes(req.query.nombre.toLowerCase())
    );
  }

  res.json({
    description: "Productos",
    items: filteredProducts,
  });
});

app.post("/products", (req, res) => {
  const { nombre, precio } = req.body;
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    nombre,
    precio: Number(precio),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === Number(id));

  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    id: Number(id),
  };

  res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id !== Number(id));
  res.status(204).end();
});

app.get("/products/filter", (req, res) => {
  const filtered = products.filter((p) => p.precio >= 50 && p.precio <= 250);
  res.json({
    description: "Productos entre $50 y $250",
    items: filtered,
  });
});

app.listen(3000, () => {
  console.log("Servidor de productos en http://localhost:3000");
});
