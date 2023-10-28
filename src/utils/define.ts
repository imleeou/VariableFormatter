import { CommandType, Dict } from '../types';

export function defineCommands(commands: Dict<CommandType['methods']>): CommandType[] {
  return Object.entries(commands).map(([name, methods]) => ({
    name,
    // 这里可以做一层包装，比如加上 try catch、debugger日志等
    methods
  }));
}
