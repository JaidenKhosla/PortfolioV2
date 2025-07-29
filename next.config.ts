import type { NextConfig } from "next";
import createMdx from "@next/mdx"


const nextConfig: NextConfig = {
  /* config options here */ 
  pageExtensions: ["tsx", "mdx"]

};

const withMDX = createMdx({

})

export default withMDX(nextConfig);
