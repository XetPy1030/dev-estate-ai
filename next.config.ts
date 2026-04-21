import type { NextConfig } from "next";

const allowedDevOriginsFromEnv = process.env.NEXT_ALLOWED_DEV_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedDevOriginsFromEnv,
};

export default nextConfig;
