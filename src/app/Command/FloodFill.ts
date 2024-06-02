import ICommand from "../../interfaces/ICommand";

class FloodFill implements ICommand {
    private floodFill: (x: number, y: number, target_col: any, replace_col: any) => void;

    constructor(floodFill: (x: number, y: number, target_col: any, replace_col: any) => void) {
        this.floodFill = floodFill;
    }

    execute(params: { x: number; y: number; target_col: any; replace_col: any }): void {
        this.floodFill(params.x, params.y, params.target_col, params.replace_col);
    }
}

export default FloodFill;