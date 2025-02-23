
import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const documents = await db.collection("Events").find({}).limit(750).toArray();

    if (!documents || documents.length === 0) {
      console.warn("No documents found in MongoDB collection.");
      return NextResponse.json({ error: "No events found" }, { status: 404 });
    }

    const allArrests = documents.flatMap(doc =>
      doc.ice_arrests
        .filter(arrest => arrest.Latitude && arrest.Longitude)
        .map(arrest => ({
          name: arrest.Name,
          date: arrest.Date,
          location: arrest.Location,
          latitude: arrest.Latitude,
          longitude: arrest.Longitude,
          address: arrest.Address,
          status: arrest.ImmigrationStatus,
          how_ice_found: arrest.HowICE,
          follow_up: arrest.FollowUp,
        }))
    );

    if (allArrests.length === 0) {
      console.warn("No valid location data in ice_arrests.");
      return NextResponse.json({ error: "No valid coordinates found" }, { status: 404 });
    }

    console.log("Returning Arrest Data:", allArrests.length, "entries");
    return NextResponse.json(allArrests);

  } catch (error) {
    console.error("Error fetching ICE arrests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}