import {connect, model} from "mongoose";

type Data = object[] | object;

// Методы для работы с бд

export class MongoMethods {
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
        const NewDoc = new this.Model(create_value);
        NewDoc.save();
    }

    protected Delete(delete_value:object):object{
        return this.Model.deleteOne(delete_value)
    }

}