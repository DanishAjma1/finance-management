import { MongoClient } from "mongodb";

export async function POST(req) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const body = await req.json();
    const database = client.db("Project");
    const collection = database.collection("records");
    await collection.insertOne(body);

    return new Response(
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong", error: error.message }),
      {
        status: 500,
      }
    );
  } finally {
    await client.close();
  }
}

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();

    const database = client.db("Project");
    const collection = database.collection("records");
    const records = await collection.find().toArray;
  return new Response(JSON.stringify(records), {
    status: 200,
  });
}catch (error) {
  return new Response(
    JSON.stringify({ message: "Something went wrong", error: error.message }),
    {
      status: 500,
    }
  );
} finally {
  await client.close();
}
}
