export class Message {
    text?:String;
    userId?:String;
    chatId?:String;
    type?:String;
    media?:Media[];
    status?:String;
    createdAt?:Date;
    updatedAt?:Date;
}

class Media {
    url?:String;
    name?:String;
    ext?:String;
    size?:Number;
    type?:String
}