const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', naam =>{ 
        console.log(naam);
        users[socket.id] = naam;
        socket.broadcast.emit('user-joined', naam);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, naam: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})