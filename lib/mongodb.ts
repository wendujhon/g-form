import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";
const dbName = process.env.MONGODB_DB ?? "gform";

if (!uri) {
  console.warn(
    "MONGODB_URI is not set. Database operations will fail until configured."
  );
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb && cachedClient) return cachedDb;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(dbName);
  return cachedDb!;
}
