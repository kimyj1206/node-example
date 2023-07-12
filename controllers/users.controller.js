const Users = require('../models/users.model');

function getUsers(req, res) {
  res.json(Users);
};

function getUserById(req, res) {
  app.get('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const user = Users[userId];
    if(user) {
      res.json(user);
    } else {
      res.sendStatus(404);
      console.log('User not found');
    }
  });
}

function getUserByName(req, res) {
  const userName = req.params.userName;
  const user = Users.find((user) => 
    user.name === userName
  );
  if(user) {
    res.json(user);
  } else {
    res.sendStatus(404);
    console.log('User not found');
  }
}

function getUserFind() {
  const userName = req.params.userName;
  const userId = Number(req.params.userId);
  const user = Users.find((user) => {
    return user.id === userId && user.name === userName;
  });
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
    console.log('User not found');
  }
}

function postUser(req, res) {
  if(!req.body.name) {
    return res.status(400).json({
      error: "Missing user name"
    })
  }

  const newUser = {
    id: Users.length,
    name: req.body.name
  }
  Users.push(newUser);
  res.json(newUser);
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  getUserFind,
  postUser
}