import {MongoMethods} from "./MongoMethods";
import * as Schema from "./Schema";

type Data = object[] | object;

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