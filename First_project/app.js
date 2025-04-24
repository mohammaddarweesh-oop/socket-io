const { error, log } = require('console');
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('views','views');
app.use(express.static('views'));

app.get('/',(req,res) => {
    res.render('index.html');
})

io.on('connection', (socket) => {
    socket.on('send-message',(data) => {
        console.log("Data : ",data);
        
        socket.emit('send-message', data);
     });
});

server.listen(5000, (req,res) => {
    console.log(`listin on http://localhost:5000`);
})