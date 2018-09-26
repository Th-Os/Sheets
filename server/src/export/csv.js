function CSVRenderer() {
    this.header = 'ID,Bewertung,Skala,Zuletzt geändert (Bewertung),Feedback als Kommentar';
    this.type = 'text/csv;charset=utf-8;';
    this.csv = '';
}

CSVRenderer.prototype.addHeader = function(header) {
    if (header === undefined || header.length === 0) this.csv += this.header;
    else this.csv += header;
    this.csv += '\n';
    return this;
};

/**
 * This method will parse a submission to a valid csv line and adds it to the csv string.
 * @param {*} submission with student, answers (with task with exercise) and user
 * @param {*} sheetOrder
 * @param {*} requiredPoints
 * @param {*} maxPoints
 * @param {*} template defines whether a template exercise was chosen. This case needs an extra line.
 */
CSVRenderer.prototype.addSubmission = function(submission, exercises, sheetOrder, requiredPoints, maxPoints, template) {
    let line = '';
    line += 'Teilnehmer/in' + submission.student.grips_id + ',' + hasPassed(submission, requiredPoints, (template.flag && template.correctly) ? template.points : 0) + ',"nicht bestanden\nbestanden",,"\n';
    line += '<p> ' + getOverallFeedback(submission, requiredPoints, maxPoints) + ' </p>\n';
    let length = submission.answers.length;
    sheetOrder += 1;
    for (let i = 0; i < length; i++) {
        let answer = submission.answers[i];
        line += '<p> Aufgabe ' + sheetOrder + '.' + (getExerciseOrder(exercises, answer.task._id) + 1) + toAlphabeticOrder(answer.task.order + 1) + '): ';
        let txt = toCSVString(answer.text);
        if (txt.length !== 0) line += '(' + txt + ')';
        else line += 'fehlt.';
        let feedback = (answer.feedback !== undefined) ? answer.feedback : 'Kein Feedback angegeben.';
        line += ' ' + feedback + ' </p>';
        line += '\n';
    }
    if (template.flag) {
        line += '<p> Aufgabe ' + sheetOrder + '.' + submission.answers.length;
        line += ' ist ';
        line += (template.correctly) ? 'korrekt' : 'falsch';
        line += '! </p>\n';
    }
    if (submission.user !== null) {
        line += '<p> Korrigiert von ' + submission.user.forename + ' ' + submission.user.lastname + ' </p>';
    }
    line += '"';
    this.csv += line;
};

CSVRenderer.prototype.export = function() {
    return this.csv;
};

function hasPassed(submission, requiredPoints, templatePoints) {
    let points;
    for (let answer of submission.answers) {
        points += answer.achieved_points;
    }
    points += templatePoints;
    if (points >= requiredPoints) return 'bestanden';
    else return 'nicht bestanden';
}

function getExerciseOrder(exercises, taskId) {
    for (let e of exercises) {
        for (let t of e.tasks) {
            if (t._id.equals(taskId)) {
                return e.order;
            }
        }
    }
    return 0;
}

function getOverallFeedback(submission, requiredPoints, maxPoints) {
    let points = 0;
    for (let answer of submission.answers) {
        points += answer.achieved_points;
    }
    if (points === maxPoints) return 'Sehr gut! Alles richtig.';
    if (points >= requiredPoints) return 'Sehr gut! Fast alles richtig.';
    else return 'Schade. Nicht bestanden.';
}

function toCSVString(str) {
    if (str === undefined || str.length === 0) return '';
    return str.replace('\"\g', '\''); // eslint-disable-line no-useless-escape
}

function toAlphabeticOrder(numerical) {
    if (numerical < 10) {
        return String.fromCharCode(('' + numerical).charCodeAt() + 16).toLowerCase();
    } else {
        if (numerical < 27) return String.fromCharCode('9'.charCodeAt() + numerical - 9 + 16).toLowerCase();
        return toAlphabeticOrder(1) + toAlphabeticOrder(numerical - 26);
    }
}

export default CSVRenderer;