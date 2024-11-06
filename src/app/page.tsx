"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <div>
      hello world
      <button
        onClick={() => router.push("/signin")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sign In
      </button>
    </div>
  );
}
