import ICommand from "../../interfaces/ICommand";

import Canvas from '../Canvas';

class UndoCommand implements ICommand {
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    execute(): void {
        // this.canvas.undo();
    }
}

export default UndoCommand;