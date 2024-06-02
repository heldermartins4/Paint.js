// Draw.ts
import { BrowserWindow } from 'electron';
import Canvas from './Canvas';

// interface Line {
//     x1: number;
//     y1: number;
//     x2: number;
//     y2: number;
//     color: string;
//     thickness: number;
// }

// interface IDraw {
//     // getters and setters
//     x: number;
//     y: number;
//     color: string;
//     thickness: number;
//     lines: Line[];
//     isPainting: boolean;
//     // methods
//     clear(): void;
//     drawLine(
//         x1: number, 
//         y1: number, 
//         x2: number, 
//         y2: number, 
//         color: string, 
//         thickness: number
//     ): void;
// }

class Draw extends Canvas {

    private _isPainting: boolean;
    private _x: number;
    private _y: number;

    private _color: string;
    private _thickness: number;
    // private _lines: Line[];

    constructor(window: BrowserWindow) {

        super(window, 'canvas');
        this._isPainting = false;
        this._x = 0;
        this._y = 0;
        // this._lines = [];
        this._color = '#000000';
        this._thickness = 1;
    }

    public get x(): number {
        return this._x;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get y(): number {
        return this._y;
    }

    public set y(y: number) {
        this._y = y;
    }

    public get color(): string {
        return this._color;
    }
    
    public set color(color: string) {
        this._color = color;
    }

    public get thickness(): number {
        return this._thickness;
    }

    public set thickness(thickness: number) {
        this._thickness = thickness;
    }

    // public get lines(): Line[] {
    //     return this._lines;
    // }

    // public set lines(lines: Line[]) {
    //     this._lines = lines;
    // }

    public get isPainting(): boolean {
        return this._isPainting;
    }

    public set isPainting(isPainting: boolean) {
        this._isPainting = isPainting;
    }

    // public clear() {

    //     this.ctx.clearRect(0, 0, this.width, this.height);
    // }

    // public drawLine(x1: number, y1: number, x2: number, y2: number, color: string, thickness: number) {

    //     this.ctx.beginPath();

    //     this.ctx.strokeStyle = color;
    //     this.ctx.lineWidth = thickness;
    //     this.ctx.moveTo(x1, y1);
    //     this.ctx.lineTo(x2, y2);
    //     this.ctx.stroke();
    //     this.ctx.closePath();
    // }
}

export default Draw;
