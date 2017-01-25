//export function and import it in index.js

const passport = require('passport') 
const Authentication = require('./controllers/authentication')
const Ticket = require('./controllers/ticket_controller')
const passportService = require('./services/passport')

//by default passport will set up a cookie-based session, but we are using jwt
const requireAuth = passport.authenticate('jwt', { session: false})

//requireAuth is middleware , it is a helper that intercepts any route
//that needs to be validated

const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app){
    //inside function we have access to app



    app.get('/test', requireAuth, function(req, res, next){
        //if user hits route , then run this function
        //req - object represents incoming request
        //res - represents response we are going to form up and send back to whoever made request
        //next - used mostly for error handling 
        res.send({ message: 'thank you for visiting app'})
    })

    

    app.post('/signin', requireSignin, Authentication.signin)
    //before user can go to signin route handler, signin is required

    app.post('/signup', Authentication.signup)

    app.post('/ticket', requireAuth, Ticket.createTicket)
        //if user hits route , then run this function
        //req - object represents incoming request
        //res - represents response we are going to form up and send back to whoever made request
        //next - used mostly for error handling 
        // res.json({ message: 'thank you for visiting app'})
    
    app.get('/ticket', requireAuth, Ticket.getTicket)


    app.get('/ticket/:id', requireAuth, Ticket.getOneTicket)

    app.delete('/ticket/:id', requireAuth, Ticket.deleteTicket)

    app.put('/ticket/:id', requireAuth, Ticket.editTicket)

    
    
    
}

