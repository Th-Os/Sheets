# Server

The server can be controlled by npm commands. These are:

```bash
# Installing dependencies (Necessary before start)
npm install
```

```bash
# Starting server
npm start
```

```bash
# Starting tests
npm test
```

## Settings / Resources (Path: resources)

### settings.json

This JSON file holds parameters for the database, the logging and csv export.
All keys are explained by a equally named ```_comment``` object.

### template.html

This HTML file is used as a template for the PDF and DOCX export.
Changing the text or handlebar functions will result in a different output.

## API

All API calls possible.

| address  | method  | params  | body  | success | fail |
|---|---|---|---|---|---|
|**Authentication** |
|/auth/login  | POST  | |username, password  | 200, { user: userID, auth: true, token: token }  | 401, 404, 500  |
|/auth/logout  | GET  | |  |  { auth: false, token: null }  |   |
|**Correction**|
|/correct/:id  | GET  | ID of {Submission}  | | corrected {Submission}  |  400, 500 |
|**Courses**|
|/students/:id/courses		|GET	|	ID of {Student} |	|200, [Courses]	|400, 401, 404	|
|/courses		|GET	|	|	|200, [Courses]	| 401, 404, 400	|
|/courses	|POST	|	|{Courses}	|201, {Courses}	|400, 401, 404	|
|/courses/:id		|GET	|	ID of {Course}|	|200, {Courses}	|401, 404, 400	|
|/courses/:id		|PUT	|	ID of {Course} | {Courses}	|200, {Courses}	|400, 401, 404	|
|/courses/:id		|DELETE	| ID of {Course} 	| |200	|403, 404	|
|/courses/_search?sheet={SheetID}	|GET	|	|	|200, [Courses]	| 401, 404, 400	|
|**Sheets**		|
|/courses/:id/sheets		|GET	| ID of {Course} 	|	|200, [Sheets]	|400, 401, 404	|
|/courses/:id/sheets		|POST	| ID of {Course} 	| {Sheets}	|201, {Sheets}	|400, 401, 404	|
|/sheets/:id		|GET	|	ID of {Sheet} 	|	|200, {Sheet}	|401, 404, 400	|
|/sheets/:id		|DELETE	| ID of {Sheet} 	|	|200	|403, 404	|
|/sheets/:id		|PUT	|	ID of {Sheet}  | {Sheet}	|200, {Sheets}	|400, 401, 404	|
|/sheets/:id/_aggregate		|GET	|	ID of {Sheet} 	|	|200, {fully populated Sheet}	|500	|
|**Exercises**		|
|/sheets/:id/exercises		|GET	|	ID of {Sheet} |	|200, [Exercises]	|400, 401, 404	|
|/sheets/:id/exercises		|POST	| ID of {Sheet} 	| {Exercises}	|201, {Exercises}	|400, 401, 404	|
|/sheets/:id/exercises		|DELETE	|	ID of {Sheet} |	|200 |400, 401, 404	|
|/exercises/:id		|PUT	| ID of {Exercise} 	| {Exercise}	|200, {Exercise}	|400, 401, 404	|
|/exercises/:id		|DELETE	| ID of {Exercise} 	|	|200	|400, 404	|
|/exercises/:id/_aggregate		|GET	| ID of {Exercise} 	| |200, {Exercise} with tasks and a solution	|400, 401, 404	|
|**Tasks**		|
|/exercises/:id/tasks		|GET	| ID of {Exercise} 	|	|200, [Tasks]	|400, 401, 404	|
|/exercises/:id/tasks		|POST	| ID of {Exercise} 	| {Tasks}	|201, {Tasks}	|400, 401, 404	|
|/tasks/:id		|PUT	| ID of {Task} 	| {Task}	|200, {Task}	|400, 401, 404	|
|/tasks/:id		|DELETE	|	ID of {Task} 	|	|200	|400, 404	|
|/tasks/:id/_aggregate		|GET	| ID of {Task} 	| {Task} with solution	|200, {Task}	|400, 401, 404	|
|**Solutions**		|
|/tasks/:id/solutions		|GET	|	ID of {Task} 	|	|200, [Solutions]	|400, 401, 404	|
|/tasks/:id/solutions		|POST	|	ID of {Task} 	| {Solutions}	|201, {Solutions}	|400, 401, 404	|
|/solutions/:id		|PUT	| ID of {Solution} 		|:id, {Solution}	|200, {Solution}	|400, 401, 404	|
|/solutions/:id		|DELETE	|	ID of {Solution} 	|	|200	|403, 404	|
|**Submissions**		|
|/sheets/:id/submissions		|POST	| ID of {Submission}	| {Submissions}	|201, {Submissions}	|400, 401, 404	|
|/sheets/:id/submissions		|GET	|	ID of {Submission}|	|200, [Submissions]	|400, 401, 404	|
|/sheets/:id/submissions		|DELETE	|	ID of {Submission} |	|200	|400, 401, 404	|
|/sheets/:id/submissions/_bulk		|POST|	ID of {Submission} | array with submissions + answers (with task: taskIds) and student |201, [Submissions]	|400, 401, 404	|
|/students/:id/submissions		|GET	|	ID of {Student} ||200, [Submissions]	|400, 401, 404	|
|/submissions/:id/		|PUT	| ID of {Submission}	| {Submission} |200, {Submission}	|400, 401, 404	|
|/submissions/_search?user={UserID}		|GET	| | 	|200, [Answers]	|400, 401, 404	|
|**Answers**		|
|/submissions/:id/answers		|GET	| ID of {Submission}	| |200, [Answers]	|400, 401, 404	|
|/submissions/:id/answers		|POST	| ID of {Submission}	| {Answers} |200, [Answers]	|400, 401, 404	|
|/answers/:id		|GET	| ID of {Answer}	|:id	|200, {Answer}	|400, 401, 404	|
|/submissions/:id/answers/_search?task={TaskID}		|GET	| ID of {Submission}	| answers with taskId	|200, [Answers]	|400, 401, 404	|
|**Users**		|
|/users		|GET	|	|	|200, [Users]	|400, 401, 404	|
|/users		|POST	|	|{Users}	|201, {Users with {Role}} - Roles can be objects	|400, 401, 404	|
|/users/:id		|GET	|	ID of {User} | 	|200, {User}	|400, 401, 404	|
|/users/:id		|PUT	|	ID of {User} | {User}	|200, {User}	|400, 401, 404	|
|/users/:id		|DELETE	|	ID of {User} |	|200	|403, 404	|
| **Roles** |
|/users/roles		|GET	|	|	|200, [Roles]	| |
|/users/roles/:id		|GET	| ID of {Role}	|	|200, {Role}	| |
|**Students**		|
|/courses/:id/students		|GET	| ID of {Course} 	|	|200, [Students]	|400, 401, 404	|
|/students/:id		|GET	| ID of {Student} 	|:id	|200, {Student}	|400, 401, 404	|
|/students/		|POST	| | {Students}	|201, {Students}	|400, 401, 404	|
|/students/:id		|PUT	| ID of {Student} | {Students}	|200, {Students}	|400, 401, 404	|
|/students/:id		|DELETE	|	ID of {Student} | |200	|403, 404	|
|/students/_search?matnr={Matriculation Number}		|GET	| |	|200, {Student}	|400, 401, 404	|
|**Export**		|
|/sheets/:id/pdf		|GET	|	|:id	|200, (PDF)	|400, 401, 404	|
|/sheets/:id/docx		|GET	|	|:id	|200, (DOCX)	|400, 401, 404	|
|/sheets/:id/csv		|GET	|	|:id	|200, {CSV}	|400, 401, 404	|
|/sheets/:id/template		|GET	|	|:id	|200, {TXT}	|400, 401, 404	|



