const Content = require('../models').content;
const logger = require('../utils/logger');

exports.createContent = async (
    title, 
    description, 
    price,
    view,
    like,
    isActive,
    userId
    ) => {
    try {
        const newContent = await Content.create({
            title: title, 
            description: description, 
            price: price,
            view: view,
            like: like,
            isActive: isActive,
            user_id: userId
        });
        return newContent;
    } catch (err) {
        throw err;
    }
};


exports.readContent = async contentId => {
  try {
    const readContent = await Content.findByPk(contentId);
    return readContent;
  } catch (err) {
    throw err;
  }
};

exports.updateContent = async (contentId, title, description, price, view, like, isActive) => {
  try {
    const updatedContent = await Content.update(
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

exports.deleteContent = async contentId => {
  try {
    const deletedContent = await Content.destroy({
      where: { id: contentId },
    });
    return deletedContent;
  } catch (err) {
    throw err;
  }
};

exports.readContentList = async (offset, limit, isActive) => {
    try {
        const contentList = await Content.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', 'DESC']],
            where: {
                isActive: isActive
            }
        });
    
        return contentList;
    } catch (err) {
        throw err;
    }
};
