const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'Public', 'test', 'index.html'));
});

io.on('connection',function(socket){
    console.log('A user connected',socket.id);

    setTimeout(function(){
        // Sending an object when emmiting an event
        socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
     }, 4000);

    io.on('chat message', (msg) => {
        console.log(`Message is: ${msg}`);
        io.emit('chat message',msg)
    })

    socket.on('disconnect', function(){
        console.log('A user disconnected',socket.id);
        
    })
})

http.listen(5000, function(){
    console.log('listening on http://localhost:5000');
 });