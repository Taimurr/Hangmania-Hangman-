
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

io.on("connection", (socket) => {
  console.log("new client");
  socket.on("disconnect", () => {
    console.log("disconnect");
  })
});

app.get('/api/remove', async(req, res) => {
  try {
    const result = await prisma.game.deleteMany();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'});
  }
})


  app.get('/api/lobbies', async(req, res) => {
    try {
      const result = await prisma.game.findMany();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  })

  app.post('/api/createLobby', async (req, res) => {
    try {
      const lobby = req.body;
      const { id, ...lobbyData } = lobby;
      const result = await prisma.game.create({data: lobbyData});
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })
  
  app.get('/api/getWordToGuess/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.game.findFirst({
        where: {
          id: id
        },
        select: {
          word: true
        }
      });
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })

  app.get('/api/getLobbyInfo/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.game.findFirst({
        where: {
          id: id
        }
      });
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })

  app.get('/api/getPlayerTest/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.player.findMany({
        where: {
          id: id
        }
      });
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })

  app.get('/api/getPlayers/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.player.findMany({
        where: {
          lobby: id
        }
      });
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })

  app.post('/api/addPlayerToLobby', async (req, res) => {
    try {
      const lobbyId = req.body.lobbyID;
      const playerID = req.body.playerID;
      const result = await prisma.player.update({
        data: {
          lobby: lobbyId
        },
        where: {
          id: playerID
        }
      });
      const lob = await prisma.game.update({
        data: {
          current_players: {increment: 1},
        },
        where: {
          id: lobbyId
        }
      })
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })

  app.post('/api/removePlayerFromLobby', async (req, res) => {
    try {
      const lobbyID = req.body.lobbyID;
      const playerID = req.body.playerID;
      const result = await prisma.player.update({
        data: {
          lobby: null,
        },
        where: {
          id: playerID
        }
      });

      const r = await prisma.game.update({
        data: {
          current_players: {decrement: 1},
        },
        where: {
          id: lobbyID
        }
      })

      setTimeout(()=>{}, 250)
      const a = await prisma.game.deleteMany({
        where: {
          current_players: {lte: 0}
        }
      })
      res.json(result);
    } catch (error) {
      console.log("Error creating lobby:", error);
    }
  })



// gets all players in database
app.get('/api/players', async (req, res) => {
  try {
    const posts = await prisma.jobs.findMany();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// updates player's lobby data, each lobby has a unique id
app.put('/api/updatePlayerLobby/:lobby', async (req, res) => {
  try{
    const lobbyId = parseInt(req.params.lobby);
    const {id, name, lobby, score} = req.body;
    const posts = await prisma.jobs.update({
      where: {
        lobby: lobbyId
      },
      data:{
        id: id,
        name: name,
        lobby: lobby,
        score: score
      }
    });
    res.json(posts);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// create player when signing in
app.post('/api/createPlayer', async (req, res) => {
  try{
    const { name, score, lobby} = req.body;
    const newPlayer = await prisma.player.create({
      data:{
        name: name,
        score: 0,
        lobby: 0
      },
    });
    res.json(newPlayer);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// update player score to add one point to the player's score
app.post('/api/updatePlayerScore', async (req, res) => {
  try{
    const playerId = parseInt(req.body.id);
    const score = parseInt(req.body.score);
    console.log(playerId);
    const updatePlayer = await prisma.player.update({
      where: {
        id: playerId
      },
      data: {
        score: score
      }  
    })

    res.json(updatePlayer);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// updates game round after the round is completed.
app.put('/api/updateGameRound/:id', async (req, res) => {
  try{
    const gameId = parseInt(req.params.id);
    const { id, word, state, round, total_rounds} = req.body;
    const updateGame = await prisma.game.update({
      where: {
        id: gameId
      },
      data: {
        id: id,
        word: word,
        state: state,
        round: round+1,
        total_rounds: total_rounds
      },
    });
    res.json(updateGame);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

server.listen(3000);