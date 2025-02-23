import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    //console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded" : "Missing");
    const { MONGODB_URI } = process.env.MONGO_URI;
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    await client.db("admin").command({ping: 1});
    

    const db = client.db("ICE");
    const collection = db.collection("Events");

    const formData = await req.json();
    const result = await collection.insertOne(formData);
    
    client.close();
    return NextResponse.json({ message: "Form submitted successfully", result }, { status: 201 });
  } catch (error) {
    console.error("Error saving form data:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}