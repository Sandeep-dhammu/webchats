export class Chat {
    _id?:String;
    opponentUsers?:OpponentUser[]
    user?:OpponentUser
    status?:String
    type?:String;;
    imgUrl?:String;
    unread?:Number;
    createdAt?:Date;
    lastMessage?:String
    chatName?:String
}

class OpponentUser {
    userId?:String;
    isAdmin?:Boolean;
    isNowActive?:Boolean;
    lastActive?:Date;
    status?:String;
    unreadMessage?:Number
    username?:String
    profile?:{
        firstName?:String;
        middleName?:String;
        lastName?:String;
        imgUrl?:String; 
        bio?:String;
    }

}
