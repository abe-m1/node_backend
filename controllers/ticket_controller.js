const Ticket = require('../models/ticket')

exports.createTicket = function(req, res, next){
    const { title , categories, content, imageUrl } = req.body


        const ticket = new Ticket({
           title: title,
           categories: categories,
           content: content,
           imageUrl: imageUrl
        })

        ticket.save(function(err, ticket){
            if (err) { return next(err)}

            res.json( { ticket: ticket })
        })
    
}

exports.getTicket = function(req, res, next){
    Ticket.find({})
        .then(response => res.json({ ticket: response}))

}


exports.getOneTicket = function(req, res, next){
    console.log(req.params.id)
    ticket = req.params.id
    Ticket.findById({ _id:ticket })
        .then(response => res.json({ ticket: response}))

}


exports.deleteTicket = function(req, res, next){
    console.log(req.params.id)
    ticket = req.params.id
    Ticket.findByIdAndRemove({ _id:ticket })
        .then(response => res.json({ message: 'ticket has been removed'}))
}

exports.editTicket = function(req, res, next){
    const { title , categories, content } = req.body
    id = req.params.id
    query = { _id:id }
    Ticket.findOneAndUpdate(query , {title:title, categories:categories, content:content})
        .then(response => res.json({ ticket: ticket}))
}