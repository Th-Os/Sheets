# Server Implementation

## API

| address  | method  | params  | body  | success | fail |
|---|---|---|---|---|---|
| /auth/register  | POST  | | username, password  |  { auth: true, token: token } | 500, 404 |
| /auth/login  | POST  | |username, password  | { auth: true, token: token }  | 500, 404, 401  |
| /auth/logout  | GET  | |  |  { auth: false, token: null }  |   |
| /correct  | POST  | | {Submission} with id  | new {Submission}  |  400 |
|/courses		|GET	|	|	|200, [Courses]	|401, 404, 400	|
|/courses		|POST	|	|{Courses}	|200, {Courses}	|400, 401, 404	|
|/courses/:id		|PUT	|	|:id, {Courses}	|200, {Courses}	|400, 401, 404	|
|/courses/:id		|DELETE	|	|:id	|200	|403, 404	|
|/courses/:id/students		|GET	|	|:id	|200, [Students]	|400, 401, 404	|
|**Sheets**		|	|	|	|	|	|
|/courses/:id/sheets		|GET	|	|:id	|200, [Sheets]	|400, 401, 404	|
|/courses/:id/sheets		|POST	|	|:id, {Sheets}	|200, {Sheets}	|400, 401, 404	|
|/sheets/:id		|DELETE	|	|:id	|200	|403, 404	|
|/sheets/:id		|PUT	|	|:id, {Sheets}	|200, {Sheets}	|400, 401, 404	|
|/sheets/:id/exercises		|GET	|	|:id	|200, {Exercises}	|400, 401, 404	|
|**Exercises**		|	|	|	|	|	|
|/sheets/:id/exercises		|POST	|	|:id, {Exercises}	|200, {Exercises}	|400, 401, 404	|
|/exercises/:id		|PUT	|	|:id, {Exercises}	|200, {Exercises}	|400, 401, 404	|
|/exercises/:id		|DELETE	|	|:id	|200	|403, 404	|
|**Tasks**		|	|	|	|	|	|
|/exercises/:id/tasks		|GET	|	|:id	|200, [Tasks]	|400, 401, 404	|
|/exercises/:id/tasks		|POST	|	|:id, {Tasks}	|200, {Tasks}	|400, 401, 404	|
|/tasks/:id		|PUT	|	|:id, {Tasks}	|200, {Tasks}	|400, 401, 404	|
|/tasks/:id		|DELETE	|	|:id	|200	|403, 404	|
|**Solutions**		|	|	|	|	|	|
|/tasks/:id/solutions		|GET	|	|:id	|200, [Solutions]	|400, 401, 404	|
|/tasks/:id/solutions		|POST	|	|:id, {Solutions}	|200, {Solutions}	|400, 401, 404	|
|/solutions/:id		|PUT	|	|:id, {Solutions}	|200, {Solutions}	|400, 401, 404	|
|/solutions/:id		|DELETE	|	|:id	|200	|403, 404	|
|**Submissions**		|	|	|	|	|	|
|/sheets/:id/submissions		|POST	|	|:id, {Submissions}	|200, {Submissions}	|400, 401, 404	|
|/sheets/:id/submissions		|GET	|	|:id	|200, [Submissions]	|400, 401, 404	|
|/sheets/:id/submissions		|DELETE	|	|:id	|200	|403, 404	|
|**Answers**		|	|	|	|	|	|
|/submissions/:id/answers		|GET	|	|:id	|200, [Answers]	|400, 401, 404	|
|/answers/:id		|PUT	|	|:id, {Answers}	|200, {Answers}	|400, 401, 404	|
|**Users**		|	|	|	|	|	|
|/users		|GET	|	|	|200, [Users]	|400, 401, 404	|
|/users		|POST	|	|{Users}	|200, {Users}	|400, 401, 404	|
|/users/:id		|PUT	|	|:id, {Users}	|200, {Users}	|400, 401, 404	|
|/users/:id		|DELETE	|	|:id	|200	|403, 404	|
|**Students**		|	|	|	|	|	|
|/students/:id		|GET	|	|:id	|200, {Students}	|400, 401, 404	|
|/students/:id		|POST	|	|:id, {Students}	|200, {Students}	|400, 401, 404	|
|/students/:id		|PUT	|	|:id, {Students}	|200, {Students}	|400, 401, 404	|
|/students/:id		|DELETE	|	|:id	|200	|403, 404	|
|/students/:id/submissions		|GET	|	|:id	|200, [Submissions]	|400, 401, 404	|
|/students/:id/courses		|GET	|	|:id	|200, [Courses]	|400, 401, 404	|
|**Misc**		|	|	|	|	|	|
|/sheets/:id/export		|GET	|	|:id	|200, (Word,PDF)	|400, 401, 404	|
|/sheets/:id/csv		|GET	|	|:id	|200, csv	|400, 401, 404	|
|/sheets/:id/template		|GET	|	|:id	|200, template	|400, 401, 404	|



## Database

### Rolle:

Rolle kann in Userdatenbank oder in eigener Rollentabelle

-> Rollentabelle, die erweitert werden könnte (Berechtigungen)

| Roles      |
| ------------- |
| ID     |
| Name      |

### User

| User (Admin/Tutor)      |
| ------------- |
| ID     |
| Name      |
| CourseIDs      |
| RoleID      |

### Course

| Course      |
| ------------- |
| ID     |
| Name     |
| Title |
| Semester |
| NeededSheets |
| SheetIDs |

### Student

| Student     |
| ------------- |
| ID     |
| Name      |
| Matrikelnummer |

### Sheet

| Sheet     |
| ------------- |
| ID     |
| Name |
| Order |
| NecesseryPoints |
| SubmissionDate |
| ExerciseIDs     |
| SubmissionIDs |

### Exercise

| Exercise     |
| ------------- |
| ID     |
| Name  |
| Description |
| Order |
| TaskIDs |

### Task

Could need pictures. Optional!

| Task     |
| ------------- |
| ID     |
| Order |
| Question |
| Choices (if needed) |
| Points |
| SolutionID |

### Solution

-  | Number (with possibility for ranges) | Optional range
-  | Default |
- none = no automatic correction

| Solution     |
| ------------- |
| ID     |
| Type (regex, range, number or none) |
| Regex |
| Range |
| Number |
| Hint |


### Submission

| Submission     |
| ------------- |
| ID     |
| Name      |
| StudentID     |
| UserID |
| AnswerIDs |

### Answer

| Answer     |
| ------------- |
| ID     |
| AchievedPoints |
| TaskID |
| Feedback |
| HelpFlag |
| CheckFlag |
| Auto_CorrectionFlag|
