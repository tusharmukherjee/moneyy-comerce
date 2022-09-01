const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {UsersModel} = require("../sqlDB/models/usersModel");

const salt = bcrypt.genSaltSync(10);


const jwtToken = (value) =>  {
    const giveToken = jwt.sign({"user_id": value},
                        "randomJWTcheck123!", { expiresIn: '1d' })
    return giveToken;
    
}



// [x] Working ...
router.post("/adduser", async (req,res) =>{
    try {

            const {username, password,user_id} = req.body;
            const hashPass = await bcrypt.hash(password,salt);
            const newUserHash = {
                userId:user_id,
                username,
                password:hashPass
            }
            await UsersModel.query().insert(newUserHash);
            
            // console.log(newUser);
            console.log(newUserHash);
            res.send(newUserHash);
        
    } catch (error) {
        console.log(error);
    }
});


// [x] Working... 
router.post("/authuser", async (req,res) => {
    try {

            const usersblog = await UsersModel.query().where('username', req.body.username);

            let resultBcrypt;

            if(Boolean(usersblog.length)){
                console.log("first")
                resultBcrypt = await bcrypt.compare(req.body.password, usersblog[0].password);
                console.log(resultBcrypt);
            }
            else{
                resultBcrypt = false;
            }

            if(resultBcrypt){
                const jwtAccessToken = jwtToken(usersblog[0].user_id);
                res.cookie("aces_token",jwtAccessToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly:true});
                res.send(
                    {
                        "user_id": usersblog[0].userId,
                        "username": usersblog[0].username,
                        "authorized": true,
                        "token": jwtAccessToken
                    }
                )
            }else{
                res.send({
                    "msg":"❌Wrong username: "+req.body.username,
                    "authorized": false,
                    "token": null
                })
            }

        
    } catch (error) {
        console.log(error);        
    }
});

module.exports = router;