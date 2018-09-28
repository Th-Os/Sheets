import bp from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import * as db from './database/db';
import auth from './auth/auth';
import correction from './correction/correction';
import exp from './routes/export';
import answers from './routes/answers';
import courses from './routes/courses';
import exercises from './routes/exercises';
import sheets from './routes/sheets';
import solutions from './routes/solutions';
import students from './routes/students';
import submissions from './routes/submissions';
import tasks from './routes/tasks';
import users from './routes/users';
import log from './utils/log';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bp.json({limit: '50mb', extended: true}));
app.use(bp.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.route('/')
    .get(function(req, res) {
        res.send('Sheets API');
    });

app.use('/auth', auth);
app.use('/correct', correction);

app.use('/export', exp);
app.use('/answers', answers);
app.use('/courses', courses);
app.use('/exercises', exercises);
app.use('/sheets', sheets);
app.use('/solutions', solutions);
app.use('/students', students);
app.use('/submissions', submissions);
app.use('/tasks', tasks);
app.use('/users', users);

// connecting to database and starting server.
db.connect().then(() => {
    app.listen(port);
    let msg = 'server is running at localhost:' + port;
    console.log(msg);
    log.info(msg);
});

export default app;