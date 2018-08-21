# Sheets

## Start

TODO: Es muss noch ein übergeordneten Befehl geben, um beide Instanzen zu starten.
(Am besten über npm)


# Database

## Rolle:

Rolle kann in Userdatenbank oder in eigener Rollentabelle

-> Rollentabelle, die erweitert werden könnte (Berechtigungen)

| Roles      |
| ------------- |
| ID     |
| Name      |

## User

| User (Admin/Tutor)      |
| ------------- |
| ID     |
| Name      |
| CourseIDs      |
| RoleID      |

## Course

| Course      |
| ------------- |
| ID     |
| Name     |
| Title |
| Semester |
| NeededSheets |
| SheetIDs |

## Student

| Student     |
| ------------- |
| ID     |
| Name      |
| Matrikelnummer |

## Sheet

| Sheet     |
| ------------- |
| ID     |
| Name |
| Order |
| NecesseryPoints |
| SubmissionDate |
| ExerciseIDs     |
| SubmissionIDs |

## Exercise

| Exercise     |
| ------------- |
| ID     |
| Name  |
| Description |
| Order |
| TaskIDs |

## Task

Could need pictures. Optional!

| Task     |
| ------------- |
| ID     |
| Order |
| Question |
| Choices (if needed) |
| Points |
| SolutionID |

## Solution

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


## Submission

| Submission     |
| ------------- |
| ID     |
| Name      |
| StudentID     |
| UserID |
| AnswerIDs |

## Answer

| Answer     |
| ------------- |
| ID     |
| AchievedPoints |
| TaskID |
| Feedback |
| HelpFlag |
| CheckFlag |
| Auto_CorrectionFlag|

