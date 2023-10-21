import mongoose, { ConnectOptions } from "mongoose";

export default async function (): Promise<{ error?: Error; status: boolean }> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI || MONGODB_URI === "") {
    return {
      error: new Error("Please provide a valid databse URI in the .env.local file."),
      status: false,
    };
  }

  const connectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions;

  await mongoose.set("strictQuery", true).connect(MONGODB_URI, connectOptions);
  console.log("✅ Connection established with MongoDB");
  return {
    status: true,
  };
}
