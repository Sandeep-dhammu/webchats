export class Chat {
    _id?:String;
    users?:ChatUser[]
    opponentUsers?:OpponentUser[]
    status?:String
    type?:String;;
    imgUrl?:String;
    unread?:Number;
    createdAt?:Date;
    lastMessage?:String
    chatName?:String
}

class ChatUser {
    userId?:String;
    isAdmin?:Boolean;
    isActive?:Boolean;
    lastActive?:Date;
    status?:String;
}

class OpponentUser {
    details?:ChatUser
    username?:String
    profile?:{
        firstName?:String;
        middleName?:String;
        lastName?:String;
        imgUrl?:String; 
        bio?:String;
    }

}
