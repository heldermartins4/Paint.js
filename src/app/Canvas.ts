import { Paint } from "../presenters/Paint.group";

class Canvas implements Paint.Canvas {
    
    private _width: number = 800;
    private _height: number = 600;
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D ;

    constructor(canvas:HTMLCanvasElement) {

        this._canvas = canvas;
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    public get canvas(): HTMLCanvasElement {
        if (this._canvas === null) {
            // this._canvas = this.document.createElement('canvas');
            throw new Error("Canvas not can be accessed (null or undefined)");
        }
        return this._canvas;
    }

    public set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }

    public get ctx():CanvasRenderingContext2D {
        return this._ctx;
    }

    public set ctx(ctx:CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    public get width(): number {
        return this._width;
    }

    public set width(width: number) {
        this._width = width;
    }

    public get height(): number {
        return this._height;
    }

    public set height(height: number) {
        this._height = height;
    }
}

export default Canvas;
