import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { base64 } = req.body;
      const result = await cloudinary.uploader.upload(base64, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: 'convocation',
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
} 