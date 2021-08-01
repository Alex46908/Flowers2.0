import express from 'express';
import * as path from 'path';
import {Send} from './telegram';
const app = express();
import { Schema, model, connect } from 'mongoose';
const multer = require('multer')
type Data = object[] | object | void;
//MongoDB
interface IFlowers {
    title:string;
    description:string;
    img: string;
}
interface IUser{
    full_name: string;
    phone:string;
}
interface IAdmin{
    mail: string;
    password: string;
    key: string;
}
const FlowersSchema = new Schema<IFlowers>({
    title:String,
    description:String,
    img: String
});
const UserSchema = new Schema<IUser>({
    full_name: String,
    phone:String
});
const AdminSchema = new Schema<IAdmin>({
    mail: String,
    password: String,
    key: String
});
class MongoConnect {
    private collection:string;
    private Model:any;
    private DBName: string;
    constructor(DBName:string, collection:string, Schema:any){
        this.DBName = DBName;
        this.collection = collection;
        this.Model = model<IFlowers>(collection, Schema, this.collection);
    }

    public StartConnect():void{
        connect(`mongodb://localhost:27017/${this.DBName}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    }
    public getAllData():Data{return this.Model.find()}

    public Find(find_value:object):Data{return this.Model.find(find_value)}

    public Create(create_value:object):Data{
        const NewUser = new this.Model(create_value);
        NewUser.save();
    }
    public Delete(delete_value:object):void{
        return this.Model.deleteOne(delete_value)
    }
}
async function DeleteCard(img:string){
    const DB = new MongoConnect('flowers', 'flowers', FlowersSchema);
    await DB.StartConnect();
    await DB.Delete({img: img})
}
async function CreateCard(title:string, description:string, img:string){
    const DB = new MongoConnect('flowers', 'flowers', FlowersSchema);
    await DB.StartConnect();
    await DB.Create({title: title, description: description, img: img})
}
async function Update(title:string, description:string, img:string){
    const DB = new MongoConnect('flowers', 'flowers', FlowersSchema);
    await DB.StartConnect();
    await DB.Delete({img: img})
    await DB.Create({title: title, description: description, img:img})
}
async function DBConnect():Promise<Data> {
    const DB = new MongoConnect('flowers', 'flowers', FlowersSchema);
    await DB.StartConnect();
    const Data:Data = await DB.getAllData();
    return Data;
}
async function CreateUser(full_name:string, phone:string, content:string):Promise<void> {
    const DB = new MongoConnect('flowers', 'Users', UserSchema);
    await DB.StartConnect();
    await Send(full_name, phone, content)
    const User:any = await DB.Find({phone: phone});
    if (User[0] == undefined){
        DB.Create({full_name: full_name, phone: phone});
    }
}
async function CheckAdmin(mail:string, password:string):Promise<Data>{
    const DB = new MongoConnect('flowers', 'Admin', AdminSchema);
    await DB.StartConnect();
    let Admin:Data = await DB.Find({mail: mail, password: password});
    return Admin;
    }
async function CheckAdminKey(key: string):Promise<Data>{
    const DB = new MongoConnect('flowers', 'Admin', AdminSchema);
    await DB.StartConnect();
    let Admin:Data = await DB.Find({key: key});
    return Admin;
}
//Server
class NodeServer{
    private dirpath: string;
    constructor(dirpath: string){
        this.dirpath = dirpath;
        app.use(express.static(path.resolve(__dirname, this.dirpath)));
    }
    public Start(Port:number):void{
        app.listen(Port, ():void => {
            console.log(`Started on port ${Port} in localhost`)
        })
    }
    public Api(url:string, response:Data | 'return', callback:Function = () => {}, params:any[] = []):void{
        app.get(url, (req:any, res:any):void  => {
            let res_params:any[] = [];
            for (let field in params){
                res_params[field] = req.params[params[field]]
            }
            let callback_return;
            if(req.params){
                callback_return = callback(...res_params)
            }
            if(typeof response == 'string'){
                callback_return.then((data:Data) => res.send(data))
            }else{
                res.send(response)
            }
        })
    }
    public Page(url:string, name:string){
        app.get(url, (req:any, res:any):void => res.sendFile(path.resolve(__dirname, this.dirpath, name)))
    }
}

const Server = new NodeServer('client');

app.use(multer({dest:"./client/img/card"}).single("filedata"));
app.post("/admin_manager", function (req:any, res:any, next) {
    CreateCard(req.body.title, req.body.description, req.file.filename);
    res.sendFile(path.resolve(__dirname, 'client', 'admin_manager.html'))
});
Server.Api('/api/flowers', 'return', DBConnect);
Server.Api('/api/create_user/:full_name/:phone/:content', {status: true}, CreateUser, ['full_name', 'phone', 'content']);
Server.Api('/api/checkadmin/:name/:password', 'return', CheckAdmin, ['name', 'password']);
Server.Api('/api/checkadminkey/:key', 'return', CheckAdminKey, ['key']);
Server.Api('/api/flupdate/:title/:description/:img', {status: true}, Update, ['title', 'description', 'img']);
Server.Api('/api/delcard/:img', {status: true}, DeleteCard, ['img']);

Server.Page('', 'index.html');
Server.Page('/product', 'product.html');
Server.Page('/about', 'about.html');
Server.Page('/admin', 'admin.html')
Server.Page('/admin_manager', 'admin_manager.html')
Server.Start(3000);


