// express 모듈 불러오기
const express = require('express');

const usersRouter = require('./routes/users.router');
const postRouter = require('./routes/posts.router');

const path = require('path');

// express 서버를 위한 포트 설정
const PORT = 3000;

// 새로운 express 어플 생성
const app = express();

// html 접속
app.use('/static', express.static(path.join(__dirname, 'public')));

// views 동적 파일 세팅
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    imageTitle: "It is a 우사기 이얏하~"
  })
});

app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postRouter);

// 미들웨어 생성
app.use('/users', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  console.log(`start : ${req.method} ${req.url}`);
  next();
  const diffTime = Date.now() - start;
  console.log(`end : ${req.method} ${req.baseUrl} ${diffTime}ms`);
});

// 해당 포스트와 호스트에서 http 서버를 시작
app.listen(PORT, () => console.log(`Running on http://${PORT}`));