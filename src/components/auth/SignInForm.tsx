"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Constants for OAuth
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "";

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}

export default function SignInForm() {
  const router = useRouter();
  const [newUser, setNewUser] = useState({ email: "", photo: "" });
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [uploadPhotoVisible, setUploadPhotoVisible] = useState(false);
  const decodeJwtResponse = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.handleCredentialResponse = (response: any) => {
      const responsePayload = decodeJwtResponse(response.credential);
      const email = responsePayload.email;
      let found = false;

      for (let i = 0; i < email.length; i++) {
        if (email[i] === "2" && email[i + 1] === "2") {
          setUploadPhotoVisible(true);
          setNewUser((prevUser) => ({ ...prevUser, email: email }));
          found = true;
          break;
        }
      }
      if (!found) {
        setErrorMessageVisible(true);
      }
    };
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    var file = event.target.files?.[0];
    let image_url;
    // const formData = new FormData();
    // if (file) {
    //   formData.append('file', file);
    // }
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(base64, options);
      // console.log(result);
      return {status:200, data:result.secure_url};
    } catch (error) {
      return {status:500, data:error};
      console.error(error);
    }
    const jsonData = {
      email: newUser.email,
      photo: image_url
    };
    console.log("JSON DATA: ", jsonData); 
    try {
      await axios.post("http://localhost:3000/api/users/add", jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error(err);
    }
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {errorMessageVisible && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <p>You are not a 2024 batch student</p>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to IIITD Batch of 2024
      </h1>
      <div
        id="g_id_onload"
        data-client_id={CLIENT_ID}
        data-callback="handleCredentialResponse"
        className="mb-4"
      ></div>
      <div className="g_id_signin" data-type="standard"></div>
      {uploadPhotoVisible && (
        <div className="mt-6">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Choose and Upload Photo
          </label>
        </div>
      )}
      {/* <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Home
      </button> */}
    </div>
  );
}