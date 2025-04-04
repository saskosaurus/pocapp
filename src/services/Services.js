import Authentication from "@/repository/Authentication.js";

let services = {

    async signUp(email, password){
        return await Authentication.signUp(email, password);
    },

    async signIn(email, password){
        return await Authentication.signIn(email, password);
    }

}

export default services;