import React from "react";
import "./App.css";
import { PERMISSABLE_FILE_TYPES_MIME } from "./config/constants";
import { createResourceFromFile, deleteResourceById, fetchResources, searchResources } from "./handlers/resource";

function App() {
  return (
    <div className="App">
      <input
        type="file"
        accept={PERMISSABLE_FILE_TYPES_MIME.join(",")}
        onChange={(e) => {
          if (e.target.files && e.target.files.length === 1) {
            createResourceFromFile(e.target.files[0]);
          }
        }}
      ></input>
      <button onClick={fetchResources}>Fetch</button>
      <button onClick={() => searchResources("red")}>Search</button>
      <button onClick={() => deleteResourceById("aoi1-39e03-d0sjs-dos")}>Delete</button>
    </div>
  );
}

export default App;
