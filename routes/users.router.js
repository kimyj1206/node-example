const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/users.controller');

usersRouter.get('', usersController.getUsers);

// ID로 검색
// usersRouter.get('/:userId', usersController.getUserById);

// NAME으로 검색
usersRouter.get('/:userName', usersController.getUserByName);

// ID, NAME 같이 검색
// ID와 NAME을 각각 두지는 못함 -> 같은 주소 경로를 갖고 있기에 얘가 ID인지 NAME인지 모름, 보통은 /users/findById/id처럼 세분화함.
usersRouter.get('/i=/:userId/n=/:userName', usersController.getUserFind);

usersRouter.post('/', usersController.postUser);

module.exports = usersRouter;