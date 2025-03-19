import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // config.module.rules.push({
    //   test: /\.wasm$/,
    //   type: "asset/resource"
    // });

    config.module.rules.push({
      test: /\.wasm$/,
      use: "wasm-loader"
    });

    config.experiments.asyncWebAssembly = true;
    config.experiments.topLevelAwait = true;

    return config;
  },
};

export default nextConfig;
