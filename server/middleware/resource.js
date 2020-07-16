module.exports = options => {
  return async (req, res, next) => {
    if (!req.file) {
      const modelName = require('inflection').classify(req.params.resource); // 模型名称
      req.Model = require(`../models/${modelName}`);
    }
    next();
  }
}
