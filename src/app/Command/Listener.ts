import { Command } from "../../presenters/ICommand";
import IpcCommandDecorator from "./IpcCommandDecorator";  // Ajuste o caminho conforme necessário

type CommandConfig = {
    command: Command;
    ipcChannel: string;
}

interface IpcControllerProps {};

class Listener implements IpcControllerProps {
    private commands: IpcCommandDecorator[];

    constructor(commandConfigs: CommandConfig[]) {
        this.commands = commandConfigs.map(config => {
            return new IpcCommandDecorator(config.command, config.ipcChannel);
        });
    }

    registerAll() {
        this.commands.forEach(commandDecorator => {
            commandDecorator.registerIpcListener();
        });
    }

    executeAll() {
        this.commands.forEach(commandDecorator => {
            commandDecorator.execute();
        });
    }
}

export default Listener;