import express from 'express';
import * as path from 'path';
const app = express();
import { Schema, model, connect } from 'mongoose';
type Data = object[] | object | void;
//MongoDB

interface IFlowers {
    title:string
    description:string
    img: string
}

class MongoConnect {
    private FlowersSchema = new Schema<IFlowers>({
        title:String,
        description:String,
        img: String
    });
    private collection:string;
    private Flowers:any;
    private DBName: string;
    constructor(DBName:string, collection:string){
        this.DBName = DBName;
        this.collection = collection
        this.Flowers = model<IFlowers>('flowers', this.FlowersSchema, this.collection);
    }

    public StartConnect():void{
        connect(`mongodb://localhost:27017/${this.DBName}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    }
    public getAllData():Data{return this.Flowers.find()}
}

async function DBConnect():Promise<Data> {
    const DB = new MongoConnect('flowers', 'flowers');
    await DB.StartConnect();
    const Data:Data = await DB.getAllData();
    return Data;
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
    public Api(url:string, response:Data):void{
        app.get(url, (req:any, res:any):void  => res.send(response))
    }
    public Page(url:string, name:string){
        app.get(url, (req:any, res:any):void => res.sendFile(path.resolve(__dirname, this.dirpath, name)))
    }
}

const Server = new NodeServer('client');
DBConnect().catch(err => console.log(err)).then((AllData:Data) => {
    Server.Api('/api/flowers', AllData);
});

Server.Page('', 'index.html');

Server.Start(3000);


