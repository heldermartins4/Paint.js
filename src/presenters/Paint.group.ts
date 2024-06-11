export namespace Paint {
    export interface Canvas {
        width: number;
        height: number;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
    };
};