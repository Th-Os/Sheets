# Sheets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.5.

## Development server

start mongodb

nodemon server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


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
| SubmissionIDs |

## Course
| Course      |
| ------------- |
| ID     |
| Name     |
| Title |
| Semester |
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
| Title |
| Number |
| SubmissionDate |
| ExerciseIDs     |
| SubmissionIDs |

## Exercise

| Exercise     |
| ------------- |
| ID     |
| Name      |
| Type |
| Solution |

## Submission

| Submission     |
| ------------- |
| ID     |
| Name      |
| StudentID     |

