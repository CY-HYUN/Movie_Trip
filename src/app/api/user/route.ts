import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

const prisma = getPrismaClient().prisma;

const setCorsHeaders = (response: NextResponse) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  return response;
};

export async function OPTIONS() {
  const response = NextResponse.json(null, { status: 204 });
  return setCorsHeaders(response);
}

export async function POST(request: NextRequest) {
  const reqUser = await request.json();
  const { id, pw, email } = reqUser;

  const newUser = {
    userId: id,
    password: pw,
    email: email,
    point: 0,
    createdAt: new Date(),
    updatedAt: undefined,
    deletedAt: undefined,
  };

  try {
    const createUser = await prisma.user.create({ data: newUser });
    let response = NextResponse.json(createUser, { status: 201 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error creating user:", error);
    let response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
    return setCorsHeaders(response);
  }
}

export async function PUT(request: NextRequest) {
  const { id } = await request.json();

  try {
    const deleteUser = await prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id: Number(id) },
    });
    let response = NextResponse.json(deleteUser, { status: 200 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error updating user:", error);
    let response = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
    return setCorsHeaders(response);
  }
}
