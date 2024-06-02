import { BrowserWindow } from "electron";
import { ICanvas } from "../interfaces/ICanvas";
import DOMController from "./DOMController";

class Canvas {
    
    private domParser: DOMController | null = null;
    // private _canvas: HTMLCanvasElement | null;
    private _width: number = 800;
    private _height: number = 600;

    // public ctx: CanvasRenderingContext2D;

    constructor(window: BrowserWindow, canvasId: string) {

        this.domParser = new DOMController(window);
        this.domParser.getProperties((() => {
            if (!document) return;
            const context = (document.getElementById(canvasId)! as HTMLCanvasElement).getContext('2d')!;

            return context;
        })());
    }

    // public get canvas(): HTMLCanvasElement {
    //     if (this._canvas === null) {
    //         this._canvas = this.document.createElement('canvas');
    //     }
    //     return this._canvas;
    // }

    // public set canvas(canvas: HTMLCanvasElement) {
    //     this._canvas = canvas;
    // }

    // public get width(): number {
    //     return this._width;
    // }

    // public set width(width: number) {
    //     this._width = width;
    // }

    // public get height(): number {
    //     return this._height;
    // }

    // public set height(height: number) {
    //     this._height = height;
    // }
}

export default Canvas;
