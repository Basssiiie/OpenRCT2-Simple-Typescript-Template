import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { exec } from "child_process";
import { homedir } from "os";
import { promisify } from "util";


const options =
{
	/**
	 * Change the file name of the output file here.
	 */
	filename: "my-plugin.js",

	/**
	 * Determines in what build mode the plugin should be build. The default here takes
	 * from the environment (ex. CLI arguments) with "development" as fallback.
	 */
	build: process.env.BUILD || "development"
};

/**
 * Tip: if you change the path here to your personal user folder,
 * you can ignore this change in git with:
 * ```
 * > git update-index --skip-worktree rollup.config.js
 * ```
 * To accept changes on this file again, use:
 * ```
 * > git update-index --no-skip-worktree rollup.config.js
 * ```
 */
async function getOutput()
{
	if (options.build !== "development")
	{
		return `./dist/${options.filename}`;
	}

	const platform = process.platform;
	const pluginPath = `OpenRCT2/plugin/${options.filename}`;

	if (platform === "win32") // Windows
	{
		const { stdout } = await promisify(exec)("powershell -command \"[Environment]::GetFolderPath('MyDocuments')\"");
		return `${stdout.trim()}/${pluginPath}`;
	}
	else if (platform === "darwin") // MacOS
	{
		return `${homedir()}/Library/Application Support/${pluginPath}`;
	}
	else // Linux
	{
		const configFolder = process.env.XDG_CONFIG_HOME || `${homedir()}/.config`;
		return `${configFolder}/${pluginPath}`;
	}
}


/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
	input: "./src/plugin.ts",
	output: {
		file: await getOutput(),
		format: "iife",
		compact: true
	},
	treeshake: "smallest",
	plugins: [
		resolve(),
		typescript(),
		terser({
			compress: {
				passes: 5,
				toplevel: true,
				unsafe: true
			},
			format: {
				comments: false,
				quote_style: 1,
				wrap_iife: true,
				beautify: (options.build === "development"),
			}
		})
	]
};
export default config;