import * as express from "express";
import * as multer from "multer";
import { addResource, fetchAllResources, findResourceById, removeResourceById, searchResourcesByName } from "./state";

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
app.post("/resource", upload.single("file"), (req, res) => {
  const { file } = req;
  const { name } = req.body;

  const resource = {
    id: file.filename,
    name,
    size: file.size,
  };

  addResource(resource);

  res.sendStatus(200);
});

/**
 * Delete a document
 */
app.delete("/resource/:id", async (req, res) => {
  const { id } = req.params;

  if (!findResourceById(id)) {
    res.sendStatus(404);
  }

  await removeResourceById(id);

  res.sendStatus(200);
});

/**
 * List all uploaded documents
 */
app.get("/resources", (req, res) => {
  res.send(fetchAllResources());
});

/**
 * Search documents by name using the API
 */
app.get("/resources/search", (req, res) => {
  const term = req.query.term as string;

  res.send(searchResourcesByName(term));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
