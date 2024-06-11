import { Command } from "../../presenters/ICommand";
import Draw from "../Draw";

class UndoCommand implements Command {

    private draw: Draw;

    constructor(draw: Draw) {
        this.draw = draw;
    }

    execute(): void {

        if (this.draw.undoStack.length > 0) {
            const lines = this.draw.undoStack.pop();
            if (lines) {
                this.draw.redoStack.push(lines);
                this.draw._lines = this.draw._lines.filter(l => l !== lines);
                this.draw.clear();
                this.draw._lines.forEach(lines => {
                    lines.forEach(line => {
                        this.draw.drawLine(line.x1, line.y1, line.x2, line.y2, line.color, line.thickness);
                    });
                });
            }
        }
    }
}

export default UndoCommand;