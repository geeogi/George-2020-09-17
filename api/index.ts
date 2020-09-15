import * as express from "express";
import { promises as asyncFs } from "fs";
import * as multer from "multer";
import { Resource } from "./model/resource";

let MOCK_RESOURCE_METADATA_DB: Resource[] = [];

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

  MOCK_RESOURCE_METADATA_DB.push({
    id: file.filename,
    name,
    size: file.size,
  });

  res.sendStatus(200);
});

/**
 * Delete a document
 */
app.delete("/resource/:id", async (req, res) => {
  const { id } = req.params;
  const resourceToDelete = MOCK_RESOURCE_METADATA_DB.find((resource) => resource.id !== id);

  await asyncFs.unlink(`uploads/${resourceToDelete.id}`);
  MOCK_RESOURCE_METADATA_DB = MOCK_RESOURCE_METADATA_DB.filter((resource) => resource.id !== id);

  res.sendStatus(200);
});

/**
 * List all uploaded documents
 */
app.get("/resources", (req, res) => {
  res.send(MOCK_RESOURCE_METADATA_DB);
});

/**
 * Search documents by name using the API
 */
app.get("/resources/search", (req, res) => {
  const term = req.query.term as string;
  const filtered = MOCK_RESOURCE_METADATA_DB.filter((resource) => resource.name.includes(term));
  res.send(filtered);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
