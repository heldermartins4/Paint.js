import Canvas from './Canvas';

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    thickness: number;
}

interface IDraw {
    // getters and setters
    x: number;
    y: number;
    color: string;
    thickness: number;
    lines: Line[][];
    isPainting: boolean;
    // methods
    clear(): void;
    drawLine(
        x1: number, 
        y1: number, 
        x2: number, 
        y2: number, 
        color: string, 
        thickness: number
    ): void;
    paint(x: number, y: number): void;
    setColor(color: string): void;
    setThickness(thickness: number): void;
    startPainting(x: number, y: number): void;
    stopPainting(): void;
    // undo(): void;
    // redo(): void;
}

class Draw extends Canvas implements IDraw {

    private _isPainting: boolean;
    private _x: number;
    private _y: number;

    private _color: string;
    private _thickness: number;

    public _lines: Line[][];
    public currentLines: Line[];
    public undoStack: Line[][];
    public redoStack: Line[][];

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this._isPainting = false;
        this._x = 0;
        this._y = 0;
        this._lines = [];
        this.currentLines = [];
        this._color = '#000000';
        this._thickness = 1;
        this.undoStack = [];
        this.redoStack = [];
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

    public get lines(): Line[][] {
        return this._lines;
    }

    public set lines(lines: Line[][]) {
        this._lines = lines;
    }

    public get isPainting(): boolean {
        return this._isPainting;
    }

    public set isPainting(isPainting: boolean) {
        this._isPainting = isPainting;
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number, color: string, thickness: number) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = thickness;
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public paint(x: number, y: number) {
        if (!this.isPainting) return;

        this.drawLine(this.x, this.y, x, y, this.color, this.thickness);
        
        // Adiciona a linha atual ao conjunto de linhas da sessão atual
        this.currentLines.push({
            x1: this.x,
            y1: this.y,
            x2: x,
            y2: y,
            color: this.color,
            thickness: this.thickness
        });

        this.x = x;
        this.y = y;
    }

    public startPainting(x: number, y: number) {
        this.redoStack = [];  // Limpa a pilha de redo ao iniciar uma nova pintura
        this.currentLines = []; // Inicia um novo conjunto de linhas para a sessão atual
        this._isPainting = true;
        this.x = x;
        this.y = y;
    }

    public stopPainting() {
        if (this.isPainting) {
            this._lines.push(this.currentLines);  // Adiciona o conjunto de linhas da sessão atual ao array de linhas
            this.undoStack.push(this.currentLines); // Adiciona o conjunto de linhas da sessão atual à pilha de undo
            this.currentLines = []; // Reseta o array da sessão atual
        }
        this._isPainting = false;
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    public setColor(color: string) {
        this.color = color;
    }

    public setThickness(thickness: number) {
        this.thickness = thickness;
    }

    // public undo() {
    //     if (this.undoStack.length > 0) {
    //         const lines = this.undoStack.pop();
    //         if (lines) {
    //             this.redoStack.push(lines);
    //             this._lines = this._lines.filter(l => l !== lines);
    //             this.clear();
    //             this._lines.forEach(lines => {
    //                 lines.forEach(line => {
    //                     this.drawLine(line.x1, line.y1, line.x2, line.y2, line.color, line.thickness);
    //                 });
    //             });
    //         }
    //     }
    // }

    // public redo() {
    //     if (this.redoStack.length > 0) {
    //         const lines = this.redoStack.pop();
    //         if (lines) {
    //             this.undoStack.push(lines);
    //             this._lines.push(lines);
    //             this.clear();
    //             this._lines.forEach(lines => {
    //                 lines.forEach(line => {
    //                     this.drawLine(line.x1, line.y1, line.x2, line.y2, line.color, line.thickness);
    //                 });
    //             });
    //         }
    //     }
    // }
}

export default Draw;