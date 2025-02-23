import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      // Fetch all documents containing the ice_arrests array
      const documents = await db.collection("Events").find({}).toArray();

      // Check if documents were retrieved successfully
      if (!documents || documents.length === 0) {
        console.warn("No documents found in MongoDB collection.");
        return res.status(404).json({ error: "No events found" });
      }

      // Flatten the ice_arrests arrays into a single array
      const allArrests = documents.flatMap(doc =>
        doc.ice_arrests
          .filter(arrest => arrest.Latitude && arrest.Longitude) // Ensure valid coordinates
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
        return res.status(404).json({ error: "No valid coordinates found" });
      }

      console.log("Returning Arrest Data:", allArrests.length, "entries");
      return res.status(200).json(allArrests);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error fetching ICE arrests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
