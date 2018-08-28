# Server Implementation

## API

| address  | method  | params  | body  | success | fail |
|---|---|---|---|---|---|
| /auth/register  | POST  | | username, password  |  { auth: true, token: token } | 500, 404 |
| /auth/login  | POST  | |username, password  | { auth: true, token: token }  | 500, 404, 401  |
| /auth/logout  | GET  | |  |  { auth: false, token: null }  |   |
| /correct  | POST  | | {Submission} with id  | new {Submission}  |  400 |

TODO: Paste API for better overview.

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

## Test Strings:
´´´
{
	"name": "EIMI",
	"faculty": "MI",
	"semester": "SoSe 2018",
	"min_req_sheets": 3,
	"sheets": [
		{
		"name": "Exercise Sheet",
		"submissiondate": "2016-05-18 10:00:00.000",
		"min_req_points": 10,
		"submissions": [
			{
				"student": {
					"name": "Bernd",
					"mat_nr": 1234567
				},
				"answers": [
					{
						"text": "text",
						"task": {
							"question": "a task",
        					"points": 10,
        					"order": 1,
        					"choices": "no",
					        "solution": {
					            "type": "none",
					            "number": 3
					        }
						}
					}
				]
			}
			]
	}
	]
}
´´´