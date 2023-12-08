import ProductModel from "../models/product.model.js";
import userModel from "../models/user.model.js";

export default class userController{

    getRegister(req,res){
        res.render('register');
    }

    getLogin(req,res){
        res.render('login',{
            errorMessage:null,
        });
    }

    postRegister(req,res){
        
        const {name ,email ,password} = req.body;
        userModel.add(name,email,password);
        return res.status(201).render('login',{
            errorMessage:null,
        });
    }

    postLogin(req,res){
        const {email,password} = req.body;
        const user = userModel.isValidUser(email,password);
        if(!user){
            res.render('login',{
                errorMessage:'Invalid Credentials',
                userEmail:req.session.userEmail
            })
        }

        //creating a session used for authentication purpose
        req.session.userEmail = email;
        var products = ProductModel.getAll();
        return res.render('index',{products,userEmail:req.session.userEmail});
    }

    logout(req,res){
        //on logout we are destroying the session
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('login');
            }
        })
        res.clearCookie('lastVisit');
    }
}


