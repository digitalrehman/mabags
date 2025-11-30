import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI || ""
const options = {}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri || !uri.startsWith("mongodb")) {
    throw new Error(
      "Please add your MongoDB URI to .env.local. Get your connection string from MongoDB Atlas (https://cloud.mongodb.com)"
    )
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the connection
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    return global._mongoClientPromise
  } else {
    // In production, create a new client for each request
    if (!clientPromise) {
      client = new MongoClient(uri, options)
      clientPromise = client.connect()
    }
    return clientPromise
  }
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise()
  return client.db("mabags")
}

export default getClientPromise
