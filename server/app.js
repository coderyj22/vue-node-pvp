const express = require('express');

const app = express();

const bodyParse = require('body-parser');

app.set('secret', 'abhfk23sd1');

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(require('cors')());

require('./routes/admin/index')(app);
require('./plugins/db')(app);
require('./routes/web/index')(app)

app.listen(3000, () => {
  console.log('server is running for 3000...');
});
