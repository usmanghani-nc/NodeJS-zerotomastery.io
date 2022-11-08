const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

server.listen(PORT);
console.log('server running on port ', PORT);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('A user connected ', socket.id);

  socket.on('ready', () => {
    console.log('Player ready ', socket.id);

    readyPlayerCount++;

    if (readyPlayerCount === 2) {
    }
  });
});
