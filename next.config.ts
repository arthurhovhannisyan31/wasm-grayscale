import path from "path";

import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true;
    config.experiments.topLevelAwait = true;

    config.plugins.push(
      new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, "."),
        args: "--log-level warn",
        extraArgs: "--no-typescript",
      })
    );

    return config;
  },
};

export default nextConfig;
