import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    // runs the React Compiler as native Rust inside Turbopack instead of through Babel, so dev compiles are faster
    turbopackRustReactCompiler: true,
  },
  // menu item images are hosted on ImgBB; next/image only loads external hosts listed here
  images: {
    remotePatterns: [new URL("https://i.ibb.co/**")],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
