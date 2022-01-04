//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER_SIGNUP = '/users';
const USER_SIGNIN = '/token';

// Content
const CONTENT = '/contents';
const CONTENT_DETAIL = '/:contentId';

const routes = {
  root: ROOT,
  user: USER_SIGNUP,
  token: USER_SIGNIN,
  content: CONTENT,
  contentDetail: CONTENT_DETAIL,
}

module.exports = routes;



