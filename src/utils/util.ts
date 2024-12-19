import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");
export const getPrismaClient = () => {
  const prisma = new PrismaClient();
  return { prisma };
};

export const validateJwtToken = (token: string) => {
  const secretKey = process.env.TOKEN_SECRET_KEY;
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      // Token verification failed
      console.error("Token verification failed:", err.message);
    } else {
      // Token verification succeeded
      console.log("Token verification succeeded. Decoded payload:", decoded);
    }
  });
};

export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  dis: number,
) {
  const R = 6371; // 지구 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // 두 지점 간의 거리 (단위: m)
  return distance <= dis ? true : false;
}

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
