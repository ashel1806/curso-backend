import http from "http";
import Controller from "./controller.js";

// Creamos el servidor
const app = http.createServer((req, res) => {
  if (req.url === "/api/books" && req.method === "GET") {
    Controller.getAllBooks(req, res);
  } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === "GET") {
    // Obtenemos el id del libro de la URL
    const id = req.url.split("/")[3];
    Controller.getBookById(req, res, parseInt(id));
  } else if (req.url === "/api/books" && req.method === "POST") {
    Controller.createBook(req, res);
  } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === "PUT") {
    // Obtenemos el id del libro de la URL
    const id = req.url.split("/")[3];
    Controller.updateBook(req, res, parseInt(id));
  } else if (
    req.url.match(/\/api\/books\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    // Obtenemos el id del libro de la URL
    const id = req.url.split("/")[3];
    Controller.deleteBook(req, res, parseInt(id));
  } else {
    // Si no se encuentra la ruta, enviamos un error
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

// Guardamos el puerto en donde se ejecutará el servidor
const PORT = 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
