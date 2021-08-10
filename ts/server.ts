import {NodeServer} from "./NodeServer"

//Server

const Server = new NodeServer('client');

Server.Page('', 'index.html');

Server.Page('/product', 'product.html');

Server.Page('/about', 'about.html');

Server.Page('/admin', 'admin.html');

Server.Page('/admin_manager', 'admin_manager.html');

Server.Start(3000);


