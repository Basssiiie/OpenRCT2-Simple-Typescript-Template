import { startup } from "./startup";

registerPlugin({
	name: "Name of your plugin",
	version: "1.0",
	authors: [ "Your name" ],
	type: "remote",
	licence: "MIT",
	/**
	 * This field determines which OpenRCT2 API version to use. It's best to always use the
	 * latest release version, unless you want to use specific versions from a newer develop
	 * version. Version 111 equals the v0.5.0 release.
	 * @see https://github.com/OpenRCT2/OpenRCT2/blob/v0.5.0/src/openrct2/scripting/ScriptEngine.h#L45
	 */
	targetApiVersion: 111,
	main: startup,
});