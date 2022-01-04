const { resFormatter, logger } = require('../utils');
const { statusCode, responseMessage } = require('../globals');

const contentService = require('../services/contentService.js');

const { ValidationError, NotMatchedPostError, UnAuthorizedError, NotNumberError } = require('../utils/errors/contentError');


//콘텐츠 추가
exports.postContent = async (req, res, next) => {
  try {
    const isAdmin = req.decoded.isAdmin;
    const { category, name, description } = req.body;

    //관리자가 아니면 에러처리 UNAUTHORIZED: 401
    if (!isAdmin) throw new UnAuthorizedError();

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (category === undefined || name === undefined || description === undefined) throw new ValidationError()

    //쿼리실행
    let content = await contentService.createContent(category, name, description);

    //Respons Code : 201
    return res.status(statusCode.CREATED)
      .send(resFormatter.success(responseMessage.CREATE_CONTENT_SUCCESS, { id: content.id }));

  } catch (err) {
    next(err);
  }
}


//콘텐츠 조회
exports.getContent = async (req, res, next) => {
  try {
    const contentId = Number(req.params.contentId);

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (isNaN(contentId)) throw new ValidationError();

    //쿼리 실행
    const content = await contentService.readContent(contentId);

    //DB에 없으면 에러처리 
    if (content === null) throw new NotMatchedPostError();

    //Response Code : 200 
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_CONTENT_SUCCESS, content));
  } catch (err) {
    next(err);
  }
}


//콘텐츠 수정
exports.putContent = async (req, res, next) => {
  try {
    const isAdmin = req.decoded.isAdmin
    const contentId = Number(req.params.contentId);
    const { category, name, description, isSold, badge } = req.body;

    //관리자가 아니면 에러처리 UNAUTHORIZED: 401
    if (!isAdmin) throw new UnAuthorizedError();

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if ((category === undefined && name === undefined && description === undefined &&
      isSold === undefined && badge === undefined) || isNaN(contentId)) {
      throw new ValidationError();
    }

    //쿼리 실행
    let result = await contentService.updateContent(contentId, category, name, description, isSold, badge);

    //DB에 없으면 에러처리 
    if (!result[0]) throw new NotMatchedPostError()

    //Response 200 OK
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.UPDATE_CONTENT_SUCCESS));
  } catch (err) {
    next(err);
  }
}


//콘텐츠 삭제
exports.deleteContent = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    const isAdmin = req.decoded.isAdmin;
    const contentId = Number(req.params.contentId);

    //관리자가 아니면 에러처리 UNAUTHORIZED: 401
    if (!isAdmin) throw new UnAuthorizedError();

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (isNaN(contentId)) throw new ValidationError()

    //쿼리 실행
    let result = await contentService.deleteContent(contentId);

    //DB에 없으면 에러처리 
    if (!result) throw new NotMatchedPostError()

    //Response 200 OK
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.DELETE_CONTENT_SUCCESS));
  } catch (err) {
    next(err);
  }
}


//전체 콘텐츠 조회(페이지네이션 필요)
exports.getContentList = async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const limit = 5;

    //입력값 없으면 에러처리 NULL_VALUE : 400
    if (isNaN(page)) throw new ValidationError()

    //쿼리 실행
    const contentList = await contentService.readContentList(page, limit);

    //Response 200 OK
    return res.status(statusCode.OK)
      .send(resFormatter.success(responseMessage.READ_CONTENT_SUCCESS, contentList));
  } catch (err) {
    next(err);
  }
}
