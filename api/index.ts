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

app.post("/resource", upload.single("image"), (req, res) => {
  // req.file is the `image` file
  console.log(req.file);

  // req.body will hold the text fields, if there were any
  console.log(req.body);
});

app.get("/resources", (req, res) => {
  res.send(["A", "B", "C"]);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
