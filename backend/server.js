import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Root Route
app.get("/", (req, res) => {
  res.send("Trackr API working");
});

app.use("/api", router);

// Start Server
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});