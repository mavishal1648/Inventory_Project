export default class userModel{
    constructor(id,name,email,password){
        this.id = id,
        this.name = name,
        this.email = email,
        this.password = password
    };

    static add(name , email, password){
        const newUser = new userModel(users.length+1,name,email,password);
        users.push(newUser);
        console.log(users);
    }
    
    static isValidUser(email,password){
        const result = users.find((e)=> e.email === email && e.password === password);

        return result;
    }
}

var users = [] ;