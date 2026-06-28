import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
connectDb();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.get("/sher", (req, res) => {
  res.send("sher");
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
