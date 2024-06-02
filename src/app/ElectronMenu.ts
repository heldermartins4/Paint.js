import { Menu, MenuItemConstructorOptions } from "electron";
import { MenuItem } from "electron";

class ElectronMenu {
    
    private _menu: Menu;

    constructor(items: MenuItemConstructorOptions[]) {

        this._menu = Menu.buildFromTemplate(items);
        Menu.setApplicationMenu(this._menu);
    }

    append(item: MenuItemConstructorOptions): void {

        this._menu.append(new MenuItem(item));
    }

    insert(position: number, item: MenuItemConstructorOptions): void {

        this._menu.insert(position, new MenuItem(item));
    }

    popup(options?: Electron.PopupOptions): void {

        this._menu.popup(options);
    }
}

export default ElectronMenu;