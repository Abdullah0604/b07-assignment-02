import app from "./app.js";
import { initDB } from "./config/db.js";
import { config } from "./config/index.js";

const port = config.port;

app.listen(port, () => {
  initDB();
  console.log("server is running on port ", port);
});
