
import jwt  from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";

// generate JWT token
export function generateToken(jwtPayload: JWTPayload) : string {
 const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {expiresIn: "30d"})
 return token
}

// set cookie with JWT token
export function setCookie(jwtPayload: JWTPayload) : string  {
  const token = generateToken(jwtPayload);

      const cookie = serialize("jwtToken", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // development=http, production=https
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return cookie
}