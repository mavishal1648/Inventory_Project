export const setLastVisit = (req,res,next)=>{

    // 1. if cookie is set,then add a local variable with last visit time data..
    //first we are checking if cookie is already present
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    //if user logins in for first time then below we are creating the cookie
    res.cookie('lastVisit',new Date().toISOString(),{
        maxAge:2*24*60*60*1000
    });
    //calling the next middleware..
    next();
}