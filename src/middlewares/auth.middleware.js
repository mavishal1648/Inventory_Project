
export const auth = (req,res,next)=>{
    //if we have a cookie saved thats when it will work
    // from this req.session.userEmail we are getting a cookie
    if(req.session.userEmail){
        next();
    }
    else{
        res.redirect('/login');
    }

}