module.exports = app => {
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '/../../uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  });

  const upload = multer({storage})

  const router = require('express').Router()

  router.post('/upload',upload.single('file'),async(req,res) => {
    const file = req.file

    file.url = `http://localhost:3000/uploads/${file.filename}`

    res.send(file)
  })

  app.use('/admin/api/rest', router)
};
