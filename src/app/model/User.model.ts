export class User {
    _id?:String;
    email?:String;
    username?:String
    phoneNo?:Number;
    token?:String;
    status:"pending" | "active" | "inactive" | "deleted" = "pending";
    profile?:{
        firstName?:String;
        middleName?:String;
        lastName?:String;
        imgUrl?:String;
        bio?:String;
    }
}
