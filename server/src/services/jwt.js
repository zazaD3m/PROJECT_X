import jwt from "jsonwebtoken";
import { isProduction } from "../utils/helpers.js";

export const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "72h",
  });
  return accessToken;
};

export const generateRefreshToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const generateGoogleToken = (res, userId) => {
  const googleToken = jwt.sign({ userId }, process.env.GOOGLE_TOKEN_SECRET, {
    expiresIn: "1m",
  });

  res.cookie("googleAuthToken", googleToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 60 * 1000,
  });
};

export const clearRefreshToken = (res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
};
