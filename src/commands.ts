import { CommandType } from "./types";
import { getCurrentWord, replaceCurrentWord } from "./utils";
import { toCamelCase, toPascalCase, toSymbolJoin } from "./utils/convert";

/** 自定义命令 */
export const COMMANDS: CommandType[] = [
	{
		name: "lowerCamelCase",
		methods: () => {
			const text = getCurrentWord();
			replaceCurrentWord(toCamelCase(text));
		}
	},
	{
		name: "upperCamelCase",
		methods: () => {
			const text = getCurrentWord();
			replaceCurrentWord(toPascalCase(text));
		}
	},
	{
		name: "hyphenJoin",
		methods: () => {
			const text = getCurrentWord();
			replaceCurrentWord(toSymbolJoin(text));
		}
	},
	{
		name: "underlineJoin",
		methods: () => {
			const text = getCurrentWord();
			replaceCurrentWord(toSymbolJoin(text, "_"));
		}
	}
];
