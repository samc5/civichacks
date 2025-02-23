import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    const API_KEY = process.env.GMAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching geocode:', error);
        res.status(500).json({ error: 'Failed to fetch geocode' });
    }
}
