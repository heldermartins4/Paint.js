import { app, App, BrowserWindow } from 'electron';
import ElectronMenu from './ElectronMenu';
import MenuItemsBuilder from './MenuBuilder';
import { MainApplication } from '../presenters/MainApplication.group';

class Application {
  
  private _app: App;
  private mainWindow: BrowserWindow | null = null;

  constructor(title: string, props: MainApplication.customCreateWindowProps) {

    this._app = app;

    if (!props.loadUrl || !props?.webPreferences?.preload) {
      throw new Error('Webpack entry points are not defined.');
    }

    this._app.whenReady().then(() => {
      this.createWindow(title, props);
    });

    this._app.on('window-all-closed', this.onAllWindowsClosed.bind(this));
    this._app.on('activate', this.onActivate.bind(this, title, props));
  }

  private createWindow(title: string, {webPreferences, loadUrl, ...props}: MainApplication.customCreateWindowProps): void {
    
    
    this.mainWindow = new BrowserWindow({
      title,
      width: 800,
      height: 600,
      icon: props.icon,
      webPreferences
    });

    if (loadUrl === undefined) return;

    this.mainWindow.loadURL(loadUrl);

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    new ElectronMenu(new MenuItemsBuilder(this.mainWindow, this._app).build());
  }

  private onAllWindowsClosed(): void {
    if (process.platform !== 'darwin') {
      this._app.quit();
    }
  }

  private onActivate(title: string, props: MainApplication.customCreateWindowProps): void {
    if (this.mainWindow === null) {
      this.createWindow(title, props);
    }
  }
}

export default Application;