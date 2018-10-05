## Modules

<dl>
<dt><a href="#module_API/authentication">API/authentication</a></dt>
<dd></dd>
<dt><a href="#module_API/verification">API/verification</a></dt>
<dd></dd>
<dt><a href="#module_API/correction">API/correction</a></dt>
<dd></dd>
<dt><a href="#module_database">database</a></dt>
<dd></dd>
<dt><a href="#module_models/course">models/course</a></dt>
<dd></dd>
<dt><a href="#module_models/sheet">models/sheet</a></dt>
<dd></dd>
<dt><a href="#module_models/submission">models/submission</a></dt>
<dd></dd>
<dt><a href="#module_models/user">models/user</a></dt>
<dd></dd>
<dt><a href="#module_API/answers">API/answers</a></dt>
<dd></dd>
<dt><a href="#module_API/courses">API/courses</a></dt>
<dd></dd>
<dt><a href="#module_API/exercises">API/exercises</a></dt>
<dd></dd>
<dt><a href="#module_API/export">API/export</a></dt>
<dd></dd>
<dt><a href="#module_API/sheets">API/sheets</a></dt>
<dd></dd>
<dt><a href="#module_API/solutions">API/solutions</a></dt>
<dd></dd>
<dt><a href="#module_API/students">API/students</a></dt>
<dd></dd>
<dt><a href="#module_API/submissions">API/submissions</a></dt>
<dd></dd>
<dt><a href="#module_API/tasks">API/tasks</a></dt>
<dd></dd>
<dt><a href="#module_API/users">API/users</a></dt>
<dd></dd>
<dt><a href="#module_utils/errors">utils/errors</a></dt>
<dd><p>Errors</p></dd>
<dt><a href="#module_utils/logging">utils/logging</a></dt>
<dd><p>Logging</p></dd>
<dt><a href="#module_utils/methods">utils/methods</a></dt>
<dd><p>Methods</p></dd>
<dt><a href="#module_API/authentication">API/authentication</a></dt>
<dd></dd>
<dt><a href="#module_API/verification">API/verification</a></dt>
<dd></dd>
<dt><a href="#module_API/correction">API/correction</a></dt>
<dd></dd>
<dt><a href="#module_database">database</a></dt>
<dd></dd>
<dt><a href="#module_models/course">models/course</a></dt>
<dd></dd>
<dt><a href="#module_models/sheet">models/sheet</a></dt>
<dd></dd>
<dt><a href="#module_models/submission">models/submission</a></dt>
<dd></dd>
<dt><a href="#module_models/user">models/user</a></dt>
<dd></dd>
<dt><a href="#module_utils/errors">utils/errors</a></dt>
<dd><p>Errors</p></dd>
<dt><a href="#module_utils/logging">utils/logging</a></dt>
<dd><p>Logging</p></dd>
<dt><a href="#module_utils/methods">utils/methods</a></dt>
<dd><p>Methods</p></dd>
<dt><a href="#module_API/answers">API/answers</a></dt>
<dd></dd>
<dt><a href="#module_API/courses">API/courses</a></dt>
<dd></dd>
<dt><a href="#module_API/exercises">API/exercises</a></dt>
<dd></dd>
<dt><a href="#module_API/export">API/export</a></dt>
<dd></dd>
<dt><a href="#module_API/sheets">API/sheets</a></dt>
<dd></dd>
<dt><a href="#module_API/solutions">API/solutions</a></dt>
<dd></dd>
<dt><a href="#module_API/students">API/students</a></dt>
<dd></dd>
<dt><a href="#module_API/submissions">API/submissions</a></dt>
<dd></dd>
<dt><a href="#module_API/tasks">API/tasks</a></dt>
<dd></dd>
<dt><a href="#module_API/users">API/users</a></dt>
<dd></dd>
</dl>

<a name="module_API/authentication"></a>

## API/authentication

