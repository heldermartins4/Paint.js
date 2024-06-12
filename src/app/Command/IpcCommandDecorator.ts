import { Command } from "../../presenters/ICommand";
import { ipcRenderer } from "electron";

class IpcCommandDecorator implements Command {
    private command: Command;
    private ipcChannel: string;

    constructor(command: Command, ipcChannel: string) {
        this.command = command;
        this.ipcChannel = ipcChannel;
    }

    execute(): void {
        this.command.execute();
    }

    registerIpcListener(): void {
        ipcRenderer.on(this.ipcChannel, (event, args) => {
            console.log(`IPC message received on channel ${this.ipcChannel}:`, args);
            this.execute();
        });
    }
}

export default IpcCommandDecorator;