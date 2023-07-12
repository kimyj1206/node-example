// express 모듈 불러오기
const express = require('express');

const usersController = require('./controllers/users.controller');
const postController = require('./controllers/posts.controller');

// express 서버를 위한 포트 설정
const PORT = 3000;

// 새로운 express 어플 생성
const app = express();

app.use(express.json());

// 미들웨어 생성
app.use('/users', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`${req.method} ${req.url} ${diffTime}`);
});

// "/" 해당 경로로 요청이 오면 Hello World!를 결과값으로 전달
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/users', usersController.getUsers);

// ID로 검색
// app.get('/users/:userId', usersController.getUserById);

// NAME으로 검색
app.get('/users/:userName', usersController.getUserByName);

// ID, NAME 같이 검색
// ID와 NAME을 각각 두지는 못함 -> 같은 주소 경로를 갖고 있기에 얘가 ID인지 NAME인지 모름, 보통은 /users/findById/id처럼 세분화함.
app.get('/users/:userId/:userName', usersController.getUserFind);

app.post('/users', usersController.postUser);

app.get('/posts', postController.getPost);

// 해당 포스트와 호스트에서 http 서버를 시작
app.listen(PORT, () => {
  console.log(`Running on http://${PORT}`);
});