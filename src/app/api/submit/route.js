import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(req) {
  let client;
  try {
    // Ensure MongoDB URI is set
    const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error("MongoDB URI is missing!");
      return NextResponse.json({ error: "MongoDB URI is missing" }, { status: 500 });
    }

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db("ICE");
    const collection = db.collection("Events");

    const formData = await req.json();

    // Ensure ObjectId is properly created
    const documentId = new ObjectId("67ba4b28876839722173788b");

    // Push the formData into the ice_arrests array
    const updateResult = await collection.updateOne(
      { _id: documentId },
      { $push: { ice_arrests: formData } },
      { upsert: true } // Ensure document exists
    );

    return NextResponse.json({ message: "Form submitted successfully", updateResult }, { status: 201 });

  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ error: "Failed to submit form", details: error.message }, { status: 500 });

  } finally {
    if (client) await client.close(); // Ensure connection is always closed
  }
}