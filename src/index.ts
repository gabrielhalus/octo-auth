import express, { Express } from "express";
import * as dotenv from "dotenv";
import initializeDatabase from "./database/database";

dotenv.config({ path: ".env.local" });

async function startServer() {
  const app: Express = express();
  const PORT = process.env.PORT;

  if (!PORT) throw new Error("Please provide a valid PORT in the .env.local file.");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  try {
    const { error, status } = await initializeDatabase();

    if (error) console.error("❌ MongoDB connection failed:", error.message);
    else if (status) {
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    if (error instanceof Error) console.error("❌ Error occured while starting the server:", error.message);
    else console.error("❌ Error occured while starting the server.");
  }
}

startServer();
