import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import IWindow from '../interfaces/IWindow';
import path from 'path';

abstract class ElectronWindow implements IWindow {

    private mainWindow: BrowserWindow | undefined;
    private _title: string;
    private _width: number;
    private _height: number;
    
    private _backgroundColor: string = '#FFFFFF';
    private _backgroundImage: string | undefined;

    constructor(title: string, width?: number, height?:number) {
        this._title = title;
        if (width === undefined) {
            width = 800;
        }
        if (height === undefined) {
            height = 600;
        }
        this._width = width;
        this._height = height;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get backgroundColor(): string {
        return this._title;
    }

    set backgroundColor(value: string) {
        this._backgroundColor = value;
    }

    get backgroundImage(): string {
        return this._title;
    }

    set backgroundImage(value: string) {
        this._backgroundImage = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get window(): BrowserWindow {
        if (this.mainWindow === undefined) {
            return this.create({
                width: this.width,
                height: this.height
            });
        }

        return this.mainWindow;
    }

    set window(value: BrowserWindow | undefined) {
        this.mainWindow = value;
    }

    create(props?: BrowserWindowConstructorOptions): BrowserWindow {
        this.mainWindow = new BrowserWindow({
            width: this.width,
            height: this.height,
            webPreferences: {
                preload: path.join(__dirname, '../../public/preload.js'),
                contextIsolation: true,
                nodeIntegration: true
            },
            icon: props?.icon || path.join(__dirname, '../../public/icon.png')
        });

        this.mainWindow.setTitle(this.title);
        this.mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));

        this.mainWindow.on('closed', () => {
            this.mainWindow = undefined;
        });

        return this.mainWindow;
    }

    destroy(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.destroy();
        }
    }

    resize(width: number, height: number): void {
        this.width = width;
        this.height = height;

        if (this.mainWindow !== undefined) {
            this.mainWindow.setSize(this.width, this.height);
        }
    }

    show(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.show();
        }
    }

    hide(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.hide();
        }
    }

    minimize(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.minimize();
        }
    }

    maximize(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.maximize();
        }
    }

    restore(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.restore();
        }
    }

    focus(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.focus();
        }
    }

    blur(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.blur();
        }
    }

    close(): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.close();
        }
    }

    isFocused(): boolean {
        if (this.mainWindow !== undefined) {
            return this.mainWindow.isFocused();
        }

        return false;
    }

    isMinimized(): boolean {
        if (this.mainWindow !== undefined) {
            return this.mainWindow.isMinimized();
        }

        return false;
    }

    isMaximized(): boolean {
        if (this.mainWindow !== undefined) {
            return this.mainWindow.isMaximized();
        }

        return false;
    }

    isVisible(): boolean {
        if (this.mainWindow !== undefined) {
            return this.mainWindow.isVisible();
        }

        return false;
    }

    isClosed(): boolean {
        if (this.mainWindow !== undefined) {
            return this.mainWindow.isDestroyed();
        }

        return true;
    }

    on(event: any, callback: Function): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.on(event, callback);
        }
    }

    off(event: any, callback: Function): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.off(event, callback);
        }
    }

    once(event: any, callback: Function): void {
        if (this.mainWindow !== undefined) {
            this.mainWindow.once(event, callback);
        }
    }
}

export default ElectronWindow;