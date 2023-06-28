const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/src'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

var users = 0;


//Connected 
io.on('connection', (socket) => {
    console.log('Connected...',Date.now())
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

    users++
    console.log(users,"user connected")

    //Disconnected
    socket.on('disconnect',function(){
        console.log("A user Disconnected",Date.now())
    
    });


})