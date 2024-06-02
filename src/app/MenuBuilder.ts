import { App, BrowserWindow, MenuItemConstructorOptions } from "electron";

class MenuItemsBuilder {

  private _window: BrowserWindow;
  private _app: App;

  constructor(window: BrowserWindow, app: App) {
    this._window = window;
    this._app = app;
  }

  // Sobrecarga de métodos
  createItem(label: string, click?: () => void): MenuItemConstructorOptions;
  createItem(label: string, submenu?: MenuItemConstructorOptions[]): MenuItemConstructorOptions;
  createItem(label: string, click?: () => void, accelerator?: string, icon?: string): MenuItemConstructorOptions;
  createItem(label: string, click?: () => void, accelerator?: string, icon?: string, submenu?: MenuItemConstructorOptions[]): MenuItemConstructorOptions;

  // Implementação do método
  createItem(label: string, clickOrSubmenu?: (() => void) | MenuItemConstructorOptions[], accelerator?: string, icon?: string, submenu?: MenuItemConstructorOptions[]): MenuItemConstructorOptions {
    if (Array.isArray(clickOrSubmenu)) {
      return { label, submenu: clickOrSubmenu, accelerator, icon };
    } else {
      return { label, click: clickOrSubmenu, accelerator, icon, submenu };
    }
  }

  build(): MenuItemConstructorOptions[] {
    return [
      this.createItem("File", [
        this.createItem("New File", () => {
          this._window.webContents.send("newFile");
        }, "CmdOrCtrl+N"),
        this.createItem("Open File", () => {
          this._window.webContents.send("openFile");
        }, "CmdOrCtrl+O"),
        this.createItem("Save File", () => {
          this._window.webContents.send("saveFile");
        }, "CmdOrCtrl+S"),
        { type: "separator" },
        this.createItem("Exit", () => {
          this._app.quit();
        })
      ]),
      this.createItem("Edit", [
        this.createItem("Undo", () => {
          this._window.webContents.send("Undo");
        })
      ]),
      this.createItem("View", [
        this.createItem("Refresh", () => {
          this._window.reload();
        })
      ]),
      this.createItem("Format", [
        this.createItem("Colors", [
          this.createItem("Black", () => {
            this._window.webContents.send("changeColor", { color: "black" });
          }),
          this.createItem("Green", () => {
            this._window.webContents.send("changeColor", { color: "green" });
          }),
          this.createItem("Yellow", () => {
            this._window.webContents.send("changeColor", { color: "yellow" });
          }),
          this.createItem("Red", () => {
            this._window.webContents.send("changeColor", { color: "red" });
          }),
          this.createItem("Blue", () => {
            this._window.webContents.send("changeColor", { color: "blue" });
          }),
          this.createItem("Purple", () => {
            this._window.webContents.send("changeColor", { color: "purple" });
          }),
          this.createItem("Pink", () => {
            this._window.webContents.send("changeColor", { color: "pink" });
          })
        ]),
        this.createItem("Mode", [
          this.createItem("Line", () => {
            this._window.webContents.send("changeMode", { mode: "line" });
          }),
          this.createItem("Circle", () => {
            this._window.webContents.send("changeMode", { mode: "circle" });
          }),
          this.createItem("Square", () => {
            this._window.webContents.send("changeMode", { mode: "square" });
          })
        ]),
        this.createItem("Size", [
          this.createItem("Change Line Thickness", [
            this.createItem("10", () => {
              this._window.webContents.send("changeLineThickness", { thickness: 10 });
            }),
            this.createItem("20 (default)", () => {
              this._window.webContents.send("changeLineThickness", { thickness: 20 });
            }),
            this.createItem("30", () => {
              this._window.webContents.send("changeLineThickness", { thickness: 30 });
            })
          ]),
          this.createItem("Change circle radius", [
            this.createItem("5 (default)", () => {
              this._window.webContents.send("changeCircleRadius", { radius: 5 });
            }),
            this.createItem("10", () => {
              this._window.webContents.send("changeCircleRadius", { radius: 10 });
            }),
            this.createItem("20", () => {
              this._window.webContents.send("changeCircleRadius", { radius: 20 });
            })
          ]),
          this.createItem("Change square width", [
            this.createItem("10 (default)", () => {
              this._window.webContents.send("changeSquareWidth", { width: 10 });
            }),
            this.createItem("20", () => {
              this._window.webContents.send("changeSquareWidth", { width: 20 });
            }),
            this.createItem("30", () => {
              this._window.webContents.send("changeSquareWidth", { width: 30 });
            })
          ])
        ])
      ]),
      // this.createItem("Help", [
      //   this.createItem("About", () => {
      //     this._window.webContents.send("about");
      //   })
      // ]),
      this.createItem("Dev", [
        this.createItem("Developer Tools", () => {
          this._window.webContents.openDevTools();
        }, "CmdOrCtrl+Shift+I"),
        { label: 'Teste', click: () => { console.log('teste') }, sublabel: 'sublabel'}
      ])
    ];
  }
}

export default MenuItemsBuilder;