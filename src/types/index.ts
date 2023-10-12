/** 自定义指令类型 */
export interface CommandType {
	name: string;
	methods: () => void;
}
