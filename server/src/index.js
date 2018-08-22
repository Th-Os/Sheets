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

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bp.json());
app.use(bp.urlencoded({
    'extended': 'false'
}));

app.route('/')
    .get(function(req, res) {
        console.log(req);
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

app.listen(port);
console.log('server is running at localhost:' + port);

// connecting to database.
db.connect();

export default app;