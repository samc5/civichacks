import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGO_URI;
const MONGODB_DB = "ICE"

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error("Please define MONGODB_URI and MONGODB_DB in .env.local");
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
