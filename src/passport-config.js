const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./database.js')

function initialize(passport){
    const authenticateUser = async (email, password, done) => {
        db.getUserByMail(email, async (user) => {
            
            if(user == null){
                return done(null, false, {message: 'Wrong username or password.'})
            }

            try{
                if(await bcrypt.compare(password, user.password)){
                    console.log('Login succeed')
                    return done(null, user)
                } else {
                    console.log('Login failed')
                    return done(null, false, {message: 'Wrong username or password.'})
                }
            } catch (e) {
                return done(e)
            }
        })       
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        db.getUserById(id, function (data){
            return done(null, data)
        })    
    })
}

module.exports = initialize