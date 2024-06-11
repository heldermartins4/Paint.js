import { Command } from "../../presenters/ICommand";
import Draw from "../Draw";

class RedoCommand implements Command {

    private draw: Draw;

    constructor(draw: Draw) {
        this.draw = draw;
    }

    execute(): void {

        if (this.draw.redoStack.length > 0) {
            const lines = this.draw.redoStack.pop();
            if (lines) {
                this.draw.undoStack.push(lines);
                this.draw._lines.push(lines);
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

export default RedoCommand;