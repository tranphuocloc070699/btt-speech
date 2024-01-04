import multiFaRouter from "./routes/multiFa.route.js";
import express from "express";
import cors from "cors";
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

app.get("/", (req, res) => {

  res.send('[BTT] Multi Factor Authenticate App')
});

app.use("/multi-fa", multiFaRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
