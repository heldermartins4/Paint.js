import { BrowserWindow } from "electron";

class DOMController {

    private _window: BrowserWindow;
    private _properties: unknown = undefined;

    public constructor(window: BrowserWindow) {

        this._window = window;
    }

    get properties(): unknown {
        return this._properties;
    }

    public async getProperties(func: any): Promise<unknown> {
        return this._window.webContents.executeJavaScript(func)
            .then((props) => {
                this._properties = props;
                return props;
            })
            .catch((error) => {
                console.error("Error executing JavaScript:", error);
                throw error;
            });
    }   
}

export default DOMController;