import {MongoMethods} from "./MongoMethods";
import * as Schema from "./Schema";

type Data = object[] | object;

// Работа с бд языков

export class MongoLangDB extends MongoMethods{
    constructor(){
        super('flowers', 'lang', Schema.LangSchema);
        super.StartConnect()
    }

    public async getAllStaticText(lang:string){
        const Data:Data = await super.Find({lang});
        return Data;
    }
}