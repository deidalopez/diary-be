import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json()); // to parse incoming requests with JSON payloads

app.use("/api/posts", postRoutes);

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
