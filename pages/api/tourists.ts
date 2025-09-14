import { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for tourists
let tourists = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'John Doe',
    photo: '', // Add photo URL if available
    tags: [],
    status: 'approved',
    location: { lat: 20.2961, lng: 85.8245 }, // Mock location
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    name: 'Jane Smith',
    photo: '',
    tags: [],
    status: 'approved',
    location: { lat: 20.3000, lng: 85.8300 }, // Mock location
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(tourists);
  } else if (req.method === 'POST') {
    const { id, name, photo, tags, status, location } = req.body;
    if (!id || !name || !photo || !status || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Add new tourist with pending status
    tourists.push({ id, name, photo, tags: tags || [], status, location });
    res.status(201).json({ message: 'Tourist added', tourist: { id, name, photo, tags: tags || [], status, location } });
  } else if (req.method === 'PUT') {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: 'Missing id or status' });
    }
    // Update tourist status
    const tourist = tourists.find(t => t.id === id);
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }
    tourist.status = status;
    res.status(200).json({ message: 'Status updated', tourist });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
