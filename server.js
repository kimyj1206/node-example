// express 모듈 불러오기
const express = require('express');

// express 서버를 위한 포트 설정
const PORT = 3000;

const Users = [
  {
    id: 0,
    name: 'Jack'
  },
  {
    id: 1,
    name: 'Lucy'
  }
]

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

app.get('/users', (req, res) => {
  res.send(Users);
});

app.post('/users', (req, res) => {
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
})

// ID로 검색
// app.get('/users/:userId', (req, res) => {
//   const userId = Number(req.params.userId);
//   const user = Users[userId];
//   if(user) {
//     res.json(user);
//   } else {
//     res.sendStatus(404);
//     console.log('User not found');
//   }
// });

// NAME으로 검색
app.get('/users/:userName', (req, res) => {
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
});

// ID, NAME 같이 검색
// ID와 NAME을 각각 두지는 못함 -> 같은 주소 경로를 갖고 있기에 얘가 ID인지 NAME인지 모름, 보통은 /users/findById/id처럼 세분화함.
app.get('/users/:userId/:userName', (req, res) => {
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
})

// 해당 포스트와 호스트에서 http 서버를 시작
app.listen(PORT, () => {
  console.log(`Running on http://${PORT}`);
});