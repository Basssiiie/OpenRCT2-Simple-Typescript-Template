/// <reference path="../lib/openrct2.d.ts" />

import { startup } from "./startup";

// @ts-ignore
import * as info from "./info.js";

registerPlugin({
	name: info.name,
	version: info.version,
	authors: info.authors,
	type: info.type,
	licence: info.license,
	minApiVersion: info.minApiVersion ?? info.targetApiVersion,
	targetApiVersion: info.targetApiVersion,
	main: startup,
});