interface ICommand {
    execute: (params?:any) => void | Promise<void> | boolean;
}

export default ICommand;