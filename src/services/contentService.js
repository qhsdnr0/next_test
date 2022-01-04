const models = require('../models');
const logger = require('../utils/logger');

/**
 * 콘텐츠 생성
 * @param {String} title
 * @param {String} description
 * @param {Integer} price
 * @param {Integer} view
 * @param {Integer} like
 * @param {Boolean} isActive
 * @param {Date} createdAt
 * @returns {Object} 
 */
exports.createContent = async (category, name, description) => {
  try {
    const newContent = await models.content.create({
      category,
      name,
      description,
    });
    return newContent;
  } catch (err) {
    throw err;
  }
};

/**
 * 콘텐츠 세부 정보 가져오기
 * @param {Integer} contentId
 * @returns {Object} 
 */
exports.readContent = async contentId => {
  try {
    const readContent = await models.content.findByPk(contentId);
    return readContent;
  } catch (err) {
    throw err;
  }
};

/**
 * 콘텐츠 업데이트
 * @param {Integer} contentId
 * @param {String} title
 * @param {String} description
 * @param {Integer} price
 * @param {Integer} view
 * @param {Integer} like
 * @param {Boolean} isActive
 * @returns {Array<Integer>}
 */
exports.updateContent = async (contentId, title, description, price, view, like, isActive) => {
  try {
    const updatedContent = await models.content.update(
      {
        title,
        description,
        price,
        view,
        like,
        isActive,
      },
      {
        where: { id: contentId },
      },
    );
    return updatedContent;
  } catch (err) {
    throw err;
  }
};

/**
 * 콘텐츠 삭제
 * @param {Integer} contentId
 * @returns {Integer} 
 */
exports.deleteContent = async contentId => {
  try {
    const deletedContent = await models.content.destroy({
      where: { id: contentId },
    });
    return deletedContent;
  } catch (err) {
    throw err;
  }
};

/**
 * 전체 콘텐츠 조회(페이지네이션 포함)
 * @param {Integer} offset
 * @param {Integer} limit
 * @returns {Array<Object>}
 */
exports.readContentList = async (offset, limit) => {
  try {
    const contentList = await models.content.findAll({
      offset: offset,
      limit: limit,
    });
    
    return contentList;
  } catch (err) {
    throw err;
  }
};
