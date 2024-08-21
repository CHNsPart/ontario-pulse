import type { NextApiRequest, NextApiResponse } from 'next';
import blogs from '../../../data/blogs.json';  // Adjust the path as needed

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(blogs);
}

