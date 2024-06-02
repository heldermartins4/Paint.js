import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

interface IWindow {

    // Properties
    width: number;
    height: number;
    title: string;
    backgroundColor: string;
    backgroundImage: string;

    // Methods
    create(props:BrowserWindowConstructorOptions): BrowserWindow;
    destroy(): void;
    resize(width: number, height: number): void;
    show(): void;
    hide(): void;
    minimize(): void;
    maximize(): void;
    restore(): void;
    focus(): void;
    blur(): void;
    close(): void;
    isFocused(): boolean;
    isMinimized(): boolean;
    isMaximized(): boolean;
    isVisible(): boolean;
    isClosed(): boolean;
    on(event: any, callback: Function): void;
    off(event: any, callback: Function): void;
    once(event: any, callback: Function): void;
}

export default IWindow;