* [API/authentication](#module_API/authentication)
    * [.POST|auth/login()](#module_API/authentication.POST|auth/login)
    * [.GET|auth/logout()](#module_API/authentication.GET|auth/logout)
    * [.POST|auth/login()](#module_API/authentication.POST|auth/login)
    * [.GET|auth/logout()](#module_API/authentication.GET|auth/logout)

<a name="module_API/authentication.POST|auth/login"></a>

### API/authentication.POST|auth/login()
<p>Login route that generates a token for the client.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  

| Param | Description |
| --- | --- |
| req.body.username | <p>the username of the user.</p> |
| req.body.password | <p>the password of the user.</p> |

<a name="module_API/authentication.GET|auth/logout"></a>

### API/authentication.GET|auth/logout()
<p>Logout route.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  
<a name="module_API/authentication.POST|auth/login"></a>

### API/authentication.POST|auth/login()
<p>Login route that generates a token for the client.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  

| Param | Description |
| --- | --- |
| req.body.username | <p>the username of the user.</p> |
| req.body.password | <p>the password of the user.</p> |

<a name="module_API/authentication.GET|auth/logout"></a>

### API/authentication.GET|auth/logout()
<p>Logout route.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  
<a name="module_API/verification"></a>

## API/verification

* [API/verification](#module_API/verification)
    * [~verify(req, res, next)](#module_API/verification..verify)
    * [~verify(req, res, next)](#module_API/verification..verify)

<a name="module_API/verification..verify"></a>

### API/verification~verify(req, res, next)
<p>This function will check whether the req.params.id is a mongoDB ObjectId
and verify the token of every request.</p>

**Kind**: inner method of [<code>API/verification</code>](#module_API/verification)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>express request object.</p> |
| res | <code>\*</code> | <p>express response object.</p> |
| next | <code>\*</code> | <p>express next function.</p> |

<a name="module_API/verification..verify"></a>

### API/verification~verify(req, res, next)
<p>This function will check whether the req.params.id is a mongoDB ObjectId
and verify the token of every request.</p>

**Kind**: inner method of [<code>API/verification</code>](#module_API/verification)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>express request object.</p> |
| res | <code>\*</code> | <p>express response object.</p> |
| next | <code>\*</code> | <p>express next function.</p> |

<a name="module_API/correction"></a>

## API/correction

* [API/correction](#module_API/correction)
    * _static_
        * [.GET|correct/:id()](#module_API/correction.GET|correct/_id) ⇒ <code>Submission</code>
        * [.GET|correct/:id()](#module_API/correction.GET|correct/_id) ⇒ <code>Submission</code>
    * _inner_
        * [~beginCorrection(answers)](#module_API/correction..beginCorrection) ⇒ <code>Promise</code>
        * [~checkAnswer(answer, solution, task)](#module_API/correction..checkAnswer) ⇒ <code>Array</code>
        * [~beginCorrection(answers)](#module_API/correction..beginCorrection) ⇒ <code>Promise</code>
        * [~checkAnswer(answer, solution, task)](#module_API/correction..checkAnswer) ⇒ <code>Array</code>

<a name="module_API/correction.GET|correct/_id"></a>

### API/correction.GET|correct/:id() ⇒ <code>Submission</code>
<p>Corrects a submission by id.</p>

**Kind**: static method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Submission</code> - <p>and depending on the correction an {Array} of {CorrectionError}.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/correction.GET|correct/_id"></a>

### API/correction.GET|correct/:id() ⇒ <code>Submission</code>
<p>Corrects a submission by id.</p>

**Kind**: static method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Submission</code> - <p>and depending on the correction an {Array} of {CorrectionError}.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/correction..beginCorrection"></a>

### API/correction~beginCorrection(answers) ⇒ <code>Promise</code>
<p>Starts the correction process with each answer.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Promise</code> - <p>Promise.</p>  

| Param | Type | Description |
| --- | --- | --- |
| answers | <code>Array</code> | <p>Array of {Answer}.</p> |

<a name="module_API/correction..checkAnswer"></a>

### API/correction~checkAnswer(answer, solution, task) ⇒ <code>Array</code>
<p>Validates each answer, saves new points and return the errors of this process.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Array</code> - <p>of {CorrectionError}</p>  

| Param | Type |
| --- | --- |
| answer | <code>Answer</code> | 
| solution | <code>Solution</code> | 
| task | <code>Task</code> | 

<a name="module_API/correction..beginCorrection"></a>

### API/correction~beginCorrection(answers) ⇒ <code>Promise</code>
<p>Starts the correction process with each answer.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Promise</code> - <p>Promise.</p>  

| Param | Type | Description |
| --- | --- | --- |
| answers | <code>Array</code> | <p>Array of {Answer}.</p> |

<a name="module_API/correction..checkAnswer"></a>

### API/correction~checkAnswer(answer, solution, task) ⇒ <code>Array</code>
<p>Validates each answer, saves new points and return the errors of this process.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Array</code> - <p>of {CorrectionError}</p>  

| Param | Type |
| --- | --- |
| answer | <code>Answer</code> | 
| solution | <code>Solution</code> | 
| task | <code>Task</code> | 

<a name="module_database"></a>

## database

* [database](#module_database)
    * [~connect()](#module_database..connect) ⇒ <code>Promise</code>
    * [~disconnect()](#module_database..disconnect) ⇒ <code>Promise</code>
    * [~connect()](#module_database..connect) ⇒ <code>Promise</code>
    * [~disconnect()](#module_database..disconnect) ⇒ <code>Promise</code>

<a name="module_database..connect"></a>

### database~connect() ⇒ <code>Promise</code>
<p>Connects to the database depending on the database settings.json variable MODE.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
**See**: settings.json  
<a name="module_database..disconnect"></a>

### database~disconnect() ⇒ <code>Promise</code>
<p>Disconnects from the database.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
<a name="module_database..connect"></a>

### database~connect() ⇒ <code>Promise</code>
<p>Connects to the database depending on the database settings.json variable MODE.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
**See**: settings.json  
<a name="module_database..disconnect"></a>

### database~disconnect() ⇒ <code>Promise</code>
<p>Disconnects from the database.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
<a name="module_models/course"></a>

## models/course

* [models/course](#module_models/course)
    * [~Schema: Course](#module_models/course..Schema_ Course)
    * [~Schema: Course](#module_models/course..Schema_ Course)

<a name="module_models/course..Schema_ Course"></a>

### models/course~Schema: Course
**Kind**: inner class of [<code>models/course</code>](#module_models/course)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| institute | <code>string</code> | <p>required</p> |
| semester | <code>string</code> | <p>required</p> |
| min_req_sheets | <code>string</code> | <p>required, Minimal amount of sheets to pass the course.</p> |
| sheets | <code>Array.&lt;Sheet&gt;</code> | <p>optional</p> |

<a name="module_models/course..Schema_ Course"></a>

### models/course~Schema: Course
**Kind**: inner class of [<code>models/course</code>](#module_models/course)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| institute | <code>string</code> | <p>required</p> |
| semester | <code>string</code> | <p>required</p> |
| min_req_sheets | <code>string</code> | <p>required, Minimal amount of sheets to pass the course.</p> |
| sheets | <code>Array.&lt;Sheet&gt;</code> | <p>optional</p> |

<a name="module_models/sheet"></a>

## models/sheet

* [models/sheet](#module_models/sheet)
    * [~Schema: Sheet](#module_models/sheet..Schema_ Sheet)
    * [~Schema: Exercise](#module_models/sheet..Schema_ Exercise)
    * [~Schema: Task](#module_models/sheet..Schema_ Task)
    * [~Schema: Solution](#module_models/sheet..Schema_ Solution)
    * [~Schema: Sheet](#module_models/sheet..Schema_ Sheet)
    * [~Schema: Exercise](#module_models/sheet..Schema_ Exercise)
    * [~Schema: Task](#module_models/sheet..Schema_ Task)
    * [~Schema: Solution](#module_models/sheet..Schema_ Solution)

<a name="module_models/sheet..Schema_ Sheet"></a>

### models/sheet~Schema: Sheet
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| submissions | <code>Array.&lt;Submission&gt;</code> | <p>optional</p> |
| submissiondate | <code>Date</code> | <p>required</p> |
| exercises | <code>Array.&lt;Exercise&gt;</code> | <p>optional</p> |
| min_req_points | <code>number</code> | <p>required, Minimal amount of points to pass the sheet.</p> |
| order | <code>number</code> | <p>default: 0</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |
| template | <code>object</code> |  |
| template.flag | <code>boolean</code> | <p>default: false</p> |
| template.correctly | <code>boolean</code> | <p>default: true</p> |
| template.points | <code>number</code> | <p>default: 0</p> |

<a name="module_models/sheet..Schema_ Exercise"></a>

### models/sheet~Schema: Exercise
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| description | <code>string</code> | <p>required</p> |
| tasks | <code>Array.&lt;Task&gt;</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |

<a name="module_models/sheet..Schema_ Task"></a>

### models/sheet~Schema: Task
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| question | <code>string</code> | <p>required</p> |
| points | <code>number</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| choices | <code>Array.&lt;string&gt;</code> | <p>required</p> |
| solution | <code>Solution</code> | <p>optional</p> |

<a name="module_models/sheet..Schema_ Solution"></a>

### models/sheet~Schema: Solution
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>required</p> |
| regex | <code>string</code> | <p>optional</p> |
| range | <code>object</code> | <p>optional</p> |
| range.from | <code>number</code> | <p>optional</p> |
| range.to | <code>number</code> | <p>optional</p> |
| number | <code>number</code> | <p>optional</p> |
| hint | <code>string</code> | <p>optional</p> |
| default_free_text | <code>boolean</code> | <p>optional, if true then auto-correct will give points, if false -&gt; 0</p> |

<a name="module_models/sheet..Schema_ Sheet"></a>

### models/sheet~Schema: Sheet
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| submissions | <code>Array.&lt;Submission&gt;</code> | <p>optional</p> |
| submissiondate | <code>Date</code> | <p>required</p> |
| exercises | <code>Array.&lt;Exercise&gt;</code> | <p>optional</p> |
| min_req_points | <code>number</code> | <p>required, Minimal amount of points to pass the sheet.</p> |
| order | <code>number</code> | <p>default: 0</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |
| template | <code>object</code> |  |
| template.flag | <code>boolean</code> | <p>default: false</p> |
| template.correctly | <code>boolean</code> | <p>default: true</p> |
| template.points | <code>number</code> | <p>default: 0</p> |

<a name="module_models/sheet..Schema_ Exercise"></a>

### models/sheet~Schema: Exercise
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| description | <code>string</code> | <p>required</p> |
| tasks | <code>Array.&lt;Task&gt;</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |

<a name="module_models/sheet..Schema_ Task"></a>

### models/sheet~Schema: Task
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| question | <code>string</code> | <p>required</p> |
| points | <code>number</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| choices | <code>Array.&lt;string&gt;</code> | <p>required</p> |
| solution | <code>Solution</code> | <p>optional</p> |

<a name="module_models/sheet..Schema_ Solution"></a>

### models/sheet~Schema: Solution
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>required</p> |
| regex | <code>string</code> | <p>optional</p> |
| range | <code>object</code> | <p>optional</p> |
| range.from | <code>number</code> | <p>optional</p> |
| range.to | <code>number</code> | <p>optional</p> |
| number | <code>number</code> | <p>optional</p> |
| hint | <code>string</code> | <p>optional</p> |
| default_free_text | <code>boolean</code> | <p>optional, if true then auto-correct will give points, if false -&gt; 0</p> |

<a name="module_models/submission"></a>

## models/submission

* [models/submission](#module_models/submission)
    * [~Schema: Submission](#module_models/submission..Schema_ Submission)
    * [~Schema: Answer](#module_models/submission..Schema_ Answer)
    * [~Schema: Student](#module_models/submission..Schema_ Student)
    * [~Schema: Submission](#module_models/submission..Schema_ Submission)
    * [~Schema: Answer](#module_models/submission..Schema_ Answer)
    * [~Schema: Student](#module_models/submission..Schema_ Student)

<a name="module_models/submission..Schema_ Submission"></a>

### models/submission~Schema: Submission
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| student | <code>Student</code> | <p>required</p> |
| answers | <code>Array.&lt;Answer&gt;</code> | <p>required</p> |
| user | <code>User</code> | <p>optional</p> |
| grips_id | <code>string</code> | <p>required</p> |

<a name="module_models/submission..Schema_ Answer"></a>

### models/submission~Schema: Answer
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | <p>required</p> |
| task | <code>Task</code> | <p>optional</p> |
| feedback | <code>string</code> | <p>optional</p> |
| auto_corrected | <code>boolean</code> | <p>optional, auto correction flag.</p> |
| corrected | <code>boolean</code> | <p>optional, manual correction flag.</p> |
| help | <code>boolean</code> | <p>optional</p> |
| achieved_points | <code>number</code> | <p>optional</p> |

<a name="module_models/submission..Schema_ Student"></a>

### models/submission~Schema: Student
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| lastname | <code>string</code> | <p>optional</p> |
| mat_nr | <code>string</code> | <p>required</p> |
| status | <code>string</code> | <p>optional</p> |

<a name="module_models/submission..Schema_ Submission"></a>

### models/submission~Schema: Submission
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| student | <code>Student</code> | <p>required</p> |
| answers | <code>Array.&lt;Answer&gt;</code> | <p>required</p> |
| user | <code>User</code> | <p>optional</p> |
| grips_id | <code>string</code> | <p>required</p> |

<a name="module_models/submission..Schema_ Answer"></a>

### models/submission~Schema: Answer
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | <p>required</p> |
| task | <code>Task</code> | <p>optional</p> |
| feedback | <code>string</code> | <p>optional</p> |
| auto_corrected | <code>boolean</code> | <p>optional, auto correction flag.</p> |
| corrected | <code>boolean</code> | <p>optional, manual correction flag.</p> |
| help | <code>boolean</code> | <p>optional</p> |
| achieved_points | <code>number</code> | <p>optional</p> |

<a name="module_models/submission..Schema_ Student"></a>

### models/submission~Schema: Student
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| lastname | <code>string</code> | <p>optional</p> |
| mat_nr | <code>string</code> | <p>required</p> |
| status | <code>string</code> | <p>optional</p> |

<a name="module_models/user"></a>

## models/user

* [models/user](#module_models/user)
    * [~Schema: User](#module_models/user..Schema_ User)
    * [~Schema: Role](#module_models/user..Schema_ Role)
    * [~Schema: User](#module_models/user..Schema_ User)
    * [~Schema: Role](#module_models/user..Schema_ Role)

<a name="module_models/user..Schema_ User"></a>

### models/user~Schema: User
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | <p>required</p> |
| password | <code>string</code> | <p>optional</p> |
| forename | <code>string</code> | <p>optional</p> |
| lastname | <code>string</code> | <p>optional</p> |
| email | <code>string</code> | <p>optional</p> |
| role | <code>Role</code> | <p>required</p> |
| courses | <code>Array.&lt;Course&gt;</code> | <p>optional</p> |

<a name="module_models/user..Schema_ Role"></a>

### models/user~Schema: Role
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required, enum: ['admin', 'lecturer', 'tutor']</p> |

<a name="module_models/user..Schema_ User"></a>

### models/user~Schema: User
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | <p>required</p> |
| password | <code>string</code> | <p>optional</p> |
| forename | <code>string</code> | <p>optional</p> |
| lastname | <code>string</code> | <p>optional</p> |
| email | <code>string</code> | <p>optional</p> |
| role | <code>Role</code> | <p>required</p> |
| courses | <code>Array.&lt;Course&gt;</code> | <p>optional</p> |

<a name="module_models/user..Schema_ Role"></a>

### models/user~Schema: Role
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required, enum: ['admin', 'lecturer', 'tutor']</p> |

<a name="module_API/answers"></a>

## API/answers
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/answers](#module_API/answers)
    * [.GET|answers/:id()](#module_API/answers.GET|answers/_id) ⇒ <code>Answer</code>
    * [.PUT|answers/:id()](#module_API/answers.PUT|answers/_id) ⇒ <code>Answer</code>
    * [.GET|answers/:id()](#module_API/answers.GET|answers/_id) ⇒ <code>Answer</code>
    * [.PUT|answers/:id()](#module_API/answers.PUT|answers/_id) ⇒ <code>Answer</code>

<a name="module_API/answers.GET|answers/_id"></a>

### API/answers.GET|answers/:id() ⇒ <code>Answer</code>
<p>Gets an answer by id.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id | <code>string</code> | <p>ID of a answer.</p> |

<a name="module_API/answers.PUT|answers/_id"></a>

### API/answers.PUT|answers/:id() ⇒ <code>Answer</code>
<p>Updates an answer.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Answer</code> | <p>One or more answers.</p> |

<a name="module_API/answers.GET|answers/_id"></a>

### API/answers.GET|answers/:id() ⇒ <code>Answer</code>
<p>Gets an answer by id.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id | <code>string</code> | <p>ID of a answer.</p> |

<a name="module_API/answers.PUT|answers/_id"></a>

### API/answers.PUT|answers/:id() ⇒ <code>Answer</code>
<p>Updates an answer.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Answer</code> | <p>One or more answers.</p> |

<a name="module_API/courses"></a>

## API/courses
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/courses](#module_API/courses)
    * [.GET|courses()](#module_API/courses.GET|courses) ⇒ <code>Array</code>
    * [.GET|courses/_search()](#module_API/courses.GET|courses/_search) ⇒ <code>Array</code>
    * [.GET|courses/:id()](#module_API/courses.GET|courses/_id) ⇒ <code>Course</code>
    * [.POST|courses()](#module_API/courses.POST|courses) ⇒ <code>Array</code> \| <code>Course</code>
    * [.PUT|courses/:id()](#module_API/courses.PUT|courses/_id) ⇒ <code>Course</code>
    * [.DELETE|courses/:id()](#module_API/courses.DELETE|courses/_id) ⇒ <code>string</code>
    * [.GET|courses/:id/students()](#module_API/courses.GET|courses/_id/students) ⇒ <code>Array</code>
    * [.GET|courses/:id/sheets()](#module_API/courses.GET|courses/_id/sheets) ⇒ <code>Array</code>
    * [.POST|courses/:id/sheets()](#module_API/courses.POST|courses/_id/sheets) ⇒ <code>Array</code> \| <code>Sheet</code>
    * [.GET|courses()](#module_API/courses.GET|courses) ⇒ <code>Array</code>
    * [.GET|courses/_search()](#module_API/courses.GET|courses/_search) ⇒ <code>Array</code>
    * [.GET|courses/:id()](#module_API/courses.GET|courses/_id) ⇒ <code>Course</code>
    * [.POST|courses()](#module_API/courses.POST|courses) ⇒ <code>Array</code> \| <code>Course</code>
    * [.PUT|courses/:id()](#module_API/courses.PUT|courses/_id) ⇒ <code>Course</code>
    * [.DELETE|courses/:id()](#module_API/courses.DELETE|courses/_id) ⇒ <code>string</code>
    * [.GET|courses/:id/students()](#module_API/courses.GET|courses/_id/students) ⇒ <code>Array</code>
    * [.GET|courses/:id/sheets()](#module_API/courses.GET|courses/_id/sheets) ⇒ <code>Array</code>
    * [.POST|courses/:id/sheets()](#module_API/courses.POST|courses/_id/sheets) ⇒ <code>Array</code> \| <code>Sheet</code>

<a name="module_API/courses.GET|courses"></a>

### API/courses.GET|courses() ⇒ <code>Array</code>
<p>Gets all courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/courses.GET|courses/_search"></a>

### API/courses.GET|courses/_search() ⇒ <code>Array</code>
<p>Searches through all courses with a sheetID and returns found courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.sheet: | <code>string</code> | <p>id of a {Sheet}.</p> |

**Example**  
```js
courses/_search?sheet={ID}
```
<a name="module_API/courses.GET|courses/_id"></a>

### API/courses.GET|courses/:id() ⇒ <code>Course</code>
<p>Gets a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses"></a>

### API/courses.POST|courses() ⇒ <code>Array</code> \| <code>Course</code>
<p>Creates one or many courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Course</code> - <p>{Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Course</code> | <p>Array of or single course.</p> |

<a name="module_API/courses.PUT|courses/_id"></a>

### API/courses.PUT|courses/:id() ⇒ <code>Course</code>
<p>Updates a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |
| req.body | <code>Course</code> | <p>with updated values.</p> |

<a name="module_API/courses.DELETE|courses/_id"></a>

### API/courses.DELETE|courses/:id() ⇒ <code>string</code>
<p>Deletes a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/students"></a>

### API/courses.GET|courses/:id/students() ⇒ <code>Array</code>
<p>Gets all students of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/sheets"></a>

### API/courses.GET|courses/:id/sheets() ⇒ <code>Array</code>
<p>Gets all sheets of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses/_id/sheets"></a>

### API/courses.POST|courses/:id/sheets() ⇒ <code>Array</code> \| <code>Sheet</code>
<p>Creates one or many sheets.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Sheet</code> - <p>{Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Sheet</code> | <p>Array of sheets or single sheet.</p> |

<a name="module_API/courses.GET|courses"></a>

### API/courses.GET|courses() ⇒ <code>Array</code>
<p>Gets all courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/courses.GET|courses/_search"></a>

### API/courses.GET|courses/_search() ⇒ <code>Array</code>
<p>Searches through all courses with a sheetID and returns found courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.sheet: | <code>string</code> | <p>id of a {Sheet}.</p> |

**Example**  
```js
courses/_search?sheet={ID}
```
<a name="module_API/courses.GET|courses/_id"></a>

### API/courses.GET|courses/:id() ⇒ <code>Course</code>
<p>Gets a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses"></a>

### API/courses.POST|courses() ⇒ <code>Array</code> \| <code>Course</code>
<p>Creates one or many courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Course</code> - <p>{Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Course</code> | <p>Array of or single course.</p> |

<a name="module_API/courses.PUT|courses/_id"></a>

### API/courses.PUT|courses/:id() ⇒ <code>Course</code>
<p>Updates a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |
| req.body | <code>Course</code> | <p>with updated values.</p> |

<a name="module_API/courses.DELETE|courses/_id"></a>

### API/courses.DELETE|courses/:id() ⇒ <code>string</code>
<p>Deletes a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/students"></a>

### API/courses.GET|courses/:id/students() ⇒ <code>Array</code>
<p>Gets all students of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/sheets"></a>

### API/courses.GET|courses/:id/sheets() ⇒ <code>Array</code>
<p>Gets all sheets of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses/_id/sheets"></a>

### API/courses.POST|courses/:id/sheets() ⇒ <code>Array</code> \| <code>Sheet</code>
<p>Creates one or many sheets.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Sheet</code> - <p>{Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Sheet</code> | <p>Array of sheets or single sheet.</p> |

<a name="module_API/exercises"></a>

## API/exercises
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/exercises](#module_API/exercises)
    * [.GET|exercises/:id/_aggregate()](#module_API/exercises.GET|exercises/_id/_aggregate) ⇒ <code>Exercise</code>
    * [.GET|exercises/:id()](#module_API/exercises.GET|exercises/_id) ⇒ <code>Exercise</code>
    * [.PUT|exercises/:id()](#module_API/exercises.PUT|exercises/_id) ⇒ <code>Exercise</code>
    * [.DELETE|exercises/:id()](#module_API/exercises.DELETE|exercises/_id) ⇒ <code>string</code>
    * [.GET|exercises/:id/tasks()](#module_API/exercises.GET|exercises/_id/tasks) ⇒ <code>Array</code>
    * [.POST|exercises/:id/tasks()](#module_API/exercises.POST|exercises/_id/tasks) ⇒ <code>Array</code>
    * [.GET|exercises/:id/_aggregate()](#module_API/exercises.GET|exercises/_id/_aggregate) ⇒ <code>Exercise</code>
    * [.GET|exercises/:id()](#module_API/exercises.GET|exercises/_id) ⇒ <code>Exercise</code>
    * [.PUT|exercises/:id()](#module_API/exercises.PUT|exercises/_id) ⇒ <code>Exercise</code>
    * [.DELETE|exercises/:id()](#module_API/exercises.DELETE|exercises/_id) ⇒ <code>string</code>
    * [.GET|exercises/:id/tasks()](#module_API/exercises.GET|exercises/_id/tasks) ⇒ <code>Array</code>
    * [.POST|exercises/:id/tasks()](#module_API/exercises.POST|exercises/_id/tasks) ⇒ <code>Array</code>

<a name="module_API/exercises.GET|exercises/_id/_aggregate"></a>

### API/exercises.GET|exercises/:id/_aggregate() ⇒ <code>Exercise</code>
<p>Gets an aggregated exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Exercise</code> - <p>with Tasks and a Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id"></a>

### API/exercises.GET|exercises/:id() ⇒ <code>Exercise</code>
<p>Gets an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.PUT|exercises/_id"></a>

### API/exercises.PUT|exercises/:id() ⇒ <code>Exercise</code>
<p>Updates an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Exercise</code> | <p>with updated values.</p> |

<a name="module_API/exercises.DELETE|exercises/_id"></a>

### API/exercises.DELETE|exercises/:id() ⇒ <code>string</code>
<p>Deletes an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id/tasks"></a>

### API/exercises.GET|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Gets all tasks of an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.POST|exercises/_id/tasks"></a>

### API/exercises.POST|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Creates tasks for an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Array</code> | <p>Array of tasks.</p> |

<a name="module_API/exercises.GET|exercises/_id/_aggregate"></a>

### API/exercises.GET|exercises/:id/_aggregate() ⇒ <code>Exercise</code>
<p>Gets an aggregated exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Exercise</code> - <p>with Tasks and a Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id"></a>

### API/exercises.GET|exercises/:id() ⇒ <code>Exercise</code>
<p>Gets an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.PUT|exercises/_id"></a>

### API/exercises.PUT|exercises/:id() ⇒ <code>Exercise</code>
<p>Updates an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Exercise</code> | <p>with updated values.</p> |

<a name="module_API/exercises.DELETE|exercises/_id"></a>

### API/exercises.DELETE|exercises/:id() ⇒ <code>string</code>
<p>Deletes an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id/tasks"></a>

### API/exercises.GET|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Gets all tasks of an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.POST|exercises/_id/tasks"></a>

### API/exercises.POST|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Creates tasks for an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Array</code> | <p>Array of tasks.</p> |

<a name="module_API/export"></a>

## API/export
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/export](#module_API/export)
    * _static_
        * [.CSVRenderer](#module_API/export.CSVRenderer)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
        * [.Renderer](#module_API/export.Renderer)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
        * [.CSVRenderer](#module_API/export.CSVRenderer)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
        * [.Renderer](#module_API/export.Renderer)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
        * [.GET|pdf/:id()](#module_API/export.GET|pdf/_id) ⇒ <code>PDF</code>
        * [.GET|docx/:id()](#module_API/export.GET|docx/_id) ⇒ <code>DOCX</code>
        * [.GET|csv/:id()](#module_API/export.GET|csv/_id) ⇒ <code>CSV</code>
        * [.GET|template/:id()](#module_API/export.GET|template/_id) ⇒ <code>TXT</code>
        * [.GET|pdf/:id()](#module_API/export.GET|pdf/_id) ⇒ <code>PDF</code>
        * [.GET|docx/:id()](#module_API/export.GET|docx/_id) ⇒ <code>DOCX</code>
        * [.GET|csv/:id()](#module_API/export.GET|csv/_id) ⇒ <code>CSV</code>
        * [.GET|template/:id()](#module_API/export.GET|template/_id) ⇒ <code>TXT</code>
    * _inner_
        * [~sendReport(id, type, res)](#module_API/export..sendReport)
        * [~getReportObj(sheetId)](#module_API/export..getReportObj)
        * [~getTemplate(sheet, mode)](#module_API/export..getTemplate)
        * [~toAlphabeticOrder(numerical)](#module_API/export..toAlphabeticOrder) ⇒
        * [~countOrderUpBy(obj, countUp)](#module_API/export..countOrderUpBy) ⇒
        * [~toReadableDate(str)](#module_API/export..toReadableDate)
        * [~sendReport(id, type, res)](#module_API/export..sendReport)
        * [~getReportObj(sheetId)](#module_API/export..getReportObj)
        * [~getTemplate(sheet, mode)](#module_API/export..getTemplate)
        * [~toAlphabeticOrder(numerical)](#module_API/export..toAlphabeticOrder) ⇒
        * [~countOrderUpBy(obj, countUp)](#module_API/export..countOrderUpBy) ⇒
        * [~toReadableDate(str)](#module_API/export..toReadableDate)

<a name="module_API/export.CSVRenderer"></a>

### API/export.CSVRenderer
**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.CSVRenderer](#module_API/export.CSVRenderer)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.Renderer"></a>

### API/export.Renderer
<p>Renderer defines jsreport specific template values and extensions.</p>

**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.Renderer](#module_API/export.Renderer)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.CSVRenderer"></a>

### API/export.CSVRenderer
**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.CSVRenderer](#module_API/export.CSVRenderer)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.Renderer"></a>

### API/export.Renderer
<p>Renderer defines jsreport specific template values and extensions.</p>

**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.Renderer](#module_API/export.Renderer)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.GET|pdf/_id"></a>

### API/export.GET|pdf/:id() ⇒ <code>PDF</code>
<p>Gets a pdf file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>PDF</code> - <p>with type application/pdf</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|docx/_id"></a>

### API/export.GET|docx/:id() ⇒ <code>DOCX</code>
<p>Gets a docx file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>DOCX</code> - <p>with type application/vnd.openxmlformats-officedocument.wordprocessingml.document</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|csv/_id"></a>

### API/export.GET|csv/:id() ⇒ <code>CSV</code>
<p>Gets a csv file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>CSV</code> - <p>text/csv</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|template/_id"></a>

### API/export.GET|template/:id() ⇒ <code>TXT</code>
<p>Gets a tempate file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>TXT</code> - <p>txt</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|pdf/_id"></a>

### API/export.GET|pdf/:id() ⇒ <code>PDF</code>
<p>Gets a pdf file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>PDF</code> - <p>with type application/pdf</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|docx/_id"></a>

### API/export.GET|docx/:id() ⇒ <code>DOCX</code>
<p>Gets a docx file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>DOCX</code> - <p>with type application/vnd.openxmlformats-officedocument.wordprocessingml.document</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|csv/_id"></a>

### API/export.GET|csv/:id() ⇒ <code>CSV</code>
<p>Gets a csv file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>CSV</code> - <p>text/csv</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|template/_id"></a>

### API/export.GET|template/:id() ⇒ <code>TXT</code>
<p>Gets a tempate file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>TXT</code> - <p>txt</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export..sendReport"></a>

### API/export~sendReport(id, type, res)
<p>This function gets all reporting data,
renders it to the specific type of file
and sends it to the client.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of a {Sheet}.</p> |
| type | <code>string</code> | <p>(pdf|docx) of document.</p> |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export..getReportObj"></a>

### API/export~getReportObj(sheetId)
<p>Implementation of accumulating and preparing the report data:
template.html
{Course} and {Sheet} with exercises and tasks.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheetId | <code>string</code> | <p>a {Sheet} id.</p> |

<a name="module_API/export..getTemplate"></a>

### API/export~getTemplate(sheet, mode)
<p>Parses a sheet to a template.
This function uses replacing of '&lt;' and '&gt;' to prevent html to be interpreted.
Furthermore, it adds linebreaks to its output depending on the mode.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>\*</code> | <p>a sheet object.</p> |
| mode | <code>\*</code> | <p>(txt|html)</p> |

<a name="module_API/export..toAlphabeticOrder"></a>

### API/export~toAlphabeticOrder(numerical) ⇒
<p>This function parses a numerical order to an alphabetical one.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>alphabetic character.</p>  

| Param | Type | Description |
| --- | --- | --- |
| numerical | <code>number</code> | <p>a order number.</p> |

<a name="module_API/export..countOrderUpBy"></a>

### API/export~countOrderUpBy(obj, countUp) ⇒
<p>This function counts up all orders of the report object.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>updated report object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | <p>is a report object.</p> |
| countUp | <code>number</code> | <p>value that is added to the order.</p> |

<a name="module_API/export..toReadableDate"></a>

### API/export~toReadableDate(str)
<p>This function parses a date string to a predefined format.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>date string.</p> |

<a name="module_API/export..sendReport"></a>

### API/export~sendReport(id, type, res)
<p>This function gets all reporting data,
renders it to the specific type of file
and sends it to the client.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of a {Sheet}.</p> |
| type | <code>string</code> | <p>(pdf|docx) of document.</p> |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export..getReportObj"></a>

### API/export~getReportObj(sheetId)
<p>Implementation of accumulating and preparing the report data:
template.html
{Course} and {Sheet} with exercises and tasks.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheetId | <code>string</code> | <p>a {Sheet} id.</p> |

<a name="module_API/export..getTemplate"></a>

### API/export~getTemplate(sheet, mode)
<p>Parses a sheet to a template.
This function uses replacing of '&lt;' and '&gt;' to prevent html to be interpreted.
Furthermore, it adds linebreaks to its output depending on the mode.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>\*</code> | <p>a sheet object.</p> |
| mode | <code>\*</code> | <p>(txt|html)</p> |

<a name="module_API/export..toAlphabeticOrder"></a>

### API/export~toAlphabeticOrder(numerical) ⇒
<p>This function parses a numerical order to an alphabetical one.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>alphabetic character.</p>  

| Param | Type | Description |
| --- | --- | --- |
| numerical | <code>number</code> | <p>a order number.</p> |

<a name="module_API/export..countOrderUpBy"></a>

### API/export~countOrderUpBy(obj, countUp) ⇒
<p>This function counts up all orders of the report object.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>updated report object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | <p>is a report object.</p> |
| countUp | <code>number</code> | <p>value that is added to the order.</p> |

<a name="module_API/export..toReadableDate"></a>

### API/export~toReadableDate(str)
<p>This function parses a date string to a predefined format.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>date string.</p> |

<a name="module_API/sheets"></a>

## API/sheets
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/sheets](#module_API/sheets)
    * [.GET|sheets/:id()](#module_API/sheets.GET|sheets/_id) ⇒ <code>Sheet</code>
    * [.GET|sheets/:id/_aggregate()](#module_API/sheets.GET|sheets/_id/_aggregate) ⇒ <code>Sheet</code>
    * [.PUT|sheets/:id()](#module_API/sheets.PUT|sheets/_id) ⇒ <code>Sheet</code>
    * [.DELETE|sheets/:id()](#module_API/sheets.DELETE|sheets/_id) ⇒ <code>string</code>
    * [.GET|sheets/:id/exercises()](#module_API/sheets.GET|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.GET|sheets/:id/submissions()](#module_API/sheets.GET|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/exercises()](#module_API/sheets.POST|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions()](#module_API/sheets.POST|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions/_bulk()](#module_API/sheets.POST|sheets/_id/submissions/_bulk) ⇒ <code>Array</code>
    * [.DELETE|sheets/:id/exercises()](#module_API/sheets.DELETE|sheets/_id/exercises) ⇒ <code>string</code>
    * [.DELETE|sheets/:id/submissions()](#module_API/sheets.DELETE|sheets/_id/submissions) ⇒ <code>string</code>
    * [.GET|sheets/:id/pdf()](#module_API/sheets.GET|sheets/_id/pdf)
    * [.GET|sheets/:id/docx()](#module_API/sheets.GET|sheets/_id/docx)
    * [.GET|sheets/:id/csv()](#module_API/sheets.GET|sheets/_id/csv)
    * [.GET|sheets/:id/template()](#module_API/sheets.GET|sheets/_id/template)
    * [.GET|sheets/:id()](#module_API/sheets.GET|sheets/_id) ⇒ <code>Sheet</code>
    * [.GET|sheets/:id/_aggregate()](#module_API/sheets.GET|sheets/_id/_aggregate) ⇒ <code>Sheet</code>
    * [.PUT|sheets/:id()](#module_API/sheets.PUT|sheets/_id) ⇒ <code>Sheet</code>
    * [.DELETE|sheets/:id()](#module_API/sheets.DELETE|sheets/_id) ⇒ <code>string</code>
    * [.GET|sheets/:id/exercises()](#module_API/sheets.GET|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.GET|sheets/:id/submissions()](#module_API/sheets.GET|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/exercises()](#module_API/sheets.POST|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions()](#module_API/sheets.POST|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions/_bulk()](#module_API/sheets.POST|sheets/_id/submissions/_bulk) ⇒ <code>Array</code>
    * [.DELETE|sheets/:id/exercises()](#module_API/sheets.DELETE|sheets/_id/exercises) ⇒ <code>string</code>
    * [.DELETE|sheets/:id/submissions()](#module_API/sheets.DELETE|sheets/_id/submissions) ⇒ <code>string</code>
    * [.GET|sheets/:id/pdf()](#module_API/sheets.GET|sheets/_id/pdf)
    * [.GET|sheets/:id/docx()](#module_API/sheets.GET|sheets/_id/docx)
    * [.GET|sheets/:id/csv()](#module_API/sheets.GET|sheets/_id/csv)
    * [.GET|sheets/:id/template()](#module_API/sheets.GET|sheets/_id/template)

<a name="module_API/sheets.GET|sheets/_id"></a>

### API/sheets.GET|sheets/:id() ⇒ <code>Sheet</code>
<p>Gets a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/_aggregate"></a>

### API/sheets.GET|sheets/:id/_aggregate() ⇒ <code>Sheet</code>
<p>Gets an aggregated sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Sheet</code> - <p>with Exercises, Tasks, Solution and Submissions, Answers, Task, Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.PUT|sheets/_id"></a>

### API/sheets.PUT|sheets/:id() ⇒ <code>Sheet</code>
<p>Updates a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Sheet</code> | <p>with updated values.</p> |

<a name="module_API/sheets.DELETE|sheets/_id"></a>

### API/sheets.DELETE|sheets/:id() ⇒ <code>string</code>
<p>Deletes a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/exercises"></a>

### API/sheets.GET|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Gets all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/submissions"></a>

### API/sheets.GET|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.POST|sheets/_id/exercises"></a>

### API/sheets.POST|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Creates exercises for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of exercises.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions"></a>

### API/sheets.POST|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Creates submissions for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions/_bulk"></a>

### API/sheets.POST|sheets/:id/submissions/_bulk() ⇒ <code>Array</code>
<p>Creates submissions with 2 further levels (answers and task) for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/exercises"></a>

### API/sheets.DELETE|sheets/:id/exercises() ⇒ <code>string</code>
<p>Deletes all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/submissions"></a>

### API/sheets.DELETE|sheets/:id/submissions() ⇒ <code>string</code>
<p>Deletes all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/pdf"></a>

### API/sheets.GET|sheets/:id/pdf()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/docx"></a>

### API/sheets.GET|sheets/:id/docx()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/csv"></a>

### API/sheets.GET|sheets/:id/csv()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/template"></a>

### API/sheets.GET|sheets/:id/template()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id"></a>

### API/sheets.GET|sheets/:id() ⇒ <code>Sheet</code>
<p>Gets a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/_aggregate"></a>

### API/sheets.GET|sheets/:id/_aggregate() ⇒ <code>Sheet</code>
<p>Gets an aggregated sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Sheet</code> - <p>with Exercises, Tasks, Solution and Submissions, Answers, Task, Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.PUT|sheets/_id"></a>

### API/sheets.PUT|sheets/:id() ⇒ <code>Sheet</code>
<p>Updates a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Sheet</code> | <p>with updated values.</p> |

<a name="module_API/sheets.DELETE|sheets/_id"></a>

### API/sheets.DELETE|sheets/:id() ⇒ <code>string</code>
<p>Deletes a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/exercises"></a>

### API/sheets.GET|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Gets all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/submissions"></a>

### API/sheets.GET|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.POST|sheets/_id/exercises"></a>

### API/sheets.POST|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Creates exercises for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of exercises.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions"></a>

### API/sheets.POST|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Creates submissions for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions/_bulk"></a>

### API/sheets.POST|sheets/:id/submissions/_bulk() ⇒ <code>Array</code>
<p>Creates submissions with 2 further levels (answers and task) for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/exercises"></a>

### API/sheets.DELETE|sheets/:id/exercises() ⇒ <code>string</code>
<p>Deletes all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/submissions"></a>

### API/sheets.DELETE|sheets/:id/submissions() ⇒ <code>string</code>
<p>Deletes all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/pdf"></a>

### API/sheets.GET|sheets/:id/pdf()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/docx"></a>

### API/sheets.GET|sheets/:id/docx()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/csv"></a>

### API/sheets.GET|sheets/:id/csv()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/template"></a>

### API/sheets.GET|sheets/:id/template()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/solutions"></a>

## API/solutions
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/solutions](#module_API/solutions)
    * [.PUT|solutions/:id()](#module_API/solutions.PUT|solutions/_id) ⇒ <code>Solution</code>
    * [.DELETE|solutions/:id()](#module_API/solutions.DELETE|solutions/_id) ⇒ <code>string</code>
    * [.PUT|solutions/:id()](#module_API/solutions.PUT|solutions/_id) ⇒ <code>Solution</code>
    * [.DELETE|solutions/:id()](#module_API/solutions.DELETE|solutions/_id) ⇒ <code>string</code>

<a name="module_API/solutions.PUT|solutions/_id"></a>

### API/solutions.PUT|solutions/:id() ⇒ <code>Solution</code>
<p>Updates a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |
| req.body | <code>Solution</code> | <p>with updated values.</p> |

<a name="module_API/solutions.DELETE|solutions/_id"></a>

### API/solutions.DELETE|solutions/:id() ⇒ <code>string</code>
<p>Deletes a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |

<a name="module_API/solutions.PUT|solutions/_id"></a>

### API/solutions.PUT|solutions/:id() ⇒ <code>Solution</code>
<p>Updates a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |
| req.body | <code>Solution</code> | <p>with updated values.</p> |

<a name="module_API/solutions.DELETE|solutions/_id"></a>

### API/solutions.DELETE|solutions/:id() ⇒ <code>string</code>
<p>Deletes a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |

<a name="module_API/students"></a>

## API/students
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/students](#module_API/students)
    * [.GET|students/_search()](#module_API/students.GET|students/_search) ⇒ <code>Student</code>
    * [.GET|students/:id()](#module_API/students.GET|students/_id) ⇒ <code>Student</code>
    * [.POST|students()](#module_API/students.POST|students) ⇒ <code>Array</code>
    * [.PUT|students/:id()](#module_API/students.PUT|students/_id) ⇒ <code>Student</code>
    * [.DELETE|students/:id()](#module_API/students.DELETE|students/_id) ⇒ <code>string</code>
    * [.GET|students/:id/submissions()](#module_API/students.GET|students/_id/submissions) ⇒ <code>Array</code>
    * [.GET|students/:id/courses()](#module_API/students.GET|students/_id/courses) ⇒ <code>Array</code>
    * [.GET|students/_search()](#module_API/students.GET|students/_search) ⇒ <code>Student</code>
    * [.GET|students/:id()](#module_API/students.GET|students/_id) ⇒ <code>Student</code>
    * [.POST|students()](#module_API/students.POST|students) ⇒ <code>Array</code>
    * [.PUT|students/:id()](#module_API/students.PUT|students/_id) ⇒ <code>Student</code>
    * [.DELETE|students/:id()](#module_API/students.DELETE|students/_id) ⇒ <code>string</code>
    * [.GET|students/:id/submissions()](#module_API/students.GET|students/_id/submissions) ⇒ <code>Array</code>
    * [.GET|students/:id/courses()](#module_API/students.GET|students/_id/courses) ⇒ <code>Array</code>

<a name="module_API/students.GET|students/_search"></a>

### API/students.GET|students/_search() ⇒ <code>Student</code>
<p>Searches through all students with a mat_nr.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.matnr: | <code>string</code> | <p>matricle number of a student.</p> |

**Example**  
```js
/students/_search?matnr={mat_nr}
```
<a name="module_API/students.GET|students/_id"></a>

### API/students.GET|students/:id() ⇒ <code>Student</code>
<p>Gets a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.POST|students"></a>

### API/students.POST|students() ⇒ <code>Array</code>
<p>Creates students.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> | <p>with {Student}</p> |

<a name="module_API/students.PUT|students/_id"></a>

### API/students.PUT|students/:id() ⇒ <code>Student</code>
<p>Updates a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |
| req.body | <code>Student</code> | <p>with updated values.</p> |

<a name="module_API/students.DELETE|students/_id"></a>

### API/students.DELETE|students/:id() ⇒ <code>string</code>
<p>Deletes a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/submissions"></a>

### API/students.GET|students/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/courses"></a>

### API/students.GET|students/:id/courses() ⇒ <code>Array</code>
<p>Gets all courses of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Courses}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_search"></a>

### API/students.GET|students/_search() ⇒ <code>Student</code>
<p>Searches through all students with a mat_nr.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.matnr: | <code>string</code> | <p>matricle number of a student.</p> |

**Example**  
```js
/students/_search?matnr={mat_nr}
```
<a name="module_API/students.GET|students/_id"></a>

### API/students.GET|students/:id() ⇒ <code>Student</code>
<p>Gets a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.POST|students"></a>

### API/students.POST|students() ⇒ <code>Array</code>
<p>Creates students.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> | <p>with {Student}</p> |

<a name="module_API/students.PUT|students/_id"></a>

### API/students.PUT|students/:id() ⇒ <code>Student</code>
<p>Updates a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |
| req.body | <code>Student</code> | <p>with updated values.</p> |

<a name="module_API/students.DELETE|students/_id"></a>

### API/students.DELETE|students/:id() ⇒ <code>string</code>
<p>Deletes a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/submissions"></a>

### API/students.GET|students/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/courses"></a>

### API/students.GET|students/:id/courses() ⇒ <code>Array</code>
<p>Gets all courses of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Courses}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/submissions"></a>

## API/submissions
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/submissions](#module_API/submissions)
    * [.GET|submissions/_search()](#module_API/submissions.GET|submissions/_search) ⇒ <code>Array</code>
    * [.PUT|submissions/:id()](#module_API/submissions.PUT|submissions/_id) ⇒ <code>Submission</code>
    * [.GET|submissions/:id/answers()](#module_API/submissions.GET|submissions/_id/answers) ⇒ <code>Array</code>
    * [.POST|submissions/:id/answers()](#module_API/submissions.POST|submissions/_id/answers) ⇒ <code>Array</code>
    * [.GET|submissions/:id/answers/_search()](#module_API/submissions.GET|submissions/_id/answers/_search) ⇒ <code>Array</code>
    * [.GET|submissions/_search()](#module_API/submissions.GET|submissions/_search) ⇒ <code>Array</code>
    * [.PUT|submissions/:id()](#module_API/submissions.PUT|submissions/_id) ⇒ <code>Submission</code>
    * [.GET|submissions/:id/answers()](#module_API/submissions.GET|submissions/_id/answers) ⇒ <code>Array</code>
    * [.POST|submissions/:id/answers()](#module_API/submissions.POST|submissions/_id/answers) ⇒ <code>Array</code>
    * [.GET|submissions/:id/answers/_search()](#module_API/submissions.GET|submissions/_id/answers/_search) ⇒ <code>Array</code>

<a name="module_API/submissions.GET|submissions/_search"></a>

### API/submissions.GET|submissions/_search() ⇒ <code>Array</code>
<p>Searches through all submissions with an user id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.user: | <code>string</code> | <p>ID of a user.</p> |

**Example**  
```js
/submissions/_search?user={ID}
```
<a name="module_API/submissions.PUT|submissions/_id"></a>

### API/submissions.PUT|submissions/:id() ⇒ <code>Submission</code>
<p>Updates a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>object</code> | <p>with values for update.</p> |

<a name="module_API/submissions.GET|submissions/_id/answers"></a>

### API/submissions.GET|submissions/:id/answers() ⇒ <code>Array</code>
<p>Gets all answers of a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |

<a name="module_API/submissions.POST|submissions/_id/answers"></a>

### API/submissions.POST|submissions/:id/answers() ⇒ <code>Array</code>
<p>Creates answers for a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>Array</code> | <p>with {Answer}</p> |

<a name="module_API/submissions.GET|submissions/_id/answers/_search"></a>

### API/submissions.GET|submissions/:id/answers/_search() ⇒ <code>Array</code>
<p>Searches through all answers of an submission by id with a task id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.task: | <code>string</code> | <p>ID of a task.</p> |

**Example**  
```js
/submissions/:id/answers/_search?task={ID}
```
<a name="module_API/submissions.GET|submissions/_search"></a>

### API/submissions.GET|submissions/_search() ⇒ <code>Array</code>
<p>Searches through all submissions with an user id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.user: | <code>string</code> | <p>ID of a user.</p> |

**Example**  
```js
/submissions/_search?user={ID}
```
<a name="module_API/submissions.PUT|submissions/_id"></a>

### API/submissions.PUT|submissions/:id() ⇒ <code>Submission</code>
<p>Updates a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>object</code> | <p>with values for update.</p> |

<a name="module_API/submissions.GET|submissions/_id/answers"></a>

### API/submissions.GET|submissions/:id/answers() ⇒ <code>Array</code>
<p>Gets all answers of a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |

<a name="module_API/submissions.POST|submissions/_id/answers"></a>

### API/submissions.POST|submissions/:id/answers() ⇒ <code>Array</code>
<p>Creates answers for a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>Array</code> | <p>with {Answer}</p> |

<a name="module_API/submissions.GET|submissions/_id/answers/_search"></a>

### API/submissions.GET|submissions/:id/answers/_search() ⇒ <code>Array</code>
<p>Searches through all answers of an submission by id with a task id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.task: | <code>string</code> | <p>ID of a task.</p> |

**Example**  
```js
/submissions/:id/answers/_search?task={ID}
```
<a name="module_API/tasks"></a>

## API/tasks
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/tasks](#module_API/tasks)
    * [.GET|tasks/:id/_aggregate()](#module_API/tasks.GET|tasks/_id/_aggregate) ⇒ <code>Task</code>
    * [.GET|tasks/:id()](#module_API/tasks.GET|tasks/_id) ⇒ <code>Task</code>
    * [.PUT|tasks/:id()](#module_API/tasks.PUT|tasks/_id) ⇒ <code>Task</code>
    * [.DELETE|tasks/:id()](#module_API/tasks.DELETE|tasks/_id) ⇒ <code>Task</code>
    * [.GET|tasks/:id/solutions()](#module_API/tasks.GET|tasks/_id/solutions) ⇒ <code>Array</code>
    * [.POST|tasks/:id/solutions()](#module_API/tasks.POST|tasks/_id/solutions) ⇒ <code>Array</code>
    * [.GET|tasks/:id/_aggregate()](#module_API/tasks.GET|tasks/_id/_aggregate) ⇒ <code>Task</code>
    * [.GET|tasks/:id()](#module_API/tasks.GET|tasks/_id) ⇒ <code>Task</code>
    * [.PUT|tasks/:id()](#module_API/tasks.PUT|tasks/_id) ⇒ <code>Task</code>
    * [.DELETE|tasks/:id()](#module_API/tasks.DELETE|tasks/_id) ⇒ <code>Task</code>
    * [.GET|tasks/:id/solutions()](#module_API/tasks.GET|tasks/_id/solutions) ⇒ <code>Array</code>
    * [.POST|tasks/:id/solutions()](#module_API/tasks.POST|tasks/_id/solutions) ⇒ <code>Array</code>

<a name="module_API/tasks.GET|tasks/_id/_aggregate"></a>

### API/tasks.GET|tasks/:id/_aggregate() ⇒ <code>Task</code>
<p>Gets a task by id with an aggregated solution.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>with solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id"></a>

### API/tasks.GET|tasks/:id() ⇒ <code>Task</code>
<p>Gets a task by id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.PUT|tasks/_id"></a>

### API/tasks.PUT|tasks/:id() ⇒ <code>Task</code>
<p>Updates a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>Task</code> | <p>object with values for the update.</p> |

<a name="module_API/tasks.DELETE|tasks/_id"></a>

### API/tasks.DELETE|tasks/:id() ⇒ <code>Task</code>
<p>Delets a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id/solutions"></a>

### API/tasks.GET|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Gets all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.POST|tasks/_id/solutions"></a>

### API/tasks.POST|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Creates all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>object</code> | <p>with {Array} of {Solution}.</p> |

<a name="module_API/tasks.GET|tasks/_id/_aggregate"></a>

### API/tasks.GET|tasks/:id/_aggregate() ⇒ <code>Task</code>
<p>Gets a task by id with an aggregated solution.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>with solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id"></a>

### API/tasks.GET|tasks/:id() ⇒ <code>Task</code>
<p>Gets a task by id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.PUT|tasks/_id"></a>

### API/tasks.PUT|tasks/:id() ⇒ <code>Task</code>
<p>Updates a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>Task</code> | <p>object with values for the update.</p> |

<a name="module_API/tasks.DELETE|tasks/_id"></a>

### API/tasks.DELETE|tasks/:id() ⇒ <code>Task</code>
<p>Delets a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id/solutions"></a>

### API/tasks.GET|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Gets all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.POST|tasks/_id/solutions"></a>

### API/tasks.POST|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Creates all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>object</code> | <p>with {Array} of {Solution}.</p> |

<a name="module_API/users"></a>

## API/users
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/users](#module_API/users)
    * [.GET|users()](#module_API/users.GET|users) ⇒ <code>Array</code>
    * [.GET|users/roles()](#module_API/users.GET|users/roles) ⇒ <code>Array</code>
    * [.GET|users/roles/:id()](#module_API/users.GET|users/roles/_id) ⇒ <code>Role</code>
    * [.POST|users()](#module_API/users.POST|users)
    * [.GET|users/:id()](#module_API/users.GET|users/_id) ⇒ <code>User</code>
    * [.PUT|users/:id()](#module_API/users.PUT|users/_id) ⇒ <code>User</code>
    * [.DELETE|users/:id()](#module_API/users.DELETE|users/_id) ⇒ <code>string</code>
    * [.GET|users()](#module_API/users.GET|users) ⇒ <code>Array</code>
    * [.GET|users/roles()](#module_API/users.GET|users/roles) ⇒ <code>Array</code>
    * [.GET|users/roles/:id()](#module_API/users.GET|users/roles/_id) ⇒ <code>Role</code>
    * [.POST|users()](#module_API/users.POST|users)
    * [.GET|users/:id()](#module_API/users.GET|users/_id) ⇒ <code>User</code>
    * [.PUT|users/:id()](#module_API/users.PUT|users/_id) ⇒ <code>User</code>
    * [.DELETE|users/:id()](#module_API/users.DELETE|users/_id) ⇒ <code>string</code>

<a name="module_API/users.GET|users"></a>

### API/users.GET|users() ⇒ <code>Array</code>
<p>Gets all users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all users.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles"></a>

### API/users.GET|users/roles() ⇒ <code>Array</code>
<p>Gets all roles.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all roles.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles/_id"></a>

### API/users.GET|users/roles/:id() ⇒ <code>Role</code>
<p>Gets a role by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Role</code> - <p>role by id.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a role.</p> |

<a name="module_API/users.POST|users"></a>

### API/users.POST|users()
<p>Creates users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> \| <code>Array</code> | <p>user objects with username, password and roleId.</p> |

<a name="module_API/users.GET|users/_id"></a>

### API/users.GET|users/:id() ⇒ <code>User</code>
<p>Gets user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>with a role.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.PUT|users/_id"></a>

### API/users.PUT|users/:id() ⇒ <code>User</code>
<p>Updates user by id. Hashes the password beforehand.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>in its updated state.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.DELETE|users/_id"></a>

### API/users.DELETE|users/:id() ⇒ <code>string</code>
<p>Deletes a user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.GET|users"></a>

### API/users.GET|users() ⇒ <code>Array</code>
<p>Gets all users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all users.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles"></a>

### API/users.GET|users/roles() ⇒ <code>Array</code>
<p>Gets all roles.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all roles.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles/_id"></a>

### API/users.GET|users/roles/:id() ⇒ <code>Role</code>
<p>Gets a role by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Role</code> - <p>role by id.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a role.</p> |

<a name="module_API/users.POST|users"></a>

### API/users.POST|users()
<p>Creates users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> \| <code>Array</code> | <p>user objects with username, password and roleId.</p> |

<a name="module_API/users.GET|users/_id"></a>

### API/users.GET|users/:id() ⇒ <code>User</code>
<p>Gets user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>with a role.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.PUT|users/_id"></a>

### API/users.PUT|users/:id() ⇒ <code>User</code>
<p>Updates user by id. Hashes the password beforehand.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>in its updated state.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.DELETE|users/_id"></a>

### API/users.DELETE|users/:id() ⇒ <code>string</code>
<p>Deletes a user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_utils/errors"></a>

## utils/errors
<p>Errors</p>


* [utils/errors](#module_utils/errors)
    * [~StatusError](#module_utils/errors..StatusError)
    * [~CorrectionError](#module_utils/errors..CorrectionError)
    * [~StatusError](#module_utils/errors..StatusError)
    * [~CorrectionError](#module_utils/errors..CorrectionError)

<a name="module_utils/errors..StatusError"></a>

### utils/errors~StatusError
<p>StatusError for failures in the routing process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/errors..CorrectionError"></a>

### utils/errors~CorrectionError
<p>CorrectionError for failures in the auto correction process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/errors..StatusError"></a>

### utils/errors~StatusError
<p>StatusError for failures in the routing process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/errors..CorrectionError"></a>

### utils/errors~CorrectionError
<p>CorrectionError for failures in the auto correction process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/logging"></a>

## utils/logging
<p>Logging</p>


* [utils/logging](#module_utils/logging)
    * [~logRoute(req, res)](#module_utils/logging..logRoute)
    * [~logRoute(req, res)](#module_utils/logging..logRoute)

<a name="module_utils/logging..logRoute"></a>

### utils/logging~logRoute(req, res)
<p>Logging express routes. This is used for the API calls.</p>

**Kind**: inner method of [<code>utils/logging</code>](#module_utils/logging)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>request object of express with an additional error key value pair.</p> |
| res | <code>\*</code> | <p>response object of express.</p> |

<a name="module_utils/logging..logRoute"></a>

### utils/logging~logRoute(req, res)
<p>Logging express routes. This is used for the API calls.</p>

**Kind**: inner method of [<code>utils/logging</code>](#module_utils/logging)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>request object of express with an additional error key value pair.</p> |
| res | <code>\*</code> | <p>response object of express.</p> |

<a name="module_utils/methods"></a>

## utils/methods
<p>Methods</p>


* [utils/methods](#module_utils/methods)
    * [~get(id, model, populateObj)](#module_utils/methods..get) ⇒
    * [~deepGet(id, parent, child, isSingle)](#module_utils/methods..deepGet)
    * [~getAll(model, populateObj)](#module_utils/methods..getAll)
    * [~put(id, body, model)](#module_utils/methods..put)
    * [~del(id, model)](#module_utils/methods..del) ⇒ <code>string</code>
    * [~deepDel(id, model)](#module_utils/methods..deepDel) ⇒ <code>string</code>
    * [~post(body, model)](#module_utils/methods..post) ⇒ <code>Array</code>
    * [~deepPost(id, body, parent, child, isSingle)](#module_utils/methods..deepPost) ⇒ <code>Array</code>
    * [~bulkPost(id, body, parentModel, childModel)](#module_utils/methods..bulkPost)
    * [~get(id, model, populateObj)](#module_utils/methods..get) ⇒
    * [~deepGet(id, parent, child, isSingle)](#module_utils/methods..deepGet)
    * [~getAll(model, populateObj)](#module_utils/methods..getAll)
    * [~put(id, body, model)](#module_utils/methods..put)
    * [~del(id, model)](#module_utils/methods..del) ⇒ <code>string</code>
    * [~deepDel(id, model)](#module_utils/methods..deepDel) ⇒ <code>string</code>
    * [~post(body, model)](#module_utils/methods..post) ⇒ <code>Array</code>
    * [~deepPost(id, body, parent, child, isSingle)](#module_utils/methods..deepPost) ⇒ <code>Array</code>
    * [~bulkPost(id, body, parentModel, childModel)](#module_utils/methods..bulkPost)

<a name="module_utils/methods..get"></a>

### utils/methods~get(id, model, populateObj) ⇒
<p>Gets a mongoose document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <p>documents of the model.</p>  
**See**: in reference to http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the model.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..deepGet"></a>

### utils/methods~deepGet(id, parent, child, isSingle)
<p>Gets a child or children from its parent.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent mongoose model.</p> |
| parent | <code>Model</code> | <p>mongoose model.</p> |
| child | <code>Model</code> | <p>mongoose model.</p> |
| isSingle | <code>boolean</code> | <p>whether child has a one-to-one or one-to-many relation with its parent.</p> |

<a name="module_utils/methods..getAll"></a>

### utils/methods~getAll(model, populateObj)
<p>Gets all documents of a specific model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..put"></a>

### utils/methods~put(id, body, model)
<p>Updates a specific document by using its model and its id.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| body | <code>object</code> | <p>that will be used to update the document.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |

<a name="module_utils/methods..del"></a>

### utils/methods~del(id, model) ⇒ <code>string</code>
<p>Deletes a document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepDel"></a>

### utils/methods~deepDel(id, model) ⇒ <code>string</code>
<p>Deletes child documents of a parent document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..post"></a>

### utils/methods~post(body, model) ⇒ <code>Array</code>
<p>Creates one or more new documents with the model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of documents.</p>  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | <p>of the new document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepPost"></a>

### utils/methods~deepPost(id, body, parent, child, isSingle) ⇒ <code>Array</code>
<p>Creates one or many children under a parent model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of childs.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent.</p> |
| body | <code>object</code> | <p>of the child or children.</p> |
| parent | <code>Model</code> | <p>model of the existing document.</p> |
| child | <code>Model</code> | <p>model of the soon to be children or child.</p> |
| isSingle | <code>boolean</code> | <p>indicates whether one or multiple children are created.</p> |

<a name="module_utils/methods..bulkPost"></a>

### utils/methods~bulkPost(id, body, parentModel, childModel)
<p>Creates children and grandchildren in bulk.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | <p>ID of a parent.</p> |
| body | <code>\*</code> | <p>of structure: parent: { children: [ grandChild or grandChildren ] }</p> |
| parentModel | <code>\*</code> | <p>model of parent.</p> |
| childModel | <code>\*</code> | <p>model of child.</p> |

<a name="module_utils/methods..get"></a>

### utils/methods~get(id, model, populateObj) ⇒
<p>Gets a mongoose document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <p>documents of the model.</p>  
**See**: in reference to http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the model.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..deepGet"></a>

### utils/methods~deepGet(id, parent, child, isSingle)
<p>Gets a child or children from its parent.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent mongoose model.</p> |
| parent | <code>Model</code> | <p>mongoose model.</p> |
| child | <code>Model</code> | <p>mongoose model.</p> |
| isSingle | <code>boolean</code> | <p>whether child has a one-to-one or one-to-many relation with its parent.</p> |

<a name="module_utils/methods..getAll"></a>

### utils/methods~getAll(model, populateObj)
<p>Gets all documents of a specific model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..put"></a>

### utils/methods~put(id, body, model)
<p>Updates a specific document by using its model and its id.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| body | <code>object</code> | <p>that will be used to update the document.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |

<a name="module_utils/methods..del"></a>

### utils/methods~del(id, model) ⇒ <code>string</code>
<p>Deletes a document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepDel"></a>

### utils/methods~deepDel(id, model) ⇒ <code>string</code>
<p>Deletes child documents of a parent document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..post"></a>

### utils/methods~post(body, model) ⇒ <code>Array</code>
<p>Creates one or more new documents with the model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of documents.</p>  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | <p>of the new document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepPost"></a>

### utils/methods~deepPost(id, body, parent, child, isSingle) ⇒ <code>Array</code>
<p>Creates one or many children under a parent model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of childs.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent.</p> |
| body | <code>object</code> | <p>of the child or children.</p> |
| parent | <code>Model</code> | <p>model of the existing document.</p> |
| child | <code>Model</code> | <p>model of the soon to be children or child.</p> |
| isSingle | <code>boolean</code> | <p>indicates whether one or multiple children are created.</p> |

<a name="module_utils/methods..bulkPost"></a>

### utils/methods~bulkPost(id, body, parentModel, childModel)
<p>Creates children and grandchildren in bulk.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | <p>ID of a parent.</p> |
| body | <code>\*</code> | <p>of structure: parent: { children: [ grandChild or grandChildren ] }</p> |
| parentModel | <code>\*</code> | <p>model of parent.</p> |
| childModel | <code>\*</code> | <p>model of child.</p> |

<a name="module_API/authentication"></a>

## API/authentication

* [API/authentication](#module_API/authentication)
    * [.POST|auth/login()](#module_API/authentication.POST|auth/login)
    * [.GET|auth/logout()](#module_API/authentication.GET|auth/logout)
    * [.POST|auth/login()](#module_API/authentication.POST|auth/login)
    * [.GET|auth/logout()](#module_API/authentication.GET|auth/logout)

<a name="module_API/authentication.POST|auth/login"></a>

### API/authentication.POST|auth/login()
<p>Login route that generates a token for the client.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  

| Param | Description |
| --- | --- |
| req.body.username | <p>the username of the user.</p> |
| req.body.password | <p>the password of the user.</p> |

<a name="module_API/authentication.GET|auth/logout"></a>

### API/authentication.GET|auth/logout()
<p>Logout route.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  
<a name="module_API/authentication.POST|auth/login"></a>

### API/authentication.POST|auth/login()
<p>Login route that generates a token for the client.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  

| Param | Description |
| --- | --- |
| req.body.username | <p>the username of the user.</p> |
| req.body.password | <p>the password of the user.</p> |

<a name="module_API/authentication.GET|auth/logout"></a>

### API/authentication.GET|auth/logout()
<p>Logout route.</p>

**Kind**: static method of [<code>API/authentication</code>](#module_API/authentication)  
<a name="module_API/verification"></a>

## API/verification

* [API/verification](#module_API/verification)
    * [~verify(req, res, next)](#module_API/verification..verify)
    * [~verify(req, res, next)](#module_API/verification..verify)

<a name="module_API/verification..verify"></a>

### API/verification~verify(req, res, next)
<p>This function will check whether the req.params.id is a mongoDB ObjectId
and verify the token of every request.</p>

**Kind**: inner method of [<code>API/verification</code>](#module_API/verification)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>express request object.</p> |
| res | <code>\*</code> | <p>express response object.</p> |
| next | <code>\*</code> | <p>express next function.</p> |

<a name="module_API/verification..verify"></a>

### API/verification~verify(req, res, next)
<p>This function will check whether the req.params.id is a mongoDB ObjectId
and verify the token of every request.</p>

**Kind**: inner method of [<code>API/verification</code>](#module_API/verification)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>express request object.</p> |
| res | <code>\*</code> | <p>express response object.</p> |
| next | <code>\*</code> | <p>express next function.</p> |

<a name="module_API/correction"></a>

## API/correction

* [API/correction](#module_API/correction)
    * _static_
        * [.GET|correct/:id()](#module_API/correction.GET|correct/_id) ⇒ <code>Submission</code>
        * [.GET|correct/:id()](#module_API/correction.GET|correct/_id) ⇒ <code>Submission</code>
    * _inner_
        * [~beginCorrection(answers)](#module_API/correction..beginCorrection) ⇒ <code>Promise</code>
        * [~checkAnswer(answer, solution, task)](#module_API/correction..checkAnswer) ⇒ <code>Array</code>
        * [~beginCorrection(answers)](#module_API/correction..beginCorrection) ⇒ <code>Promise</code>
        * [~checkAnswer(answer, solution, task)](#module_API/correction..checkAnswer) ⇒ <code>Array</code>

<a name="module_API/correction.GET|correct/_id"></a>

### API/correction.GET|correct/:id() ⇒ <code>Submission</code>
<p>Corrects a submission by id.</p>

**Kind**: static method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Submission</code> - <p>and depending on the correction an {Array} of {CorrectionError}.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/correction.GET|correct/_id"></a>

### API/correction.GET|correct/:id() ⇒ <code>Submission</code>
<p>Corrects a submission by id.</p>

**Kind**: static method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Submission</code> - <p>and depending on the correction an {Array} of {CorrectionError}.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/correction..beginCorrection"></a>

### API/correction~beginCorrection(answers) ⇒ <code>Promise</code>
<p>Starts the correction process with each answer.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Promise</code> - <p>Promise.</p>  

| Param | Type | Description |
| --- | --- | --- |
| answers | <code>Array</code> | <p>Array of {Answer}.</p> |

<a name="module_API/correction..checkAnswer"></a>

### API/correction~checkAnswer(answer, solution, task) ⇒ <code>Array</code>
<p>Validates each answer, saves new points and return the errors of this process.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Array</code> - <p>of {CorrectionError}</p>  

| Param | Type |
| --- | --- |
| answer | <code>Answer</code> | 
| solution | <code>Solution</code> | 
| task | <code>Task</code> | 

<a name="module_API/correction..beginCorrection"></a>

### API/correction~beginCorrection(answers) ⇒ <code>Promise</code>
<p>Starts the correction process with each answer.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Promise</code> - <p>Promise.</p>  

| Param | Type | Description |
| --- | --- | --- |
| answers | <code>Array</code> | <p>Array of {Answer}.</p> |

<a name="module_API/correction..checkAnswer"></a>

### API/correction~checkAnswer(answer, solution, task) ⇒ <code>Array</code>
<p>Validates each answer, saves new points and return the errors of this process.</p>

**Kind**: inner method of [<code>API/correction</code>](#module_API/correction)  
**Returns**: <code>Array</code> - <p>of {CorrectionError}</p>  

| Param | Type |
| --- | --- |
| answer | <code>Answer</code> | 
| solution | <code>Solution</code> | 
| task | <code>Task</code> | 

<a name="module_database"></a>

## database

* [database](#module_database)
    * [~connect()](#module_database..connect) ⇒ <code>Promise</code>
    * [~disconnect()](#module_database..disconnect) ⇒ <code>Promise</code>
    * [~connect()](#module_database..connect) ⇒ <code>Promise</code>
    * [~disconnect()](#module_database..disconnect) ⇒ <code>Promise</code>

<a name="module_database..connect"></a>

### database~connect() ⇒ <code>Promise</code>
<p>Connects to the database depending on the database settings.json variable MODE.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
**See**: settings.json  
<a name="module_database..disconnect"></a>

### database~disconnect() ⇒ <code>Promise</code>
<p>Disconnects from the database.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
<a name="module_database..connect"></a>

### database~connect() ⇒ <code>Promise</code>
<p>Connects to the database depending on the database settings.json variable MODE.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
**See**: settings.json  
<a name="module_database..disconnect"></a>

### database~disconnect() ⇒ <code>Promise</code>
<p>Disconnects from the database.</p>

**Kind**: inner method of [<code>database</code>](#module_database)  
**Returns**: <code>Promise</code> - <p>{Promise}</p>  
<a name="module_models/course"></a>

## models/course

* [models/course](#module_models/course)
    * [~Schema: Course](#module_models/course..Schema_ Course)
    * [~Schema: Course](#module_models/course..Schema_ Course)

<a name="module_models/course..Schema_ Course"></a>

### models/course~Schema: Course
**Kind**: inner class of [<code>models/course</code>](#module_models/course)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| institute | <code>string</code> | <p>required</p> |
| semester | <code>string</code> | <p>required</p> |
| min_req_sheets | <code>string</code> | <p>required, Minimal amount of sheets to pass the course.</p> |
| sheets | <code>Array.&lt;Sheet&gt;</code> | <p>optional</p> |

<a name="module_models/course..Schema_ Course"></a>

### models/course~Schema: Course
**Kind**: inner class of [<code>models/course</code>](#module_models/course)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| institute | <code>string</code> | <p>required</p> |
| semester | <code>string</code> | <p>required</p> |
| min_req_sheets | <code>string</code> | <p>required, Minimal amount of sheets to pass the course.</p> |
| sheets | <code>Array.&lt;Sheet&gt;</code> | <p>optional</p> |

<a name="module_models/sheet"></a>

## models/sheet

* [models/sheet](#module_models/sheet)
    * [~Schema: Sheet](#module_models/sheet..Schema_ Sheet)
    * [~Schema: Exercise](#module_models/sheet..Schema_ Exercise)
    * [~Schema: Task](#module_models/sheet..Schema_ Task)
    * [~Schema: Solution](#module_models/sheet..Schema_ Solution)
    * [~Schema: Sheet](#module_models/sheet..Schema_ Sheet)
    * [~Schema: Exercise](#module_models/sheet..Schema_ Exercise)
    * [~Schema: Task](#module_models/sheet..Schema_ Task)
    * [~Schema: Solution](#module_models/sheet..Schema_ Solution)

<a name="module_models/sheet..Schema_ Sheet"></a>

### models/sheet~Schema: Sheet
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| submissions | <code>Array.&lt;Submission&gt;</code> | <p>optional</p> |
| submissiondate | <code>Date</code> | <p>required</p> |
| exercises | <code>Array.&lt;Exercise&gt;</code> | <p>optional</p> |
| min_req_points | <code>number</code> | <p>required, Minimal amount of points to pass the sheet.</p> |
| order | <code>number</code> | <p>default: 0</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |
| template | <code>object</code> |  |
| template.flag | <code>boolean</code> | <p>default: false</p> |
| template.correctly | <code>boolean</code> | <p>default: true</p> |
| template.points | <code>number</code> | <p>default: 0</p> |

<a name="module_models/sheet..Schema_ Exercise"></a>

### models/sheet~Schema: Exercise
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| description | <code>string</code> | <p>required</p> |
| tasks | <code>Array.&lt;Task&gt;</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |

<a name="module_models/sheet..Schema_ Task"></a>

### models/sheet~Schema: Task
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| question | <code>string</code> | <p>required</p> |
| points | <code>number</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| choices | <code>Array.&lt;string&gt;</code> | <p>required</p> |
| solution | <code>Solution</code> | <p>optional</p> |

<a name="module_models/sheet..Schema_ Solution"></a>

### models/sheet~Schema: Solution
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>required</p> |
| regex | <code>string</code> | <p>optional</p> |
| range | <code>object</code> | <p>optional</p> |
| range.from | <code>number</code> | <p>optional</p> |
| range.to | <code>number</code> | <p>optional</p> |
| number | <code>number</code> | <p>optional</p> |
| hint | <code>string</code> | <p>optional</p> |
| default_free_text | <code>boolean</code> | <p>optional, if true then auto-correct will give points, if false -&gt; 0</p> |

<a name="module_models/sheet..Schema_ Sheet"></a>

### models/sheet~Schema: Sheet
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| submissions | <code>Array.&lt;Submission&gt;</code> | <p>optional</p> |
| submissiondate | <code>Date</code> | <p>required</p> |
| exercises | <code>Array.&lt;Exercise&gt;</code> | <p>optional</p> |
| min_req_points | <code>number</code> | <p>required, Minimal amount of points to pass the sheet.</p> |
| order | <code>number</code> | <p>default: 0</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |
| template | <code>object</code> |  |
| template.flag | <code>boolean</code> | <p>default: false</p> |
| template.correctly | <code>boolean</code> | <p>default: true</p> |
| template.points | <code>number</code> | <p>default: 0</p> |

<a name="module_models/sheet..Schema_ Exercise"></a>

### models/sheet~Schema: Exercise
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| description | <code>string</code> | <p>required</p> |
| tasks | <code>Array.&lt;Task&gt;</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| persistent | <code>boolean</code> | <p>default: false</p> |

<a name="module_models/sheet..Schema_ Task"></a>

### models/sheet~Schema: Task
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| question | <code>string</code> | <p>required</p> |
| points | <code>number</code> | <p>required</p> |
| order | <code>number</code> | <p>required</p> |
| choices | <code>Array.&lt;string&gt;</code> | <p>required</p> |
| solution | <code>Solution</code> | <p>optional</p> |

<a name="module_models/sheet..Schema_ Solution"></a>

### models/sheet~Schema: Solution
**Kind**: inner class of [<code>models/sheet</code>](#module_models/sheet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>required</p> |
| regex | <code>string</code> | <p>optional</p> |
| range | <code>object</code> | <p>optional</p> |
| range.from | <code>number</code> | <p>optional</p> |
| range.to | <code>number</code> | <p>optional</p> |
| number | <code>number</code> | <p>optional</p> |
| hint | <code>string</code> | <p>optional</p> |
| default_free_text | <code>boolean</code> | <p>optional, if true then auto-correct will give points, if false -&gt; 0</p> |

<a name="module_models/submission"></a>

## models/submission

* [models/submission](#module_models/submission)
    * [~Schema: Submission](#module_models/submission..Schema_ Submission)
    * [~Schema: Answer](#module_models/submission..Schema_ Answer)
    * [~Schema: Student](#module_models/submission..Schema_ Student)
    * [~Schema: Submission](#module_models/submission..Schema_ Submission)
    * [~Schema: Answer](#module_models/submission..Schema_ Answer)
    * [~Schema: Student](#module_models/submission..Schema_ Student)

<a name="module_models/submission..Schema_ Submission"></a>

### models/submission~Schema: Submission
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| student | <code>Student</code> | <p>required</p> |
| answers | <code>Array.&lt;Answer&gt;</code> | <p>required</p> |
| user | <code>User</code> | <p>optional</p> |
| grips_id | <code>string</code> | <p>required</p> |

<a name="module_models/submission..Schema_ Answer"></a>

### models/submission~Schema: Answer
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | <p>required</p> |
| task | <code>Task</code> | <p>optional</p> |
| feedback | <code>string</code> | <p>optional</p> |
| auto_corrected | <code>boolean</code> | <p>optional, auto correction flag.</p> |
| corrected | <code>boolean</code> | <p>optional, manual correction flag.</p> |
| help | <code>boolean</code> | <p>optional</p> |
| achieved_points | <code>number</code> | <p>optional</p> |

<a name="module_models/submission..Schema_ Student"></a>

### models/submission~Schema: Student
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| lastname | <code>string</code> | <p>optional</p> |
| mat_nr | <code>string</code> | <p>required</p> |
| status | <code>string</code> | <p>optional</p> |

<a name="module_models/submission..Schema_ Submission"></a>

### models/submission~Schema: Submission
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| student | <code>Student</code> | <p>required</p> |
| answers | <code>Array.&lt;Answer&gt;</code> | <p>required</p> |
| user | <code>User</code> | <p>optional</p> |
| grips_id | <code>string</code> | <p>required</p> |

<a name="module_models/submission..Schema_ Answer"></a>

### models/submission~Schema: Answer
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | <p>required</p> |
| task | <code>Task</code> | <p>optional</p> |
| feedback | <code>string</code> | <p>optional</p> |
| auto_corrected | <code>boolean</code> | <p>optional, auto correction flag.</p> |
| corrected | <code>boolean</code> | <p>optional, manual correction flag.</p> |
| help | <code>boolean</code> | <p>optional</p> |
| achieved_points | <code>number</code> | <p>optional</p> |

<a name="module_models/submission..Schema_ Student"></a>

### models/submission~Schema: Student
**Kind**: inner class of [<code>models/submission</code>](#module_models/submission)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required</p> |
| lastname | <code>string</code> | <p>optional</p> |
| mat_nr | <code>string</code> | <p>required</p> |
| status | <code>string</code> | <p>optional</p> |

<a name="module_models/user"></a>

## models/user

* [models/user](#module_models/user)
    * [~Schema: User](#module_models/user..Schema_ User)
    * [~Schema: Role](#module_models/user..Schema_ Role)
    * [~Schema: User](#module_models/user..Schema_ User)
    * [~Schema: Role](#module_models/user..Schema_ Role)

<a name="module_models/user..Schema_ User"></a>

### models/user~Schema: User
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | <p>required</p> |
| password | <code>string</code> | <p>optional</p> |
| forename | <code>string</code> | <p>optional</p> |
| lastname | <code>string</code> | <p>optional</p> |
| email | <code>string</code> | <p>optional</p> |
| role | <code>Role</code> | <p>required</p> |
| courses | <code>Array.&lt;Course&gt;</code> | <p>optional</p> |

<a name="module_models/user..Schema_ Role"></a>

### models/user~Schema: Role
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required, enum: ['admin', 'lecturer', 'tutor']</p> |

<a name="module_models/user..Schema_ User"></a>

### models/user~Schema: User
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | <p>required</p> |
| password | <code>string</code> | <p>optional</p> |
| forename | <code>string</code> | <p>optional</p> |
| lastname | <code>string</code> | <p>optional</p> |
| email | <code>string</code> | <p>optional</p> |
| role | <code>Role</code> | <p>required</p> |
| courses | <code>Array.&lt;Course&gt;</code> | <p>optional</p> |

<a name="module_models/user..Schema_ Role"></a>

### models/user~Schema: Role
**Kind**: inner class of [<code>models/user</code>](#module_models/user)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>required, enum: ['admin', 'lecturer', 'tutor']</p> |

<a name="module_utils/errors"></a>

## utils/errors
<p>Errors</p>


* [utils/errors](#module_utils/errors)
    * [~StatusError](#module_utils/errors..StatusError)
    * [~CorrectionError](#module_utils/errors..CorrectionError)
    * [~StatusError](#module_utils/errors..StatusError)
    * [~CorrectionError](#module_utils/errors..CorrectionError)

<a name="module_utils/errors..StatusError"></a>

### utils/errors~StatusError
<p>StatusError for failures in the routing process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/errors..CorrectionError"></a>

### utils/errors~CorrectionError
<p>CorrectionError for failures in the auto correction process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/errors..StatusError"></a>

### utils/errors~StatusError
<p>StatusError for failures in the routing process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/errors..CorrectionError"></a>

### utils/errors~CorrectionError
<p>CorrectionError for failures in the auto correction process.</p>

**Kind**: inner class of [<code>utils/errors</code>](#module_utils/errors)  
<a name="module_utils/logging"></a>

## utils/logging
<p>Logging</p>


* [utils/logging](#module_utils/logging)
    * [~logRoute(req, res)](#module_utils/logging..logRoute)
    * [~logRoute(req, res)](#module_utils/logging..logRoute)

<a name="module_utils/logging..logRoute"></a>

### utils/logging~logRoute(req, res)
<p>Logging express routes. This is used for the API calls.</p>

**Kind**: inner method of [<code>utils/logging</code>](#module_utils/logging)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>request object of express with an additional error key value pair.</p> |
| res | <code>\*</code> | <p>response object of express.</p> |

<a name="module_utils/logging..logRoute"></a>

### utils/logging~logRoute(req, res)
<p>Logging express routes. This is used for the API calls.</p>

**Kind**: inner method of [<code>utils/logging</code>](#module_utils/logging)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>\*</code> | <p>request object of express with an additional error key value pair.</p> |
| res | <code>\*</code> | <p>response object of express.</p> |

<a name="module_utils/methods"></a>

## utils/methods
<p>Methods</p>


* [utils/methods](#module_utils/methods)
    * [~get(id, model, populateObj)](#module_utils/methods..get) ⇒
    * [~deepGet(id, parent, child, isSingle)](#module_utils/methods..deepGet)
    * [~getAll(model, populateObj)](#module_utils/methods..getAll)
    * [~put(id, body, model)](#module_utils/methods..put)
    * [~del(id, model)](#module_utils/methods..del) ⇒ <code>string</code>
    * [~deepDel(id, model)](#module_utils/methods..deepDel) ⇒ <code>string</code>
    * [~post(body, model)](#module_utils/methods..post) ⇒ <code>Array</code>
    * [~deepPost(id, body, parent, child, isSingle)](#module_utils/methods..deepPost) ⇒ <code>Array</code>
    * [~bulkPost(id, body, parentModel, childModel)](#module_utils/methods..bulkPost)
    * [~get(id, model, populateObj)](#module_utils/methods..get) ⇒
    * [~deepGet(id, parent, child, isSingle)](#module_utils/methods..deepGet)
    * [~getAll(model, populateObj)](#module_utils/methods..getAll)
    * [~put(id, body, model)](#module_utils/methods..put)
    * [~del(id, model)](#module_utils/methods..del) ⇒ <code>string</code>
    * [~deepDel(id, model)](#module_utils/methods..deepDel) ⇒ <code>string</code>
    * [~post(body, model)](#module_utils/methods..post) ⇒ <code>Array</code>
    * [~deepPost(id, body, parent, child, isSingle)](#module_utils/methods..deepPost) ⇒ <code>Array</code>
    * [~bulkPost(id, body, parentModel, childModel)](#module_utils/methods..bulkPost)

<a name="module_utils/methods..get"></a>

### utils/methods~get(id, model, populateObj) ⇒
<p>Gets a mongoose document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <p>documents of the model.</p>  
**See**: in reference to http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the model.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..deepGet"></a>

### utils/methods~deepGet(id, parent, child, isSingle)
<p>Gets a child or children from its parent.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent mongoose model.</p> |
| parent | <code>Model</code> | <p>mongoose model.</p> |
| child | <code>Model</code> | <p>mongoose model.</p> |
| isSingle | <code>boolean</code> | <p>whether child has a one-to-one or one-to-many relation with its parent.</p> |

<a name="module_utils/methods..getAll"></a>

### utils/methods~getAll(model, populateObj)
<p>Gets all documents of a specific model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..put"></a>

### utils/methods~put(id, body, model)
<p>Updates a specific document by using its model and its id.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| body | <code>object</code> | <p>that will be used to update the document.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |

<a name="module_utils/methods..del"></a>

### utils/methods~del(id, model) ⇒ <code>string</code>
<p>Deletes a document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepDel"></a>

### utils/methods~deepDel(id, model) ⇒ <code>string</code>
<p>Deletes child documents of a parent document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..post"></a>

### utils/methods~post(body, model) ⇒ <code>Array</code>
<p>Creates one or more new documents with the model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of documents.</p>  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | <p>of the new document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepPost"></a>

### utils/methods~deepPost(id, body, parent, child, isSingle) ⇒ <code>Array</code>
<p>Creates one or many children under a parent model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of childs.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent.</p> |
| body | <code>object</code> | <p>of the child or children.</p> |
| parent | <code>Model</code> | <p>model of the existing document.</p> |
| child | <code>Model</code> | <p>model of the soon to be children or child.</p> |
| isSingle | <code>boolean</code> | <p>indicates whether one or multiple children are created.</p> |

<a name="module_utils/methods..bulkPost"></a>

### utils/methods~bulkPost(id, body, parentModel, childModel)
<p>Creates children and grandchildren in bulk.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | <p>ID of a parent.</p> |
| body | <code>\*</code> | <p>of structure: parent: { children: [ grandChild or grandChildren ] }</p> |
| parentModel | <code>\*</code> | <p>model of parent.</p> |
| childModel | <code>\*</code> | <p>model of child.</p> |

<a name="module_utils/methods..get"></a>

### utils/methods~get(id, model, populateObj) ⇒
<p>Gets a mongoose document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <p>documents of the model.</p>  
**See**: in reference to http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the model.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..deepGet"></a>

### utils/methods~deepGet(id, parent, child, isSingle)
<p>Gets a child or children from its parent.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent mongoose model.</p> |
| parent | <code>Model</code> | <p>mongoose model.</p> |
| child | <code>Model</code> | <p>mongoose model.</p> |
| isSingle | <code>boolean</code> | <p>whether child has a one-to-one or one-to-many relation with its parent.</p> |

<a name="module_utils/methods..getAll"></a>

### utils/methods~getAll(model, populateObj)
<p>Gets all documents of a specific model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Model</code> | <p>specific mongoose model.</p> |
| populateObj | <code>object</code> | <p>object with populate parameters.</p> |

<a name="module_utils/methods..put"></a>

### utils/methods~put(id, body, model)
<p>Updates a specific document by using its model and its id.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| body | <code>object</code> | <p>that will be used to update the document.</p> |
| model | <code>Model</code> | <p>specific mongoose model.</p> |

<a name="module_utils/methods..del"></a>

### utils/methods~del(id, model) ⇒ <code>string</code>
<p>Deletes a document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepDel"></a>

### utils/methods~deepDel(id, model) ⇒ <code>string</code>
<p>Deletes child documents of a parent document.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>string</code> - <p>success message.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..post"></a>

### utils/methods~post(body, model) ⇒ <code>Array</code>
<p>Creates one or more new documents with the model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of documents.</p>  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>object</code> | <p>of the new document.</p> |
| model | <code>Model</code> | <p>its mongoose model.</p> |

<a name="module_utils/methods..deepPost"></a>

### utils/methods~deepPost(id, body, parent, child, isSingle) ⇒ <code>Array</code>
<p>Creates one or many children under a parent model.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  
**Returns**: <code>Array</code> - <p>Array of childs.</p>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of the parent.</p> |
| body | <code>object</code> | <p>of the child or children.</p> |
| parent | <code>Model</code> | <p>model of the existing document.</p> |
| child | <code>Model</code> | <p>model of the soon to be children or child.</p> |
| isSingle | <code>boolean</code> | <p>indicates whether one or multiple children are created.</p> |

<a name="module_utils/methods..bulkPost"></a>

### utils/methods~bulkPost(id, body, parentModel, childModel)
<p>Creates children and grandchildren in bulk.</p>

**Kind**: inner method of [<code>utils/methods</code>](#module_utils/methods)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | <p>ID of a parent.</p> |
| body | <code>\*</code> | <p>of structure: parent: { children: [ grandChild or grandChildren ] }</p> |
| parentModel | <code>\*</code> | <p>model of parent.</p> |
| childModel | <code>\*</code> | <p>model of child.</p> |

<a name="module_API/answers"></a>

## API/answers
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/answers](#module_API/answers)
    * [.GET|answers/:id()](#module_API/answers.GET|answers/_id) ⇒ <code>Answer</code>
    * [.PUT|answers/:id()](#module_API/answers.PUT|answers/_id) ⇒ <code>Answer</code>
    * [.GET|answers/:id()](#module_API/answers.GET|answers/_id) ⇒ <code>Answer</code>
    * [.PUT|answers/:id()](#module_API/answers.PUT|answers/_id) ⇒ <code>Answer</code>

<a name="module_API/answers.GET|answers/_id"></a>

### API/answers.GET|answers/:id() ⇒ <code>Answer</code>
<p>Gets an answer by id.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id | <code>string</code> | <p>ID of a answer.</p> |

<a name="module_API/answers.PUT|answers/_id"></a>

### API/answers.PUT|answers/:id() ⇒ <code>Answer</code>
<p>Updates an answer.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Answer</code> | <p>One or more answers.</p> |

<a name="module_API/answers.GET|answers/_id"></a>

### API/answers.GET|answers/:id() ⇒ <code>Answer</code>
<p>Gets an answer by id.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id | <code>string</code> | <p>ID of a answer.</p> |

<a name="module_API/answers.PUT|answers/_id"></a>

### API/answers.PUT|answers/:id() ⇒ <code>Answer</code>
<p>Updates an answer.</p>

**Kind**: static method of [<code>API/answers</code>](#module_API/answers)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Answer</code> | <p>One or more answers.</p> |

<a name="module_API/courses"></a>

## API/courses
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/courses](#module_API/courses)
    * [.GET|courses()](#module_API/courses.GET|courses) ⇒ <code>Array</code>
    * [.GET|courses/_search()](#module_API/courses.GET|courses/_search) ⇒ <code>Array</code>
    * [.GET|courses/:id()](#module_API/courses.GET|courses/_id) ⇒ <code>Course</code>
    * [.POST|courses()](#module_API/courses.POST|courses) ⇒ <code>Array</code> \| <code>Course</code>
    * [.PUT|courses/:id()](#module_API/courses.PUT|courses/_id) ⇒ <code>Course</code>
    * [.DELETE|courses/:id()](#module_API/courses.DELETE|courses/_id) ⇒ <code>string</code>
    * [.GET|courses/:id/students()](#module_API/courses.GET|courses/_id/students) ⇒ <code>Array</code>
    * [.GET|courses/:id/sheets()](#module_API/courses.GET|courses/_id/sheets) ⇒ <code>Array</code>
    * [.POST|courses/:id/sheets()](#module_API/courses.POST|courses/_id/sheets) ⇒ <code>Array</code> \| <code>Sheet</code>
    * [.GET|courses()](#module_API/courses.GET|courses) ⇒ <code>Array</code>
    * [.GET|courses/_search()](#module_API/courses.GET|courses/_search) ⇒ <code>Array</code>
    * [.GET|courses/:id()](#module_API/courses.GET|courses/_id) ⇒ <code>Course</code>
    * [.POST|courses()](#module_API/courses.POST|courses) ⇒ <code>Array</code> \| <code>Course</code>
    * [.PUT|courses/:id()](#module_API/courses.PUT|courses/_id) ⇒ <code>Course</code>
    * [.DELETE|courses/:id()](#module_API/courses.DELETE|courses/_id) ⇒ <code>string</code>
    * [.GET|courses/:id/students()](#module_API/courses.GET|courses/_id/students) ⇒ <code>Array</code>
    * [.GET|courses/:id/sheets()](#module_API/courses.GET|courses/_id/sheets) ⇒ <code>Array</code>
    * [.POST|courses/:id/sheets()](#module_API/courses.POST|courses/_id/sheets) ⇒ <code>Array</code> \| <code>Sheet</code>

<a name="module_API/courses.GET|courses"></a>

### API/courses.GET|courses() ⇒ <code>Array</code>
<p>Gets all courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/courses.GET|courses/_search"></a>

### API/courses.GET|courses/_search() ⇒ <code>Array</code>
<p>Searches through all courses with a sheetID and returns found courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.sheet: | <code>string</code> | <p>id of a {Sheet}.</p> |

**Example**  
```js
courses/_search?sheet={ID}
```
<a name="module_API/courses.GET|courses/_id"></a>

### API/courses.GET|courses/:id() ⇒ <code>Course</code>
<p>Gets a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses"></a>

### API/courses.POST|courses() ⇒ <code>Array</code> \| <code>Course</code>
<p>Creates one or many courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Course</code> - <p>{Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Course</code> | <p>Array of or single course.</p> |

<a name="module_API/courses.PUT|courses/_id"></a>

### API/courses.PUT|courses/:id() ⇒ <code>Course</code>
<p>Updates a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |
| req.body | <code>Course</code> | <p>with updated values.</p> |

<a name="module_API/courses.DELETE|courses/_id"></a>

### API/courses.DELETE|courses/:id() ⇒ <code>string</code>
<p>Deletes a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/students"></a>

### API/courses.GET|courses/:id/students() ⇒ <code>Array</code>
<p>Gets all students of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/sheets"></a>

### API/courses.GET|courses/:id/sheets() ⇒ <code>Array</code>
<p>Gets all sheets of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses/_id/sheets"></a>

### API/courses.POST|courses/:id/sheets() ⇒ <code>Array</code> \| <code>Sheet</code>
<p>Creates one or many sheets.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Sheet</code> - <p>{Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Sheet</code> | <p>Array of sheets or single sheet.</p> |

<a name="module_API/courses.GET|courses"></a>

### API/courses.GET|courses() ⇒ <code>Array</code>
<p>Gets all courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/courses.GET|courses/_search"></a>

### API/courses.GET|courses/_search() ⇒ <code>Array</code>
<p>Searches through all courses with a sheetID and returns found courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.sheet: | <code>string</code> | <p>id of a {Sheet}.</p> |

**Example**  
```js
courses/_search?sheet={ID}
```
<a name="module_API/courses.GET|courses/_id"></a>

### API/courses.GET|courses/:id() ⇒ <code>Course</code>
<p>Gets a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses"></a>

### API/courses.POST|courses() ⇒ <code>Array</code> \| <code>Course</code>
<p>Creates one or many courses.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Course</code> - <p>{Course}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Course</code> | <p>Array of or single course.</p> |

<a name="module_API/courses.PUT|courses/_id"></a>

### API/courses.PUT|courses/:id() ⇒ <code>Course</code>
<p>Updates a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |
| req.body | <code>Course</code> | <p>with updated values.</p> |

<a name="module_API/courses.DELETE|courses/_id"></a>

### API/courses.DELETE|courses/:id() ⇒ <code>string</code>
<p>Deletes a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/students"></a>

### API/courses.GET|courses/:id/students() ⇒ <code>Array</code>
<p>Gets all students of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.GET|courses/_id/sheets"></a>

### API/courses.GET|courses/:id/sheets() ⇒ <code>Array</code>
<p>Gets all sheets of a course by id.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> - <p>of {Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a course.</p> |

<a name="module_API/courses.POST|courses/_id/sheets"></a>

### API/courses.POST|courses/:id/sheets() ⇒ <code>Array</code> \| <code>Sheet</code>
<p>Creates one or many sheets.</p>

**Kind**: static method of [<code>API/courses</code>](#module_API/courses)  
**Returns**: <code>Array</code> \| <code>Sheet</code> - <p>{Sheet}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> \| <code>Sheet</code> | <p>Array of sheets or single sheet.</p> |

<a name="module_API/exercises"></a>

## API/exercises
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/exercises](#module_API/exercises)
    * [.GET|exercises/:id/_aggregate()](#module_API/exercises.GET|exercises/_id/_aggregate) ⇒ <code>Exercise</code>
    * [.GET|exercises/:id()](#module_API/exercises.GET|exercises/_id) ⇒ <code>Exercise</code>
    * [.PUT|exercises/:id()](#module_API/exercises.PUT|exercises/_id) ⇒ <code>Exercise</code>
    * [.DELETE|exercises/:id()](#module_API/exercises.DELETE|exercises/_id) ⇒ <code>string</code>
    * [.GET|exercises/:id/tasks()](#module_API/exercises.GET|exercises/_id/tasks) ⇒ <code>Array</code>
    * [.POST|exercises/:id/tasks()](#module_API/exercises.POST|exercises/_id/tasks) ⇒ <code>Array</code>
    * [.GET|exercises/:id/_aggregate()](#module_API/exercises.GET|exercises/_id/_aggregate) ⇒ <code>Exercise</code>
    * [.GET|exercises/:id()](#module_API/exercises.GET|exercises/_id) ⇒ <code>Exercise</code>
    * [.PUT|exercises/:id()](#module_API/exercises.PUT|exercises/_id) ⇒ <code>Exercise</code>
    * [.DELETE|exercises/:id()](#module_API/exercises.DELETE|exercises/_id) ⇒ <code>string</code>
    * [.GET|exercises/:id/tasks()](#module_API/exercises.GET|exercises/_id/tasks) ⇒ <code>Array</code>
    * [.POST|exercises/:id/tasks()](#module_API/exercises.POST|exercises/_id/tasks) ⇒ <code>Array</code>

<a name="module_API/exercises.GET|exercises/_id/_aggregate"></a>

### API/exercises.GET|exercises/:id/_aggregate() ⇒ <code>Exercise</code>
<p>Gets an aggregated exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Exercise</code> - <p>with Tasks and a Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id"></a>

### API/exercises.GET|exercises/:id() ⇒ <code>Exercise</code>
<p>Gets an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.PUT|exercises/_id"></a>

### API/exercises.PUT|exercises/:id() ⇒ <code>Exercise</code>
<p>Updates an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Exercise</code> | <p>with updated values.</p> |

<a name="module_API/exercises.DELETE|exercises/_id"></a>

### API/exercises.DELETE|exercises/:id() ⇒ <code>string</code>
<p>Deletes an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id/tasks"></a>

### API/exercises.GET|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Gets all tasks of an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.POST|exercises/_id/tasks"></a>

### API/exercises.POST|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Creates tasks for an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Array</code> | <p>Array of tasks.</p> |

<a name="module_API/exercises.GET|exercises/_id/_aggregate"></a>

### API/exercises.GET|exercises/:id/_aggregate() ⇒ <code>Exercise</code>
<p>Gets an aggregated exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Exercise</code> - <p>with Tasks and a Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id"></a>

### API/exercises.GET|exercises/:id() ⇒ <code>Exercise</code>
<p>Gets an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.PUT|exercises/_id"></a>

### API/exercises.PUT|exercises/:id() ⇒ <code>Exercise</code>
<p>Updates an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Exercise</code> | <p>with updated values.</p> |

<a name="module_API/exercises.DELETE|exercises/_id"></a>

### API/exercises.DELETE|exercises/:id() ⇒ <code>string</code>
<p>Deletes an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.GET|exercises/_id/tasks"></a>

### API/exercises.GET|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Gets all tasks of an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |

<a name="module_API/exercises.POST|exercises/_id/tasks"></a>

### API/exercises.POST|exercises/:id/tasks() ⇒ <code>Array</code>
<p>Creates tasks for an exercise by id.</p>

**Kind**: static method of [<code>API/exercises</code>](#module_API/exercises)  
**Returns**: <code>Array</code> - <p>of {Task}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of an exercise.</p> |
| req.body | <code>Array</code> | <p>Array of tasks.</p> |

<a name="module_API/export"></a>

## API/export
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/export](#module_API/export)
    * _static_
        * [.CSVRenderer](#module_API/export.CSVRenderer)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
        * [.Renderer](#module_API/export.Renderer)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
        * [.CSVRenderer](#module_API/export.CSVRenderer)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
            * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
            * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
            * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
        * [.Renderer](#module_API/export.Renderer)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
            * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
            * [.output(type)](#module_API/export.Renderer+output)
            * [.send(res)](#module_API/export.Renderer+send)
            * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
            * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
            * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
        * [.GET|pdf/:id()](#module_API/export.GET|pdf/_id) ⇒ <code>PDF</code>
        * [.GET|docx/:id()](#module_API/export.GET|docx/_id) ⇒ <code>DOCX</code>
        * [.GET|csv/:id()](#module_API/export.GET|csv/_id) ⇒ <code>CSV</code>
        * [.GET|template/:id()](#module_API/export.GET|template/_id) ⇒ <code>TXT</code>
        * [.GET|pdf/:id()](#module_API/export.GET|pdf/_id) ⇒ <code>PDF</code>
        * [.GET|docx/:id()](#module_API/export.GET|docx/_id) ⇒ <code>DOCX</code>
        * [.GET|csv/:id()](#module_API/export.GET|csv/_id) ⇒ <code>CSV</code>
        * [.GET|template/:id()](#module_API/export.GET|template/_id) ⇒ <code>TXT</code>
    * _inner_
        * [~sendReport(id, type, res)](#module_API/export..sendReport)
        * [~getReportObj(sheetId)](#module_API/export..getReportObj)
        * [~getTemplate(sheet, mode)](#module_API/export..getTemplate)
        * [~toAlphabeticOrder(numerical)](#module_API/export..toAlphabeticOrder) ⇒
        * [~countOrderUpBy(obj, countUp)](#module_API/export..countOrderUpBy) ⇒
        * [~toReadableDate(str)](#module_API/export..toReadableDate)
        * [~sendReport(id, type, res)](#module_API/export..sendReport)
        * [~getReportObj(sheetId)](#module_API/export..getReportObj)
        * [~getTemplate(sheet, mode)](#module_API/export..getTemplate)
        * [~toAlphabeticOrder(numerical)](#module_API/export..toAlphabeticOrder) ⇒
        * [~countOrderUpBy(obj, countUp)](#module_API/export..countOrderUpBy) ⇒
        * [~toReadableDate(str)](#module_API/export..toReadableDate)

<a name="module_API/export.CSVRenderer"></a>

### API/export.CSVRenderer
**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.CSVRenderer](#module_API/export.CSVRenderer)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.Renderer"></a>

### API/export.Renderer
<p>Renderer defines jsreport specific template values and extensions.</p>

**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.Renderer](#module_API/export.Renderer)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.CSVRenderer"></a>

### API/export.CSVRenderer
**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.CSVRenderer](#module_API/export.CSVRenderer)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [new CSVRenderer()](#new_module_API/export.CSVRenderer_new)
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>
    * [.addHeader(header)](#module_API/export.CSVRenderer+addHeader)
    * [.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)](#module_API/export.CSVRenderer+addSubmission)
    * [.export()](#module_API/export.CSVRenderer+export) ⇒ <code>string</code>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="new_module_API/export.CSVRenderer_new"></a>

#### new CSVRenderer()
<p>Specific renderer for csv files to be used by GRIPS.</p>

<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.CSVRenderer+addHeader"></a>

#### csvRenderer.addHeader(header)
<p>Adds a header line to the csv.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>string</code> | <p>heading line.</p> |

<a name="module_API/export.CSVRenderer+addSubmission"></a>

#### csvRenderer.addSubmission(submission, sheetOrder, requiredPoints, maxPoints, template)
<p>This method will parse a submission to a valid csv line and adds it to the csv string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| submission | <code>Object</code> | <p>a submission object.</p> |
| submission.answers | <code>Array.&lt;Object&gt;</code> | <p>with an answer array.</p> |
| submission.user | <code>Object</code> | <p>with an user object.</p> |
| submission.grips_id | <code>string</code> | <p>the submission id generated by GRIPS.</p> |
| sheetOrder | <code>number</code> | <p>the order of a sheet.</p> |
| requiredPoints | <code>number</code> | <p>the required points to pass the sheet.</p> |
| maxPoints | <code>number</code> | <p>the maximum points achievable.</p> |
| template | <code>Object</code> | <p>object that defines whether a template exercise was chosen. This case needs an extra line.</p> |

<a name="module_API/export.CSVRenderer+export"></a>

#### csvRenderer.export() ⇒ <code>string</code>
<p>Returns the csv data as string.</p>

**Kind**: instance method of [<code>CSVRenderer</code>](#module_API/export.CSVRenderer)  
**Returns**: <code>string</code> - <p>csv as string.</p>  
<a name="module_API/export.Renderer"></a>

### API/export.Renderer
<p>Renderer defines jsreport specific template values and extensions.</p>

**Kind**: static class of [<code>API/export</code>](#module_API/export)  

* [.Renderer](#module_API/export.Renderer)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)
    * [.addHelper(helper)](#module_API/export.Renderer+addHelper)
    * [.output(type)](#module_API/export.Renderer+output)
    * [.send(res)](#module_API/export.Renderer+send)
    * [.helpers.calcPoints(exercise)](#module_API/export.Renderer+helpers.calcPoints)
    * [.helpers.addTemplateExercise(sheet)](#module_API/export.Renderer+helpers.addTemplateExercise)
    * [.helpers.addNameSubmissionFile(sheetOrder)](#module_API/export.Renderer+helpers.addNameSubmissionFile)

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.Renderer+addHelper"></a>

#### renderer.addHelper(helper)
<p>Adds a helper function to use in the template html.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| helper | <code>function</code> | <p>function with name.</p> |

<a name="module_API/export.Renderer+output"></a>

#### renderer.output(type)
<p>This setter specifies the output type.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | <p>('docx'|'pdf')</p> |

<a name="module_API/export.Renderer+send"></a>

#### renderer.send(res)
<p>Sends a pdf or docx depending on the type.
When docx is selected, jsreport will render the html output</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export.Renderer+helpers.calcPoints"></a>

#### renderer.helpers.calcPoints(exercise)
<p>This function is a helper function.
It calculates the points of an exercise.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| exercise | <code>object</code> | <p>{Exercise}.</p> |

<a name="module_API/export.Renderer+helpers.addTemplateExercise"></a>

#### renderer.helpers.addTemplateExercise(sheet)
<p>This function is a helper function.
It adds the template exercise, if the flag is set.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>Sheet</code> | <p>{Sheet}.</p> |

<a name="module_API/export.Renderer+helpers.addNameSubmissionFile"></a>

#### renderer.helpers.addNameSubmissionFile(sheetOrder)
<p>This function is a helper function.
It adds the right order of a sheet to the name of the submission file.</p>

**Kind**: instance method of [<code>Renderer</code>](#module_API/export.Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| sheetOrder | <code>number</code> | <p>order of a {Sheet}.</p> |

<a name="module_API/export.GET|pdf/_id"></a>

### API/export.GET|pdf/:id() ⇒ <code>PDF</code>
<p>Gets a pdf file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>PDF</code> - <p>with type application/pdf</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|docx/_id"></a>

### API/export.GET|docx/:id() ⇒ <code>DOCX</code>
<p>Gets a docx file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>DOCX</code> - <p>with type application/vnd.openxmlformats-officedocument.wordprocessingml.document</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|csv/_id"></a>

### API/export.GET|csv/:id() ⇒ <code>CSV</code>
<p>Gets a csv file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>CSV</code> - <p>text/csv</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|template/_id"></a>

### API/export.GET|template/:id() ⇒ <code>TXT</code>
<p>Gets a tempate file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>TXT</code> - <p>txt</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|pdf/_id"></a>

### API/export.GET|pdf/:id() ⇒ <code>PDF</code>
<p>Gets a pdf file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>PDF</code> - <p>with type application/pdf</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|docx/_id"></a>

### API/export.GET|docx/:id() ⇒ <code>DOCX</code>
<p>Gets a docx file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>DOCX</code> - <p>with type application/vnd.openxmlformats-officedocument.wordprocessingml.document</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|csv/_id"></a>

### API/export.GET|csv/:id() ⇒ <code>CSV</code>
<p>Gets a csv file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>CSV</code> - <p>text/csv</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export.GET|template/_id"></a>

### API/export.GET|template/:id() ⇒ <code>TXT</code>
<p>Gets a tempate file with a sheetID</p>

**Kind**: static method of [<code>API/export</code>](#module_API/export)  
**Returns**: <code>TXT</code> - <p>txt</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/export..sendReport"></a>

### API/export~sendReport(id, type, res)
<p>This function gets all reporting data,
renders it to the specific type of file
and sends it to the client.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of a {Sheet}.</p> |
| type | <code>string</code> | <p>(pdf|docx) of document.</p> |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export..getReportObj"></a>

### API/export~getReportObj(sheetId)
<p>Implementation of accumulating and preparing the report data:
template.html
{Course} and {Sheet} with exercises and tasks.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheetId | <code>string</code> | <p>a {Sheet} id.</p> |

<a name="module_API/export..getTemplate"></a>

### API/export~getTemplate(sheet, mode)
<p>Parses a sheet to a template.
This function uses replacing of '&lt;' and '&gt;' to prevent html to be interpreted.
Furthermore, it adds linebreaks to its output depending on the mode.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>\*</code> | <p>a sheet object.</p> |
| mode | <code>\*</code> | <p>(txt|html)</p> |

<a name="module_API/export..toAlphabeticOrder"></a>

### API/export~toAlphabeticOrder(numerical) ⇒
<p>This function parses a numerical order to an alphabetical one.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>alphabetic character.</p>  

| Param | Type | Description |
| --- | --- | --- |
| numerical | <code>number</code> | <p>a order number.</p> |

<a name="module_API/export..countOrderUpBy"></a>

### API/export~countOrderUpBy(obj, countUp) ⇒
<p>This function counts up all orders of the report object.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>updated report object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | <p>is a report object.</p> |
| countUp | <code>number</code> | <p>value that is added to the order.</p> |

<a name="module_API/export..toReadableDate"></a>

### API/export~toReadableDate(str)
<p>This function parses a date string to a predefined format.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>date string.</p> |

<a name="module_API/export..sendReport"></a>

### API/export~sendReport(id, type, res)
<p>This function gets all reporting data,
renders it to the specific type of file
and sends it to the client.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>of a {Sheet}.</p> |
| type | <code>string</code> | <p>(pdf|docx) of document.</p> |
| res | <code>object</code> | <p>express response object.</p> |

<a name="module_API/export..getReportObj"></a>

### API/export~getReportObj(sheetId)
<p>Implementation of accumulating and preparing the report data:
template.html
{Course} and {Sheet} with exercises and tasks.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheetId | <code>string</code> | <p>a {Sheet} id.</p> |

<a name="module_API/export..getTemplate"></a>

### API/export~getTemplate(sheet, mode)
<p>Parses a sheet to a template.
This function uses replacing of '&lt;' and '&gt;' to prevent html to be interpreted.
Furthermore, it adds linebreaks to its output depending on the mode.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| sheet | <code>\*</code> | <p>a sheet object.</p> |
| mode | <code>\*</code> | <p>(txt|html)</p> |

<a name="module_API/export..toAlphabeticOrder"></a>

### API/export~toAlphabeticOrder(numerical) ⇒
<p>This function parses a numerical order to an alphabetical one.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>alphabetic character.</p>  

| Param | Type | Description |
| --- | --- | --- |
| numerical | <code>number</code> | <p>a order number.</p> |

<a name="module_API/export..countOrderUpBy"></a>

### API/export~countOrderUpBy(obj, countUp) ⇒
<p>This function counts up all orders of the report object.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  
**Returns**: <p>updated report object.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | <p>is a report object.</p> |
| countUp | <code>number</code> | <p>value that is added to the order.</p> |

<a name="module_API/export..toReadableDate"></a>

### API/export~toReadableDate(str)
<p>This function parses a date string to a predefined format.</p>

**Kind**: inner method of [<code>API/export</code>](#module_API/export)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>date string.</p> |

<a name="module_API/sheets"></a>

## API/sheets
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/sheets](#module_API/sheets)
    * [.GET|sheets/:id()](#module_API/sheets.GET|sheets/_id) ⇒ <code>Sheet</code>
    * [.GET|sheets/:id/_aggregate()](#module_API/sheets.GET|sheets/_id/_aggregate) ⇒ <code>Sheet</code>
    * [.PUT|sheets/:id()](#module_API/sheets.PUT|sheets/_id) ⇒ <code>Sheet</code>
    * [.DELETE|sheets/:id()](#module_API/sheets.DELETE|sheets/_id) ⇒ <code>string</code>
    * [.GET|sheets/:id/exercises()](#module_API/sheets.GET|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.GET|sheets/:id/submissions()](#module_API/sheets.GET|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/exercises()](#module_API/sheets.POST|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions()](#module_API/sheets.POST|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions/_bulk()](#module_API/sheets.POST|sheets/_id/submissions/_bulk) ⇒ <code>Array</code>
    * [.DELETE|sheets/:id/exercises()](#module_API/sheets.DELETE|sheets/_id/exercises) ⇒ <code>string</code>
    * [.DELETE|sheets/:id/submissions()](#module_API/sheets.DELETE|sheets/_id/submissions) ⇒ <code>string</code>
    * [.GET|sheets/:id/pdf()](#module_API/sheets.GET|sheets/_id/pdf)
    * [.GET|sheets/:id/docx()](#module_API/sheets.GET|sheets/_id/docx)
    * [.GET|sheets/:id/csv()](#module_API/sheets.GET|sheets/_id/csv)
    * [.GET|sheets/:id/template()](#module_API/sheets.GET|sheets/_id/template)
    * [.GET|sheets/:id()](#module_API/sheets.GET|sheets/_id) ⇒ <code>Sheet</code>
    * [.GET|sheets/:id/_aggregate()](#module_API/sheets.GET|sheets/_id/_aggregate) ⇒ <code>Sheet</code>
    * [.PUT|sheets/:id()](#module_API/sheets.PUT|sheets/_id) ⇒ <code>Sheet</code>
    * [.DELETE|sheets/:id()](#module_API/sheets.DELETE|sheets/_id) ⇒ <code>string</code>
    * [.GET|sheets/:id/exercises()](#module_API/sheets.GET|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.GET|sheets/:id/submissions()](#module_API/sheets.GET|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/exercises()](#module_API/sheets.POST|sheets/_id/exercises) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions()](#module_API/sheets.POST|sheets/_id/submissions) ⇒ <code>Array</code>
    * [.POST|sheets/:id/submissions/_bulk()](#module_API/sheets.POST|sheets/_id/submissions/_bulk) ⇒ <code>Array</code>
    * [.DELETE|sheets/:id/exercises()](#module_API/sheets.DELETE|sheets/_id/exercises) ⇒ <code>string</code>
    * [.DELETE|sheets/:id/submissions()](#module_API/sheets.DELETE|sheets/_id/submissions) ⇒ <code>string</code>
    * [.GET|sheets/:id/pdf()](#module_API/sheets.GET|sheets/_id/pdf)
    * [.GET|sheets/:id/docx()](#module_API/sheets.GET|sheets/_id/docx)
    * [.GET|sheets/:id/csv()](#module_API/sheets.GET|sheets/_id/csv)
    * [.GET|sheets/:id/template()](#module_API/sheets.GET|sheets/_id/template)

<a name="module_API/sheets.GET|sheets/_id"></a>

### API/sheets.GET|sheets/:id() ⇒ <code>Sheet</code>
<p>Gets a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/_aggregate"></a>

### API/sheets.GET|sheets/:id/_aggregate() ⇒ <code>Sheet</code>
<p>Gets an aggregated sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Sheet</code> - <p>with Exercises, Tasks, Solution and Submissions, Answers, Task, Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.PUT|sheets/_id"></a>

### API/sheets.PUT|sheets/:id() ⇒ <code>Sheet</code>
<p>Updates a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Sheet</code> | <p>with updated values.</p> |

<a name="module_API/sheets.DELETE|sheets/_id"></a>

### API/sheets.DELETE|sheets/:id() ⇒ <code>string</code>
<p>Deletes a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/exercises"></a>

### API/sheets.GET|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Gets all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/submissions"></a>

### API/sheets.GET|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.POST|sheets/_id/exercises"></a>

### API/sheets.POST|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Creates exercises for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of exercises.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions"></a>

### API/sheets.POST|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Creates submissions for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions/_bulk"></a>

### API/sheets.POST|sheets/:id/submissions/_bulk() ⇒ <code>Array</code>
<p>Creates submissions with 2 further levels (answers and task) for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/exercises"></a>

### API/sheets.DELETE|sheets/:id/exercises() ⇒ <code>string</code>
<p>Deletes all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/submissions"></a>

### API/sheets.DELETE|sheets/:id/submissions() ⇒ <code>string</code>
<p>Deletes all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/pdf"></a>

### API/sheets.GET|sheets/:id/pdf()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/docx"></a>

### API/sheets.GET|sheets/:id/docx()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/csv"></a>

### API/sheets.GET|sheets/:id/csv()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/template"></a>

### API/sheets.GET|sheets/:id/template()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id"></a>

### API/sheets.GET|sheets/:id() ⇒ <code>Sheet</code>
<p>Gets a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/_aggregate"></a>

### API/sheets.GET|sheets/:id/_aggregate() ⇒ <code>Sheet</code>
<p>Gets an aggregated sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Sheet</code> - <p>with Exercises, Tasks, Solution and Submissions, Answers, Task, Solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.PUT|sheets/_id"></a>

### API/sheets.PUT|sheets/:id() ⇒ <code>Sheet</code>
<p>Updates a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Sheet</code> | <p>with updated values.</p> |

<a name="module_API/sheets.DELETE|sheets/_id"></a>

### API/sheets.DELETE|sheets/:id() ⇒ <code>string</code>
<p>Deletes a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/exercises"></a>

### API/sheets.GET|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Gets all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/submissions"></a>

### API/sheets.GET|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.POST|sheets/_id/exercises"></a>

### API/sheets.POST|sheets/:id/exercises() ⇒ <code>Array</code>
<p>Creates exercises for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Exercise}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of exercises.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions"></a>

### API/sheets.POST|sheets/:id/submissions() ⇒ <code>Array</code>
<p>Creates submissions for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.POST|sheets/_id/submissions/_bulk"></a>

### API/sheets.POST|sheets/:id/submissions/_bulk() ⇒ <code>Array</code>
<p>Creates submissions with 2 further levels (answers and task) for a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |
| req.body | <code>Array</code> | <p>Array of submissions.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/exercises"></a>

### API/sheets.DELETE|sheets/:id/exercises() ⇒ <code>string</code>
<p>Deletes all exercises of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.DELETE|sheets/_id/submissions"></a>

### API/sheets.DELETE|sheets/:id/submissions() ⇒ <code>string</code>
<p>Deletes all submissions of a sheet by id.</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a sheet.</p> |

<a name="module_API/sheets.GET|sheets/_id/pdf"></a>

### API/sheets.GET|sheets/:id/pdf()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/docx"></a>

### API/sheets.GET|sheets/:id/docx()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/csv"></a>

### API/sheets.GET|sheets/:id/csv()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/sheets.GET|sheets/_id/template"></a>

### API/sheets.GET|sheets/:id/template()
<p>Redirects to @see export.js</p>

**Kind**: static method of [<code>API/sheets</code>](#module_API/sheets)  
<a name="module_API/solutions"></a>

## API/solutions
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/solutions](#module_API/solutions)
    * [.PUT|solutions/:id()](#module_API/solutions.PUT|solutions/_id) ⇒ <code>Solution</code>
    * [.DELETE|solutions/:id()](#module_API/solutions.DELETE|solutions/_id) ⇒ <code>string</code>
    * [.PUT|solutions/:id()](#module_API/solutions.PUT|solutions/_id) ⇒ <code>Solution</code>
    * [.DELETE|solutions/:id()](#module_API/solutions.DELETE|solutions/_id) ⇒ <code>string</code>

<a name="module_API/solutions.PUT|solutions/_id"></a>

### API/solutions.PUT|solutions/:id() ⇒ <code>Solution</code>
<p>Updates a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |
| req.body | <code>Solution</code> | <p>with updated values.</p> |

<a name="module_API/solutions.DELETE|solutions/_id"></a>

### API/solutions.DELETE|solutions/:id() ⇒ <code>string</code>
<p>Deletes a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |

<a name="module_API/solutions.PUT|solutions/_id"></a>

### API/solutions.PUT|solutions/:id() ⇒ <code>Solution</code>
<p>Updates a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |
| req.body | <code>Solution</code> | <p>with updated values.</p> |

<a name="module_API/solutions.DELETE|solutions/_id"></a>

### API/solutions.DELETE|solutions/:id() ⇒ <code>string</code>
<p>Deletes a solution by id.</p>

**Kind**: static method of [<code>API/solutions</code>](#module_API/solutions)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a solution.</p> |

<a name="module_API/students"></a>

## API/students
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/students](#module_API/students)
    * [.GET|students/_search()](#module_API/students.GET|students/_search) ⇒ <code>Student</code>
    * [.GET|students/:id()](#module_API/students.GET|students/_id) ⇒ <code>Student</code>
    * [.POST|students()](#module_API/students.POST|students) ⇒ <code>Array</code>
    * [.PUT|students/:id()](#module_API/students.PUT|students/_id) ⇒ <code>Student</code>
    * [.DELETE|students/:id()](#module_API/students.DELETE|students/_id) ⇒ <code>string</code>
    * [.GET|students/:id/submissions()](#module_API/students.GET|students/_id/submissions) ⇒ <code>Array</code>
    * [.GET|students/:id/courses()](#module_API/students.GET|students/_id/courses) ⇒ <code>Array</code>
    * [.GET|students/_search()](#module_API/students.GET|students/_search) ⇒ <code>Student</code>
    * [.GET|students/:id()](#module_API/students.GET|students/_id) ⇒ <code>Student</code>
    * [.POST|students()](#module_API/students.POST|students) ⇒ <code>Array</code>
    * [.PUT|students/:id()](#module_API/students.PUT|students/_id) ⇒ <code>Student</code>
    * [.DELETE|students/:id()](#module_API/students.DELETE|students/_id) ⇒ <code>string</code>
    * [.GET|students/:id/submissions()](#module_API/students.GET|students/_id/submissions) ⇒ <code>Array</code>
    * [.GET|students/:id/courses()](#module_API/students.GET|students/_id/courses) ⇒ <code>Array</code>

<a name="module_API/students.GET|students/_search"></a>

### API/students.GET|students/_search() ⇒ <code>Student</code>
<p>Searches through all students with a mat_nr.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.matnr: | <code>string</code> | <p>matricle number of a student.</p> |

**Example**  
```js
/students/_search?matnr={mat_nr}
```
<a name="module_API/students.GET|students/_id"></a>

### API/students.GET|students/:id() ⇒ <code>Student</code>
<p>Gets a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.POST|students"></a>

### API/students.POST|students() ⇒ <code>Array</code>
<p>Creates students.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> | <p>with {Student}</p> |

<a name="module_API/students.PUT|students/_id"></a>

### API/students.PUT|students/:id() ⇒ <code>Student</code>
<p>Updates a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |
| req.body | <code>Student</code> | <p>with updated values.</p> |

<a name="module_API/students.DELETE|students/_id"></a>

### API/students.DELETE|students/:id() ⇒ <code>string</code>
<p>Deletes a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/submissions"></a>

### API/students.GET|students/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/courses"></a>

### API/students.GET|students/:id/courses() ⇒ <code>Array</code>
<p>Gets all courses of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Courses}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_search"></a>

### API/students.GET|students/_search() ⇒ <code>Student</code>
<p>Searches through all students with a mat_nr.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.matnr: | <code>string</code> | <p>matricle number of a student.</p> |

**Example**  
```js
/students/_search?matnr={mat_nr}
```
<a name="module_API/students.GET|students/_id"></a>

### API/students.GET|students/:id() ⇒ <code>Student</code>
<p>Gets a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.POST|students"></a>

### API/students.POST|students() ⇒ <code>Array</code>
<p>Creates students.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Student}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>Array</code> | <p>with {Student}</p> |

<a name="module_API/students.PUT|students/_id"></a>

### API/students.PUT|students/:id() ⇒ <code>Student</code>
<p>Updates a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |
| req.body | <code>Student</code> | <p>with updated values.</p> |

<a name="module_API/students.DELETE|students/_id"></a>

### API/students.DELETE|students/:id() ⇒ <code>string</code>
<p>Deletes a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/submissions"></a>

### API/students.GET|students/:id/submissions() ⇒ <code>Array</code>
<p>Gets all submissions of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/students.GET|students/_id/courses"></a>

### API/students.GET|students/:id/courses() ⇒ <code>Array</code>
<p>Gets all courses of a student by id.</p>

**Kind**: static method of [<code>API/students</code>](#module_API/students)  
**Returns**: <code>Array</code> - <p>of @see {Courses}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a student.</p> |

<a name="module_API/submissions"></a>

## API/submissions
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/submissions](#module_API/submissions)
    * [.GET|submissions/_search()](#module_API/submissions.GET|submissions/_search) ⇒ <code>Array</code>
    * [.PUT|submissions/:id()](#module_API/submissions.PUT|submissions/_id) ⇒ <code>Submission</code>
    * [.GET|submissions/:id/answers()](#module_API/submissions.GET|submissions/_id/answers) ⇒ <code>Array</code>
    * [.POST|submissions/:id/answers()](#module_API/submissions.POST|submissions/_id/answers) ⇒ <code>Array</code>
    * [.GET|submissions/:id/answers/_search()](#module_API/submissions.GET|submissions/_id/answers/_search) ⇒ <code>Array</code>
    * [.GET|submissions/_search()](#module_API/submissions.GET|submissions/_search) ⇒ <code>Array</code>
    * [.PUT|submissions/:id()](#module_API/submissions.PUT|submissions/_id) ⇒ <code>Submission</code>
    * [.GET|submissions/:id/answers()](#module_API/submissions.GET|submissions/_id/answers) ⇒ <code>Array</code>
    * [.POST|submissions/:id/answers()](#module_API/submissions.POST|submissions/_id/answers) ⇒ <code>Array</code>
    * [.GET|submissions/:id/answers/_search()](#module_API/submissions.GET|submissions/_id/answers/_search) ⇒ <code>Array</code>

<a name="module_API/submissions.GET|submissions/_search"></a>

### API/submissions.GET|submissions/_search() ⇒ <code>Array</code>
<p>Searches through all submissions with an user id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.user: | <code>string</code> | <p>ID of a user.</p> |

**Example**  
```js
/submissions/_search?user={ID}
```
<a name="module_API/submissions.PUT|submissions/_id"></a>

### API/submissions.PUT|submissions/:id() ⇒ <code>Submission</code>
<p>Updates a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>object</code> | <p>with values for update.</p> |

<a name="module_API/submissions.GET|submissions/_id/answers"></a>

### API/submissions.GET|submissions/:id/answers() ⇒ <code>Array</code>
<p>Gets all answers of a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |

<a name="module_API/submissions.POST|submissions/_id/answers"></a>

### API/submissions.POST|submissions/:id/answers() ⇒ <code>Array</code>
<p>Creates answers for a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>Array</code> | <p>with {Answer}</p> |

<a name="module_API/submissions.GET|submissions/_id/answers/_search"></a>

### API/submissions.GET|submissions/:id/answers/_search() ⇒ <code>Array</code>
<p>Searches through all answers of an submission by id with a task id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.task: | <code>string</code> | <p>ID of a task.</p> |

**Example**  
```js
/submissions/:id/answers/_search?task={ID}
```
<a name="module_API/submissions.GET|submissions/_search"></a>

### API/submissions.GET|submissions/_search() ⇒ <code>Array</code>
<p>Searches through all submissions with an user id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Submission}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.user: | <code>string</code> | <p>ID of a user.</p> |

**Example**  
```js
/submissions/_search?user={ID}
```
<a name="module_API/submissions.PUT|submissions/_id"></a>

### API/submissions.PUT|submissions/:id() ⇒ <code>Submission</code>
<p>Updates a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>object</code> | <p>with values for update.</p> |

<a name="module_API/submissions.GET|submissions/_id/answers"></a>

### API/submissions.GET|submissions/:id/answers() ⇒ <code>Array</code>
<p>Gets all answers of a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |

<a name="module_API/submissions.POST|submissions/_id/answers"></a>

### API/submissions.POST|submissions/:id/answers() ⇒ <code>Array</code>
<p>Creates answers for a submission by id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a submission.</p> |
| req.body | <code>Array</code> | <p>with {Answer}</p> |

<a name="module_API/submissions.GET|submissions/_id/answers/_search"></a>

### API/submissions.GET|submissions/:id/answers/_search() ⇒ <code>Array</code>
<p>Searches through all answers of an submission by id with a task id.</p>

**Kind**: static method of [<code>API/submissions</code>](#module_API/submissions)  
**Returns**: <code>Array</code> - <p>of @see {Answer}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.query.task: | <code>string</code> | <p>ID of a task.</p> |

**Example**  
```js
/submissions/:id/answers/_search?task={ID}
```
<a name="module_API/tasks"></a>

## API/tasks
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/tasks](#module_API/tasks)
    * [.GET|tasks/:id/_aggregate()](#module_API/tasks.GET|tasks/_id/_aggregate) ⇒ <code>Task</code>
    * [.GET|tasks/:id()](#module_API/tasks.GET|tasks/_id) ⇒ <code>Task</code>
    * [.PUT|tasks/:id()](#module_API/tasks.PUT|tasks/_id) ⇒ <code>Task</code>
    * [.DELETE|tasks/:id()](#module_API/tasks.DELETE|tasks/_id) ⇒ <code>Task</code>
    * [.GET|tasks/:id/solutions()](#module_API/tasks.GET|tasks/_id/solutions) ⇒ <code>Array</code>
    * [.POST|tasks/:id/solutions()](#module_API/tasks.POST|tasks/_id/solutions) ⇒ <code>Array</code>
    * [.GET|tasks/:id/_aggregate()](#module_API/tasks.GET|tasks/_id/_aggregate) ⇒ <code>Task</code>
    * [.GET|tasks/:id()](#module_API/tasks.GET|tasks/_id) ⇒ <code>Task</code>
    * [.PUT|tasks/:id()](#module_API/tasks.PUT|tasks/_id) ⇒ <code>Task</code>
    * [.DELETE|tasks/:id()](#module_API/tasks.DELETE|tasks/_id) ⇒ <code>Task</code>
    * [.GET|tasks/:id/solutions()](#module_API/tasks.GET|tasks/_id/solutions) ⇒ <code>Array</code>
    * [.POST|tasks/:id/solutions()](#module_API/tasks.POST|tasks/_id/solutions) ⇒ <code>Array</code>

<a name="module_API/tasks.GET|tasks/_id/_aggregate"></a>

### API/tasks.GET|tasks/:id/_aggregate() ⇒ <code>Task</code>
<p>Gets a task by id with an aggregated solution.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>with solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id"></a>

### API/tasks.GET|tasks/:id() ⇒ <code>Task</code>
<p>Gets a task by id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.PUT|tasks/_id"></a>

### API/tasks.PUT|tasks/:id() ⇒ <code>Task</code>
<p>Updates a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>Task</code> | <p>object with values for the update.</p> |

<a name="module_API/tasks.DELETE|tasks/_id"></a>

### API/tasks.DELETE|tasks/:id() ⇒ <code>Task</code>
<p>Delets a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id/solutions"></a>

### API/tasks.GET|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Gets all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.POST|tasks/_id/solutions"></a>

### API/tasks.POST|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Creates all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>object</code> | <p>with {Array} of {Solution}.</p> |

<a name="module_API/tasks.GET|tasks/_id/_aggregate"></a>

### API/tasks.GET|tasks/:id/_aggregate() ⇒ <code>Task</code>
<p>Gets a task by id with an aggregated solution.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>with solution.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id"></a>

### API/tasks.GET|tasks/:id() ⇒ <code>Task</code>
<p>Gets a task by id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Task</code> - <p>.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.PUT|tasks/_id"></a>

### API/tasks.PUT|tasks/:id() ⇒ <code>Task</code>
<p>Updates a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>Task</code> | <p>object with values for the update.</p> |

<a name="module_API/tasks.DELETE|tasks/_id"></a>

### API/tasks.DELETE|tasks/:id() ⇒ <code>Task</code>
<p>Delets a task.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.GET|tasks/_id/solutions"></a>

### API/tasks.GET|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Gets all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |

<a name="module_API/tasks.POST|tasks/_id/solutions"></a>

### API/tasks.POST|tasks/:id/solutions() ⇒ <code>Array</code>
<p>Creates all solutions of a task by its id.</p>

**Kind**: static method of [<code>API/tasks</code>](#module_API/tasks)  
**Returns**: <code>Array</code> - <p>of @see {Solution}</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a task.</p> |
| req.body | <code>object</code> | <p>with {Array} of {Solution}.</p> |

<a name="module_API/users"></a>

## API/users
**See**: @link https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes  

* [API/users](#module_API/users)
    * [.GET|users()](#module_API/users.GET|users) ⇒ <code>Array</code>
    * [.GET|users/roles()](#module_API/users.GET|users/roles) ⇒ <code>Array</code>
    * [.GET|users/roles/:id()](#module_API/users.GET|users/roles/_id) ⇒ <code>Role</code>
    * [.POST|users()](#module_API/users.POST|users)
    * [.GET|users/:id()](#module_API/users.GET|users/_id) ⇒ <code>User</code>
    * [.PUT|users/:id()](#module_API/users.PUT|users/_id) ⇒ <code>User</code>
    * [.DELETE|users/:id()](#module_API/users.DELETE|users/_id) ⇒ <code>string</code>
    * [.GET|users()](#module_API/users.GET|users) ⇒ <code>Array</code>
    * [.GET|users/roles()](#module_API/users.GET|users/roles) ⇒ <code>Array</code>
    * [.GET|users/roles/:id()](#module_API/users.GET|users/roles/_id) ⇒ <code>Role</code>
    * [.POST|users()](#module_API/users.POST|users)
    * [.GET|users/:id()](#module_API/users.GET|users/_id) ⇒ <code>User</code>
    * [.PUT|users/:id()](#module_API/users.PUT|users/_id) ⇒ <code>User</code>
    * [.DELETE|users/:id()](#module_API/users.DELETE|users/_id) ⇒ <code>string</code>

<a name="module_API/users.GET|users"></a>

### API/users.GET|users() ⇒ <code>Array</code>
<p>Gets all users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all users.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles"></a>

### API/users.GET|users/roles() ⇒ <code>Array</code>
<p>Gets all roles.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all roles.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles/_id"></a>

### API/users.GET|users/roles/:id() ⇒ <code>Role</code>
<p>Gets a role by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Role</code> - <p>role by id.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a role.</p> |

<a name="module_API/users.POST|users"></a>

### API/users.POST|users()
<p>Creates users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> \| <code>Array</code> | <p>user objects with username, password and roleId.</p> |

<a name="module_API/users.GET|users/_id"></a>

### API/users.GET|users/:id() ⇒ <code>User</code>
<p>Gets user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>with a role.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.PUT|users/_id"></a>

### API/users.PUT|users/:id() ⇒ <code>User</code>
<p>Updates user by id. Hashes the password beforehand.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>in its updated state.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.DELETE|users/_id"></a>

### API/users.DELETE|users/:id() ⇒ <code>string</code>
<p>Deletes a user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.GET|users"></a>

### API/users.GET|users() ⇒ <code>Array</code>
<p>Gets all users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all users.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles"></a>

### API/users.GET|users/roles() ⇒ <code>Array</code>
<p>Gets all roles.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Array</code> - <p>all roles.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>

<a name="module_API/users.GET|users/roles/_id"></a>

### API/users.GET|users/roles/:id() ⇒ <code>Role</code>
<p>Gets a role by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>Role</code> - <p>role by id.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a role.</p> |

<a name="module_API/users.POST|users"></a>

### API/users.POST|users()
<p>Creates users.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.body | <code>object</code> \| <code>Array</code> | <p>user objects with username, password and roleId.</p> |

<a name="module_API/users.GET|users/_id"></a>

### API/users.GET|users/:id() ⇒ <code>User</code>
<p>Gets user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>with a role.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.PUT|users/_id"></a>

### API/users.PUT|users/:id() ⇒ <code>User</code>
<p>Updates user by id. Hashes the password beforehand.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>User</code> - <p>in its updated state.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

<a name="module_API/users.DELETE|users/_id"></a>

### API/users.DELETE|users/:id() ⇒ <code>string</code>
<p>Deletes a user by id.</p>

**Kind**: static method of [<code>API/users</code>](#module_API/users)  
**Returns**: <code>string</code> - <p>success message.</p>  
**Throws**:

- <p>400</p>
- <p>404</p>
- <p>500</p>


| Param | Type | Description |
| --- | --- | --- |
| req.params.id: | <code>string</code> | <p>ID of a user.</p> |

