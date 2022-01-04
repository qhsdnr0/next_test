const express = require("express");
const routes = require('../globals').routes;

const { checkToken } = require('../middlewares/auth.js');
const contentController = require('../controllers/contentController.js');

const contentRouter = express.Router();


//전체 콘텐츠 조회
contentRouter.get(routes.content, contentController.getContentList);

//콘텐츠 추가(관리자 전용)
contentRouter.post(routes.content, checkToken, contentController.postContent);

//단일 콘텐츠 조회
contentRouter.get(routes.contentDetail, contentController.getContent);

//콘텐츠 수정(관리자 전용)
contentRouter.put(routes.contentDetail, checkToken, contentController.putContent);

//콘텐츠 삭제(관리자 전용)
contentRouter.delete(routes.contentDetail, checkToken, contentController.deleteContent);


module.exports = contentRouter;