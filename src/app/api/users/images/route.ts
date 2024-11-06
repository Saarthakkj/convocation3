import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.aggregate([
        {
            $project: {
                _id : 0 , 
                photo :  1 ,
                index : 1
            }
        }
    ]);
    // console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ message: "Error fetching images" }, { status: 500 });
  }
} 