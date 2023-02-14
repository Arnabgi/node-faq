const jwt = require('jsonwebtoken');
const library = require('../library/library');
const model = require('../models');
const login = model.login;
module.exports = {
    //getAppConfig && shouldExcludeAuth are must be define in library........
    getAppConfig: function(key, defaultValue="") {
        return config.AppConfig[key] || defaultValue;  
    },
    shouldExcludeAuth: function(requestPath, requestMethod) {
        const ExceptRoute = this.getAppConfig("EXCEPT_AUTH_REQUEST", []);
        return !(!ExceptRoute.find(r => {
            return r.path.test(requestPath) && r.method === requestMethod;
        }));
    },
    //......................................................................  
    authVerify : async(req,res,next) => {
        let jwtToken = process.env.JWT_SECRET_KEY; 
        //console.log("jwtToken......",jwtToken);
        let authHeader =  req.headers['authorization'];
        //console.log("authHeader...........",authHeader);
        const bearer_token = authHeader && authHeader.split(' ');
        if(bearer_token){
            //console.log("bearer_token...........",bearer_token[1]);
            //let token = Library.decrypt((bearer_token[1]).replace(/"/g, ''));
            //console.log("bearer_token..........",bearer_token[1]);
            await jwt.verify(bearer_token[1],jwtToken,(err,verifiedJwt) =>{
                if(err) {
                    //console.log("err.........",err);
                    return res.json({
                        status: 401,
                        message: err.message
                    })
                }
                else{
                    req.username = verifiedJwt.username;
                    // console.log("verifiedJwt...............",library.decrypt(verifiedJwt));
                    console.log("verifiedJwt.....................",verifiedJwt);
                    next();
                }
            })
        }
        else{
            return res.json({
                status: 401,
                message: "Authentication Failed!"  
            });
        }
    },

    loginVerify : async(req,res,next) => {
        console.log("userId............",req.id);
        // console.log("login........",req.username);
        if(req.username){
            const isLogin = await login.findOne({
                where: {
                    username: req.username,
                    is_login: 0
                }
            });
            if(!isLogin){
                return res.json({
                    status: 401,
                    message: "User must be login first"  
                });
            }
            else{
                console.log("userId...........",isLogin.id);
                req.id = isLogin.id;
                next();
            }
        }
    }
}