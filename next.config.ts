import type { NextConfig } from "next";
import createMdx from "@next/mdx"


const nextConfig: NextConfig = {
  /* config options here */ 
  pageExtensions: ["tsx", "mdx"],
  images : {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!.replace("https://","")!
      }
    ]
  }
};

const withMDX = createMdx({

})

export default withMDX(nextConfig);
