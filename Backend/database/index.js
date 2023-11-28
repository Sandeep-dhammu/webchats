import mongoose from "mongoose";

export const connect = async() => {
    await mongoose.connect("mongodb://localhost:27017/webChat", ).then(connected =>{
        console.log("web chat database connected");
    }).catch(err =>{
        console.log(err);
    })
}

// export default connect