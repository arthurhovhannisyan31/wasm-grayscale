import path from "path";

import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, ".")
      })
    );

    return config;
  }
};

export default nextConfig;
