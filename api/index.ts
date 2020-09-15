import * as express from "express";
import * as multer from "multer";

const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  res.append("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/**
 * Upload an individual document
 */
app.post("/resource", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
});

/**
 * Delete a document
 */
app.delete("/resource/:id", (req, res) => {
  console.log(req.params.id);
});

/**
 * List all uploaded documents
 */
app.get("/resources", (req, res) => {
  res.send(["A", "B", "C"]);
});

/**
 * Search documents by name using the API
 */
app.get("/resources/search", (req, res) => {
  console.log(req.query.term);
  res.send(["A", "B"]);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
