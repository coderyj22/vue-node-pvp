module.exports = app => {
  const express = require('express');
  const jwt = require('jsonwebtoken');
  const User = require('../../models/AdminUser');
  const assert = require('http-assert');
  const router = express.Router({
    mergeParams: true,
  });

  const authMiddleware = require('../../middleware/auth')()
  const resourceMiddleware = require('../../middleware/resource')()

  // const Category = require('../../models/Category');
  router.post('/', authMiddleware, async (req, res) => {
    // if (!req.body.name) {
    //   return res.status(400).send({ code: 1, message: '请传入有效的参数' });
    // }
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  router.put('/', async (req, res) => {
    // if (!req.query.name) {
    //   return res.status(400).send({ code: 1, message: '请传入有效的参数' });
    // }
    const model = await req.Model.findByIdAndUpdate(req.body._id, req.body);
    res.send(model);
  });
  router.get('/', authMiddleware, async (req, res) => {
    if (req.query.id) {
      const model = await req.Model.findById(req.query.id);
      return res.send(model);
    }
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent';
    }
    const model = await req.Model.find().setOptions(queryOptions).limit(10);
    res.send(model);
  });

  router.delete('/:id', authMiddleware, async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  });

  app.use('/admin/api/rest/:resource', resourceMiddleware, router);

  // 上传文件
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '/../../uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  });

  const upload = multer({ storage });

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    file.url = `http://localhost:3000/uploads/${file.filename}`;

    res.send(file);
  });

  app.post('/admin/api/login', async (req, res, next) => {
    const { username, password } = req.body;
    // 1. 根据用户名找用户
    const user = await User.findOne({ username }).select('+password');
    // if (!user) {
    //   return res.status(422).send({ message: '用户或密码错误!' });
    // }
    // try{
    //   assert(user,422,'用户名或密码错误!')
    // }catch(err){
    //   next(err)
    // }
    assert(user, 401, '用户名或密码错误!');
    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    // if (!isValid) {
    //   return res.status(422).send({ message: '用户名或密码错误!' });
    // }
    assert(isValid, 422, '用户名或密码错误!');
    // try{
    //   assert(isValid,422,'用户名或密码错误!')
    // }catch(err){
    //   next(err)
    // }
    // 3. 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    res.send({ token });
  });

  // 错误处理函数
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message || '未知错误',
    });
  });
};
