import bp from 'body-parser';
import express from 'express';
import answers from './routes/answers';
import courses from './routes/courses';
import exercises from './routes/exercises';
import sheets from './routes/sheets';
import solutions from './routes/solutions';
import students from './routes/students';
import submissions from './routes/submissions';
import tasks from './routes/tasks';
import users from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

// require('./database/db');

app.use(bp.json());
app.use(bp.urlencoded({
    'extended': 'false'
}));

app.route('/')
    .get(function (req, res) {
        console.log(req);
        res.send('hello');
    })
    .post(function (req, res) {
        console.log(req);
        res.send('bla');
    });

app.route('/login')
    .get(function (req, res) {
        console.log(req);
        res.send('hello login');
    })
    .post(function (req, res) {
        console.log(req);
        res.send('bla');
    });

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

export default app;