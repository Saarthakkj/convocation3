"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const binaryStr = reader.result as string;
        setNewUser((prevUser) => ({ ...prevUser, photo: file.name }));
        const jsonData = {
          email: newUser.email,
          photo: btoa(binaryStr) // Convert binary to base64 string
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
      reader.readAsBinaryString(file);
    }
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
