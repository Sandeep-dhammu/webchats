import Chat from "../models/Chat";

export const create = async() => {
    try {
        const { chatId } = req.body;

        const isValid = new Validator(req.body, {
          chatId: "required",
        });
    
        if (!(await isValid.check())) throw isValid.errors;

        if(!await Chat.findById(chatId)) throw "Chat doesn't exist";

        await 

    } catch (err) {
        
    }
}

export const search = async() => {
    try {
       const {search} = req.query;

       let where = {
        
       }
       if(search){
        
       }

    } catch (err) {
        
    }
}