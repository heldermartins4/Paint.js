// Application.ts
import { app, App, ipcMain, ipcRenderer } from 'electron';
import ElectronWindow from './ElectronWindow';
import ElectronMenu from './ElectronMenu';
import CommandManager from './Command/Manager';
import Draw from './Draw';
import UndoCommand from './Command/Undo';
import MenuItemsBuilder from './MenuBuilder';
import DOMController from './DOMController';

class Application extends ElectronWindow {

  private _app: App;
  private draw: Draw | null = null;
  private _document: Document | null = null;
  private commandManager: CommandManager;

  constructor(title: string) {

    super(title, 800, 600);

    this._app = app;

    this.commandManager = new CommandManager();

    this._app.whenReady().then(() => {
      this.start();
    });
    this._app.on('window-all-closed', this.onAllWindowsClosed.bind(this));
    this._app.on('activate', this.onActivate.bind(this));
  }

  private start(): void {
    
    this.window = this.create();

    // Register Commands
    // this.commandManager.registerCommand("Undo", new UndoCommand(this.canvas));

    // Configurar IPC listeners
    this.setupIPCListeners();

    // Inicializa o menu da aplicação
    new ElectronMenu(
      new MenuItemsBuilder(this.window, this._app).build()
    );
  }

  private setupIPCListeners(): void {

    ipcMain.handle('onLoad', async (_) => {
      const ctx = await new DOMController(this.window).getProperties(`(async () => {

        if (document === null) throw new Error('Document not found');

        var ctx = document.getElementById('canvas').getContext('2d');

        if (ctx === null) throw new Error('Context not found');

        ctx.fillStyle = '#f00';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return ctx;
      })()`);

      console.log("Ctx loaded: ", ctx);
    });

    // TODO: use Adapter pattern
    ipcMain.handle('onMouseDown', async (_, x, y) => {
      if (this.draw !== null) {
        this.draw.x = x;
        this.draw.y = y;
        this.draw.isPainting = true;
      }

      return { x: this.draw?.x, y: this.draw?.y };
    });

    ipcMain.handle('onMouseUp', async (_, x, y) => {
      if (this.draw !== null) {
        this.draw.x = x;
        this.draw.y = y;
        this.draw.isPainting = false;
      }

      return { x: this.draw?.x, y: this.draw?.y };
    });

    ipcMain.handle('onMouseMove', async (_, x, y) => {
      console.log(`Draw ${this.draw === null ? 'not ' : ''}initialized`);
      console.log(`Coord: ${x}, ${y}`);
      if (this.draw !== null) {
        // this.draw.drawLine(this.draw.x, this.draw.y, x, y, this.draw.color, this.draw.thickness);
      }

      return { x: this.draw?.x, y: this.draw?.y };
    });
  }

  private onAllWindowsClosed(): void {
    if (process.platform !== 'darwin') {
      this._app.quit();
    }
  }

  private onActivate(): void {
    if (this.window === undefined) {
      this.start();
    }
  }
}

export default Application;