import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      // Fetch all documents containing the ice_arrests array
      const documents = await db.collection("your_collection_name").find({}).toArray();

      // Flatten the ice_arrests arrays into a single array
      const allArrests = documents.flatMap(doc => doc.ice_arrests.map(arrest => ({
        name: arrest.Name,
        date: arrest.Date,
        location: arrest.Location,
        latitude: arrest.Latitude,
        longitude: arrest.Longitude,
        address: arrest.Address,
        status: arrest.ImmigrationStatus,
        how_ice_found: arrest.HowICE,
        follow_up: arrest.FollowUp,
      })));

      return res.status(200).json(allArrests);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error fetching ICE arrests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
