import { BrowserWindowConstructorOptions } from "electron";

export namespace MainApplication {

    export interface customCreateWindowProps extends Omit<BrowserWindowConstructorOptions, 'webPreferences'>{
        icon?: string;
        webPreferences?: {
            preload: string;
            contextIsolation: boolean;
            nodeIntegration: boolean;
        };
        loadUrl?: string;
    };
};