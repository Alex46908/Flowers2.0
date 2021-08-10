import express from "express";
import * as path from "path";
import multer from "multer";

import {MongoFlowersDB, MongoUsersDB, MongoAdminDB, MongoLangDB} from './Mongo';

const app = express();
type Data = object[] | object ;

const MongoFlowers = new MongoFlowersDB();
const MongoUsers = new MongoUsersDB();
const MongoAdmin = new MongoAdminDB();
const MongoLang = new MongoLangDB();

export class NodeServer{
    private dirpath: string;

    constructor(dirpath: string){
        this.dirpath = dirpath;
        app.use(express.static(path.resolve(__dirname, '..', this.dirpath)));
        app.use(multer({dest:"./client/img/card"}).single("filedata"));
        app.post("/admin_manager", function (req:any, res:any, next:any) {
            MongoFlowers.CreateCard(req.body.titleRu,
                req.body.titleEn,
                req.body.descriptionRu,
                req.body.descriptionEn,
                req.file.filename);

            res.sendFile(path.resolve(__dirname, '..', 'client', 'admin_manager.html'));
        });
        AllApi()
    }

    public Start(Port:number):void{
        app.listen(Port, ():void => {
            console.log(`Started on port ${Port} in localhost`)
        })
    }
    public Page(url:string, name:string){
        app.get(url, (req:any, res:any):void => res.sendFile(path.resolve(__dirname,
            '..', this.dirpath,
            name)))
    }

}

function AllApi(){
    app.get('/api/flowers', (req:any, res:any):void => {
        MongoFlowers.getAllFlowers().then(data => res.send(data))
    });
    app.get('/api/create_user/:full_name/:phone/:content', (req:any, res:any):void => {
        MongoUsers.CreateUser(req.params.full_name, req.params.phone, req.params.content)
        res.send({status: true})
    });
    app.get('/api/checkadmin/:name/:password', (req:any, res:any):void => {
        MongoAdmin.CheckAdmin(req.params.name, req.params.password).then(data => res.send(data))
    });
    app.get('/api/checkadminkey/:key', (req:any, res:any):void => {
        MongoAdmin.CheckAdminKey(req.params.key).then(data => res.send(data))
    });
    app.get('/api/flupdate/:titleRu/:titleEn/:descriptionRu/:descriptionEn/:img', (req:any, res:any):void => {
        MongoFlowers.Update(req.params.titleRu, req.params.titleEn, req.params.descriptionRu, req.params.descriptionEn, req.params.img)
        res.send({status: true})
    });
    app.get('/api/delcard/:img', (req:any, res:any):void => {
        MongoFlowers.DeleteCard(req.params.img);
        res.send({status: true})
    });
    app.get('/api/langstatic/:lang', (req:any, res:any):void => {
        MongoLang.getAllStaticText(req.params.lang).then(data => res.send(data))
    });
}