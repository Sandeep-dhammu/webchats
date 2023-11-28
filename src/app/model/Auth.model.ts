export class Auth {
    _id?:String;
    firstName?:String;
    middleName?:String;
    lastName?:String;
    email?:String;
    phoneNo?:Number;
    token?:String;
    status:"pending" | "active" | "inactive" | "deleted" = "pending";
    profile?:{
        imgUrl?:String;
        bio?:String;
    }
}
