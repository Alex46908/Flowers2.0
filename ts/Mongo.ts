import * as Schema from "./Schema";

import {connect, model} from "mongoose";
import {Send} from "./telegram";

type Data = object[] | object;

// Методы для работы с бд

abstract class MongoMethods {
    private collection:string;
    private Model:any;
    private DBName: string;

    constructor(DBName:string, collection:string, Schema:any){
        this.DBName = DBName;
        this.collection = collection;
        this.Model = model(collection, Schema, this.collection);
    }

    protected StartConnect():void{
        connect(`mongodb://localhost:27017/${this.DBName}`,
            {useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true  });
    }

    protected getAllData():Data{
        return this.Model.find()
    }

    protected Find(find_value:object):Data{
        return this.Model.find(find_value)
    }

    protected Create(create_value:object):void{
        const NewUser = new this.Model(create_value);
        NewUser.save();
    }

    protected Delete(delete_value:object):object{
        return this.Model.deleteOne(delete_value)
    }

}

// Работа с бд цветов

export class MongoFlowersDB extends MongoMethods{
    constructor(){
        super('flowers', 'flowers', Schema.FlowersSchema);
        super.StartConnect()
    }

    public async DeleteCard(img:string):Promise<void>{

        await super.Delete({img})

    }

    public async CreateCard(titleRu:string,
                            titleEn:string,
                            descriptionRu:string,
                            descriptionEn:string,
                            img:string):Promise<void>{

        await super.Create({titleRu: titleRu,
                                        titleEn,
                                        descriptionRu,
                                        descriptionEn,
                                        img})

    }

    public async Update(titleRu:string,
                                 titleEn:string,
                                 descriptionRu:string,
                                 descriptionEn:string,
                                 img:string):Promise<void> {

        await super.Delete({img});

        await super.Create({
            titleRu,
            titleEn,
            descriptionRu,
            descriptionEn,
            img
        })
    }
    public async getAllFlowers():Promise<Data> {
        const Data:Data = await super.getAllData();
        return Data;
    }
}

// Работа с бд users

export class MongoUsersDB extends MongoMethods{
    constructor(){
        super('flowers', 'Users', Schema.UserSchema);
        super.StartConnect()
    }

    public async CreateUser(full_name:string, phone:string, content:string):Promise<void> {
       if (phone == undefined){

       }else{
           await Send(full_name, phone, content)
           const User:any = await super.Find({phone});
           if (User[0] == undefined){
               super.Create({full_name, phone});
           }
       }
    }
}

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