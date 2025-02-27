/** 自定义指令类型 */
export interface CommandType {
  name: string;
  methods: (e: any) => void;
}

export type Dict<T = string> = Record<string, T>;
