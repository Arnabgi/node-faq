const jwt = require('jsonwebtoken');
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
    authVerify : async(req,res,next) =>{
        let jwtToken = process.env.JWT_SECRET_KEY; 
        //console.log("jwtToken......",jwtToken);
        let authHeader =  req.headers['authorization'];
        //console.log("authHeader...........",authHeader);
        const bearer_token = authHeader && authHeader.split(' ');
        if(bearer_token){
            //console.log("bearer_token...........",bearer_token[1]);
            //let token = Library.decrypt((bearer_token[1]).replace(/"/g, ''));
            //console.log("bearer_token..........",bearer_token[1]);
            jwt.verify(bearer_token[1],jwtToken,(err,verifiedJwt) =>{
                if(err) {
                    //console.log("err.........",err);
                    return res.json({
                        status: 401,
                        message: err.message
                    })
                }
                else{
                    console.log(verifiedJwt);
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
    }
}