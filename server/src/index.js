import bp from 'body-parser';
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
app.use(bp.json());
app.use(bp.urlencoded({'extended': 'false'}));

app.route('/')
  .get(function (req, res) {
    console.log(req);
    res.send('hello');
  })
  .post(function (req, res) {
    console.log(req);
    res.send('bla');
  });

app.listen(port);
console.log('server is running at localhost:' + port);

export default app;
