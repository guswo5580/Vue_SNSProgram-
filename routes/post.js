//이미지 , 게시글을 업로드 하는 라우터 
const express = require('express');
const multer = require('multer');
//이미지 업로드 라우터 
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    //어디에 저장할지 -- 서버디스크에 저장하기 = diskStorage 
    destination(req, file, cb) {
      //파일이 저장될 경로 
      cb(null, 'uploads/');
      //uploads 폴더에 파일이 쌓인다 
    },
    filename(req, file, cb) {
      //저장될 파일 이름 
      const ext = path.extname(file.originalname);
      //확장자 설정 
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
      //에러 및 결과값  -> 파일명 + 현재 시간 + 확장자명
      //현재시간은 왜 ?? -> 중복된 파일을 방지하기 위해 
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  //파일 사이즈 -- 5mb를 나타냄 
});

//이미지 업로드
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
                                //single = 1개 , array = 여러개 단일필드 , fields = 여러개 복수필드 , none = 이미지 없음
  console.log(req.file);
  //multer를 통해 저장한 파일은 req.body가 아닌 req.file에 저장됨 
  res.json({ url: `/img/${req.file.filename}` });
  // res.send( {url : req.url});
});

// -> 사진을 업로드 하지 않고 게시글만 업로드 하는 경우 upload2 로 하여 none으로 설정 
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    if(req.body.content === ''){
      res.send('No Content');
      res.redirect('/home');
    }else {
      const post = await Post.create({
        content: req.body.content,
        img: req.body.url,
        userId: req.user.id,
        //누구의 게시글인지 표시하기 위해 관계 설정된 User를 넣어준다 
      });
      var tags = req.body.content.split('#');
      var pos = req.body.content.indexOf('#');
      var hashtags = new Array();
      var i = 1;
      if( pos > -1 ){
        while(i < tags.length){
          hashtags.push(tags[i]);
          i++;
        }
      }else{
        hashtags = null;
      }
    
    
    // const hashtags = req.body.content.match(/#[^\s]*/g);
                                          //#뒤에 공백을 제거하고 붙여주는 정규표현식 
    
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                                                          //중복되는 해시태그를 없애기 위해
                                                          //있으면 같은 내용의 해시태그는 create하지 않는다 
        where: { title: tag.toLowerCase() },
                    //# 표시 삭제 , 대소문자 구별 X 
      })));
      await post.addHashtags(result.map(r => r[0]));
      //게시글에 여러개의 해시태그를 배열로 연결해주는 구문 
    }
    res.redirect('/home');
  }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//게시글 지우기
// router.delete('/:id', async (req, res,next) => {
  // 보낼 때  ``으로 감싸 params를 전달하는 방식으로 한다
  // await Post.destroy({ where : {id : req.params.id, userId : req.user.id}});

router.delete('/delete', async (req, res, next) => {
  try {
    await Post.destroy({ where : {id : req.query.id, userId : req.user.id}});
    //내가 쓴 게시글인지 확인하고 지우기
    res.send('OK');
  }
  catch (err) {
    console.log(err);
    next(err);
  }
});
//해시태그 검색 라우터 
router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  //사용자가 입력한 내용
  if (!query) {
    return res.send('Failed');
    //입력하지 않았을 때 
  }
  try {
    const hashtag = await Hashtag.find({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
      //A.getB - 관계있는 로우 조회
      //A.addB - 관계 생성
      //A.setB - 관계 수정 
      //A.removeB - 관계 제거 
    }
    return res.send({
      title: query,
      user: req.user,
      twits: posts
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//좋아요 및 좋아요 취소 라우터 생성
router.post('/:id/like', async (req, res, next) => {
  try {
    const post = await Post.find({ where : {id : req.params.id}});
    await post.addLiker(req.user.id);
    res.send('success');
  }
  catch(err){
    console.log(err);
    next(err);
  }
});
router.post('/:id/unlike', async (req, res, next) => {
  try {
    const post = await Post.find({ where : {id : req.params.id}});
    await post.removeLiker(req.user.id);
    res.send('success');
  }
  catch(err){
    console.log(err);
    next(err);
  }
});
module.exports = router;
