import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import { v2 as cloudinary } from 'cloudinary';


let count = 0;

export async function POST(req: Request, res: Response) {
  await dbConnect();
  console.log("count at backend : ", count);
  const body = await req.json();
  console.log("req.body : ", body);

  try {
    //   const result = await cloudinary.uploader.upload(req.file.path , {
    //     folder:'folder_name'
    // });
    const { email, photo } = body ;

    console.log("email at backend : ", email, "photo at backend : ", photo);

    const newUser = new User({
      email,
      index: count,
      photo,
    });
    count++;

    await newUser.save();
    console.log("User saved to database");

    return Response.json({
      message: "User added successfully",
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return Response.json({
      message: "User not added successfully", 
    });
  }
}
