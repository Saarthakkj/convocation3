"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [images_json, setimages_json] = useState<json_type[]>([]);
  const [images_grid, setimages_grid] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/images")
      .then((res) => res.json())
      .then((data) => {
        setimages_json(data);
        const grid = data.map((item: json_type) => 'data:image/png;base64,' + item.photo);
        setimages_grid(grid);
      });
  }, []);

  function ImageGallery({ data_json }: { data_json: string[] }) {
    return (
      <div className = " grid grid-cols-10">
        {data_json.map((image, index) => (
          <img className = "h-full w-full" src = {image} alt="pfp image" key = {index}/>
        ))}
      </div>
    );
  }

  return (
    <div>
      <ImageGallery data_json={images_grid} />
      <div className="absolute bottom-0 right-0 m-4">
        <button
          onClick={() => router.push("/signin")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}