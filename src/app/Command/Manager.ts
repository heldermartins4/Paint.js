import ICommand from '../../interfaces/ICommand';

// import UndoCommand from './Undo';

class CommandManager {
    
    private commands: Map<string, ICommand>;

    constructor() {
        this.commands = new Map();
    }

    registerCommand(name: string, command: ICommand): void {
        this.commands.set(name, command);
    }

    executeCommand(name: string, params?: any): void {
        const command = this.commands.get(name);
        if (command) {
            command.execute(params);
        } else {
            console.error(`Command ${name} not found`);
        }
    }
}

export default CommandManager;
