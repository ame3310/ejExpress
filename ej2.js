import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API de ejercicios Express",
    instructions:
      "Usa Postman para probar los endpoints de productos y usuarios",
  });
});

app
  .route("/productos")
  .get((req, res) => {
    res.json({
      status: "success",
      message: "Listado de productos (GET)",
      data: [],
    });
  })
  .post((req, res) => {
    res.status(201).json({
      status: "success",
      message: "Producto creado (POST)",
      receivedData: req.body,
    });
  })
  .put((req, res) => {
    res.json({
      status: "success",
      message: "Producto actualizado (PUT)",
      updatedData: req.body,
    });
  })
  .delete((req, res) => {
    res.json({
      status: "success",
      message: "Producto eliminado (DELETE)",
    });
  });

app
  .route("/usuarios")
  .get((req, res) => {
    res.json({
      status: "success",
      message: "Listado de usuarios (GET)",
    });
  })
  .post((req, res) => {
    res.status(201).json({
      status: "success",
      message: "Usuario creado (POST)",
      receivedData: req.body,
    });
  })
  .put((req, res) => {
    res.json({
      status: "success",
      message: "Usuario actualizado (PUT)",
    });
  })
  .delete((req, res) => {
    res.json({
      status: "success",
      message: "Usuario eliminado (DELETE)",
    });
  });

app.listen(PORT, () => {
  console.log(`✅ Servidor listo para Postman en http://localhost: ${PORT}`);
});
