//arquivo pricipal
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
      socket.join(box);//isolando o usuário em uma sala única
  })
});

mongoose.connect('mongodb+srv://elnino:elnino@cluster0-upvky.mongodb.net/pubvideo?retryWrites=true', 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));// faz um redirecionamento para a pasta tmp e busca os arqs. físicos

app.use(require("./routes"));

//Variáveis de ambiente
server.listen(process.env.PORT || 3333);