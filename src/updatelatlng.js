require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const axios = require('axios');

const mongoUri = process.env.MONGO_URI;
const apiUrl = "https://civichacks.vercel.app/api/geocode"

async function updateDatabase() {
    const client = new MongoClient(mongoUri);
    
    try {
        await client.connect();
        const db = client.db('ICE'); // Change to your database
        const collection = db.collection('Events'); // Change to your collection

        const cursor = collection.find({ "ice_arrests": { $exists: true, $ne: [] } });

        while (await cursor.hasNext()) {
            const doc = await cursor.next();

            let updatedIceArrests = await Promise.all(
                doc.ice_arrests.map(async (arrest) => {
                    if (!arrest.Address) return { ...arrest, realLocation: false }; // If no address, set realLocation: false

                    try {
                        // Call API
                        const response = await axios.get(apiUrl, {
                            params: { address: arrest.Address}
                        });

                        const data = response.data;
                        if (data.results.length > 0) {
                            const { lat, lng } = data.results[0].geometry.location;
                            return { ...arrest, Latitude: lat, Longitude: lng, realLocation: true };
                        }
                    } catch (error) {
                        console.error(`Error fetching location for ${arrest.Address}:`, error.message);
                    }

                    // If API call fails or no results, set realLocation to false
                    return { ...arrest, realLocation: false };
                })
            );

            // Update the document
            await collection.updateOne(
                { _id: doc._id },
                { $set: { ice_arrests: updatedIceArrests } }
            );
        }

        console.log("Database update complete!");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

updateDatabase();