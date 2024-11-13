"use client"
import { useRouter } from "next/navigation";
import ImageGallery from '../components/ImageGallery';
import { getStaticPaths, getStaticProps } from '../pages/paths';


const YOUR_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export default function Home({ image }: { image: any }) {
  const router = useRouter();

  return (
    <div>
      <h1>IHello World</h1>
      <ImageGallery data={[image]} />
      <button onClick={() => router.push('/signin')}>Upload</button>
    </div>
  );
}