import {MongoMethods} from "./MongoMethods";
import * as Schema from "./Schema";

type Data = object[] | object;
// Работа с бд Admin

export class MongoAdminDB extends MongoMethods{
    constructor(){
        super('flowers', 'Admin', Schema.AdminSchema);
        super.StartConnect()
    }

    public async CheckAdmin(mail:string, password:string):Promise<Data>{
        let Admin:Data = await super.Find({mail, password});
        return Admin;
    }

    public async CheckAdminKey(key: string):Promise<Data>{
        let Admin:Data = await super.Find({key});
        return Admin;
    }
}