## Database

All implemented database models.

### Role:

A role that can be used for further functionality by user level.

-> enum 'admin', 'lecturer', 'tutor'

| Roles      |
| ------------- |
| ID     |
| Name      |

### User

| User      |
| ------------- |
| ID     |
| Username      |
| Password      |
| Forename      |
| Lastname      |
| Email |
| Course IDs      |
| Role ID      |

### Course

| Course      |
| ------------- |
| ID     |
| Name     |
| Institute |
| Semester |
| Minimum Required Sheets |
| Sheet IDs |

### Student

| Student     |
| ------------- |
| ID     |
| Name      |
| Lastname
| Matriculation Number |

### Sheet

A sheet can now be persistent -> won't be deleted, when a course (parent) is deleted.

| Sheet     |
| ------------- |
| ID     |
| Name |
| Order |
| Minimum Required Points |
| Submission Date |
| Exercise IDs     |
| Submission IDs |
| Persistent Flag |
| Template {Flag, Correctly, Points} |

An excercise can now be persistent -> won't be deleted, when a sheet (parent) is deleted.

### Exercise

| Exercise     |
| ------------- |
| ID     |
| Name  |
| Description |
| Order |
| Task IDs |
| Persistent Flag |

### Task

Choices are hints for a task.

| Task     |
| ------------- |
| ID     |
| Order |
| Question |
| Choices |
| Points |
| Solution ID |

### Solution

-  | Number (with possibility for ranges) | Optional range
-  | Default |
- none = no automatic correction
- Hint: is a information for the correction
- DefaultFreeText is an boolean flag, which indicates whether a freetext answer will result in all (true) or no (false) points.

| Solution     |
| ------------- |
| ID     |
| Type (regex, range, number, freetext or none) |
| Regex |
| Range (from, to) |
| Number |
| Hint |
| Default Free Text Flag |


### Submission

| Submission     |
| ------------- |
| ID     |
| Student ID     |
| Answer IDs |
| User ID |
| Grips ID |

### Answer

| Answer     |
| ------------- |
| ID     |
| Text |
| Achieved Points |
| Task ID |
| Feedback |
| Help Flag |
| Corrected Flag |
| AutoCorrected Flag|
