const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/anbani.mjs",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "anbani.js",
    globalObject: "this",
    library: {
      name: "anbani",
      type: "umd",
      export: "default",
      umdNamedDefine: true,
    }
  },
  resolve: {
    alias: {
      // Browser bundle can't read files: swap the Node data loader for the
      // variant that inlines the small contractions table and refuses the
      // ~400KB ambigram table (balanced georgianisation is Node-only).
      [path.resolve(__dirname, "src/lib/data-io.mjs")]: path.resolve(
        __dirname,
        "src/lib/data-io.browser.mjs"
      ),
    },
  },
  module: {
    rules: [
      // Inline .csv imports as raw strings (used by data-io.browser.mjs).
      { test: /\.csv$/, type: "asset/source" },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
