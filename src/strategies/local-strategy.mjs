import passport from "passport";
import { Strategy } from "passport-local"
import users from "../utils/constants.mjs";

passport.serializeUser((user,done)=>{
    // console.log('Serializing User: ');
    // console.log(user);
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    //console.log(`De-Serializing User: ${id}`);
    try{
        const finduser = users.find((user) => user.id === id);
        // console.log(finduser);
        if(!finduser) throw new Error("User not found");
        done(null, finduser);
    }catch(err){ 
        done(err, null); 
    }
})
export default passport.use(
 new Strategy(
    (username, password, done) =>{
        //console.log(`username: ${username} Password: ${password}`);
        try{
            const findUser = users.find((user) => user.userName === username)
            if(!findUser) throw new Error('User not found!');
            if(findUser.password !== password)  throw new Error('Invalid credentials!');

            done(null, findUser);

        }catch(err){
            done(err, null);
        }
    })
);