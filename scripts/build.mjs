import json from "@rollup/plugin-json";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";
import glob from "fast-glob";
import fs from "fs-extra";
import * as rollup from "rollup";
import esbuild from "rollup-plugin-esbuild";

async function build() {
  /**
   * @type {import("rollup").RollupOptions}
   */
  const config = {
    external: ["@vanilla-extract/recipes/createRuntimeFn", "react"],
    input: glob.sync(["components/**/*.(ts|tsx)"]),
    plugins: [
      vanillaExtractPlugin({ cwd: process.cwd() }),
      esbuild({ target: "esnext" }),
      json(),
    ],
  };

  const bundle = await rollup.rollup(config);

  /**
   * @type {import("rollup").OutputOptions}
   */
  const options = {
    format: "esm",
    preserveModules: true,
    dir: "dist",
    assetFileNames({ name }) {
      return name;
    },
  };

  const { output } = await bundle.generate(options);

  const indexCss = new Set([]);

  for (let item of output) {
    const file = `dist/${item.fileName}`;
    let code = item.code || item.source;

    if (item.fileName.endsWith(".css.js")) {
      const regex = /import '(.*\.css\.ts\.vanilla\.css)';\n/g;
      const imports = code.match(regex);
      imports.forEach((item) => {
        code = code.replace(item, "");
        item = item.replace("import ", "").replace(";\n", "");
        indexCss.add(`@import ${item};`);
      });
    }

    fs.outputFileSync(file, code);
  }

  fs.outputFileSync("dist/index.css", Array.from(indexCss).join("\n"));

  await bundle.close();
}

build();
