"use client";
import Image from "next/image";
"use client"
import { useRouter } from "next/navigation";
import ImageGallery from '../components/ImageGallery';
import { getStaticPaths, getStaticProps } from '../pages/paths';


const YOUR_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export default function Home() {
export default function Home({ image }: { image: any }) {
  const router = useRouter();
  let images = fetch("http://localhost:3000/api/users/images")
    .then((res) => res.json())
    .then((data) => {
      console.log("images json: ", data);
      return data;
    });
  // console.log(images);
  //   const PhotoComponent = props => (
  //     props.photo ? <Card.Img
  //       src={`data:image/png;base64,${props.photo}`}
  //       alt={'photo'}
  //     /> : ''
  // );

  // function ImageGallery({ data }: { data: (typeof JSON)[] }) {
  function ImageGallery() {
    return (
      <div>
        Hello World!
      </div>
    );
  }

  return (
    <div>
      <h1>hello world</h1>
      <button
        onClick={() => router.push("/signin")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign In
      </button>
      <ImageGallery />
      <h1>IHello World</h1>
      <ImageGallery />
      {/* <ImageGallery data={[image]} /> */}
      <button onClick={() => router.push('/signin')}>Upload</button>
    </div>
  );
}