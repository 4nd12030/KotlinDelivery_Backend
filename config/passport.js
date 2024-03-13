
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Usuario =  require('../models/usuario')
const Keys = require('../config/keys')

module.exports = function(passport) {

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = Keys.secretOrKey
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        Usuario.findById(jwt_payload.id, (err, usuario) => {
            if(err) {
                return done(err, false)
            }
            if (usuario) {
                return done(null, usuario)
            }
            else {
                return done(null, false)
            }            
        })
    }))
}