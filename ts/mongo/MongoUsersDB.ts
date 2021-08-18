import {MongoMethods} from "./MongoMethods";
import * as Schema from "./Schema";
import {Send} from "../telegram";

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