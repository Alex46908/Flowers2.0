import {Schema} from 'mongoose';
interface IFlowers {
    titleRu      : string;
    titleEn      : string;
    descriptionRu: string;
    descriptionEn: string;
    img          : string;
}

interface IUser{
    full_name: string;
    phone    : string;
}

interface IAdmin{
    mail    : string;
    password: string;
    key     : string;
}

interface ILang{
    lang   : string;
    form   : object,
    header : object;
    index  : object;
    about  : object;
    product: object;
}

export const FlowersSchema = new Schema<IFlowers>({
    titleRu      : String,
    titleEn      : String,
    descriptionRu: String,
    descriptionEn: String,
    img          : String
});

export const UserSchema = new Schema<IUser>({
    full_name: String,
    phone    : String
});

export const AdminSchema = new Schema<IAdmin>({
    mail    : String,
    password: String,
    key     : String
});

export const LangSchema = new Schema<ILang>({
    lang   : String,
    form   : Object,
    header : Object,
    index  : Object,
    about  : Object,
    product: Object
});