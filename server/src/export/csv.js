
// First two lines of csv:
/*
ID,Bewertung,Skala,Zuletzt geändert (Bewertung),Feedback als Kommentar
Teilnehmer/in1327670,bestanden,"nicht bestanden
bestanden",,"
<p> Sehr gut! Fast alles richtig! </p>
<p> Aufgabe 1.1a): (Nutzen der virtuellen Realität im Zusammenhang mit konfrontationstherapeutischen Verfahrenhttps://wiki.mi.ur.de/arbeiten/nutzen_der_virtuellen_realitaet_im_zusammenhang_mit_konfrontationstherapeutischen_verfahren ) ist korrekt! </p>
<p> Aufgabe 1.1b): (Es handelt sich um Design Science: Der wesentliche Bestandteil der Arbeit besteht darin geeignete Charaktererstellungstools im Hinblick auf deren Zweck(Traum-Therapie) anzupassen. ) ist korrekt! </p>
<p> Aufgabe 1.1c): (Entwicklung, Pilotevaluation des Nutzungsverhaltens und Optimierung einer Smartphoneapp zum Monitoring von Sorgen („Worry Analyser“)https://wiki.mi.ur.de/arbeiten/worry_analyser ) ist korrekt! </p>
<p> Aufgabe 1.1d): (Es handelt sich um Behavioral Science, da gezielt dass Nutzungsverhalten der App analysiert werden soll.) ist korrekt! </p>
<p> Aufgabe 1.2a): (Bachelor Arbeit) ist korrekt! </p>
<p> Aufgabe 1.2b): fehlt. </p>
<p> Aufgabe 1.2c): (Workshopbeitrag) ist korrekt! </p>
<p> Aufgabe 1.2d): (Zeitschriftenbeitrag) ist korrekt! </p>
<p> Aufgabe 1.3a): (Der Text liefert einen Überblick über die Sentimentanalyse (Stimmungen in Texten zu erkennen). Es werden grundlegende Begriffe geklärt, der aktulle Stand des Feldesund die Fortschritte die sich aus der Zunahme an webfähigen Endgeräten begründen lassen (mehr Daten) eingegangen. ) ist korrekt! </p>
<p> Aufgabe 1.3b): (Es handelt sich um einen Überblickansatz.) ist korrekt! </p>
<p> Aufgabe 1.3c): (Der Text geht um die Verwendung von Twitter für Sentimentanalyse. Es wird gezeigt wie Daten gewonnen werden, linguistisch ausgewertet und deren Haltung extrahiert.Zur Datenerhebung wurde ein Sentiment classifier trainert, und verwendet. ) ist korrekt! </p>
<p> Aufgabe 1.3d): (Es handelt sich um einen speziellen Ansatz.) ist korrekt! </p>
<p> Aufgabe 1.3e): (Twitter, sentiment classifier, Bayes theorem, Treetagger) ist korrekt! </p>
<p> Aufgabe 1.3f): (Sentiment Analysis: A Perspective on its Past, Present and Future. Der Text eigenet sich besser, da er einen Überblick über gunrdlegende Terminologie und Methoden der Sentimentanalyse liefert.) ist korrekt! </p>
<p> Aufgabe 1.4a): (Behavioral Science) ist korrekt! </p>
<p> Aufgabe 1.4b): (Es wird der Zusammenhang der Wahrnehmung einer Rolle in einem narrativen Rollenspiel (des Spielers), und den Auswahlmöglichkeiten im Hinblick aufdas Verhalten der Spieler untersucht. ) ist korrekt! </p>
<p> Aufgabe 1.4c): (Der Text hat eine hohe Qualität. Es handelt sich um ein Longpaper einer internationalen Tagung, genauer CHI - die ein hohes Ansehen genießt.) ist korrekt! </p>
<p> Aufgabe 1.4d): (Der Text folgt dem IMRaD-Prinzip nur teilweise, da er beispielsweise in Abstract bestizt (nicht teil des IMRAD).) ist korrekt! </p>
<p> Aufgabe 1.5a): (Ein Maß für die Kongruenz zwischen Gemessenem und zu Messendem.) ist korrekt! </p>
<p> Aufgabe 1.5b): (Ein Maß für die Genauigkeit und Verlässlichkeit von Messungen) ist korrekt! </p>
<p> Aufgabe 1.5c): (Communcations of the ACM) ist korrekt! </p>
<p> Aufgabe 1.5d): (CHI) ist korrekt! </p>
<p> Aufgabe 1.5e): (Abstract) ist korrekt! </p>
<p> Aufgabe 1.6 ist korrekt! </p>
<p> Korrigiert von Vorname Nachname </p>
"
*/

// TODO: last line needs to be dynamically added. Find a way to do that.

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
 */
CSVRenderer.prototype.addSubmission = function(submission, sheetOrder, requiredPoints, maxPoints) {
    let line = '';
    line += 'Teilnehmer/in' + submission.student.grips_id + ',' + hasPassed(submission, requiredPoints) + ',"nicht bestanden\nbestanden",,"\n';
    line += '<p> ' + getOverallFeedback(submission, requiredPoints, maxPoints) + ' </p>\n';
    let length = submission.answers.length;
    for (let i = 0; i < length; i++) {
        let answer = submission.answers[i];
        if (i === length - 1) {
            line += '<p> Aufgabe ' + sheetOrder + '.' + answer.task.exercise.order;
            line += ' ist korrekt! </p>';
            break;
        }
        line += '<p> Aufgabe ' + sheetOrder + '.' + answer.task.exercise.order + toAlphabeticOrder(answer.task.order) + '): ';
        let txt = toCSVString(answer.text);
        if (txt.length !== 0) line += '(' + txt + ')';
        else line += 'fehlt.';
        line += ' ' + answer.feedback + ' </p>';
        line += '\n';
    }
    line += '<p> Korrigiert von ' + submission.user.forename + ' ' + submission.user.lastname + ' </p>';
    line += '"';
    this.csv += line;
    return this;
};

CSVRenderer.prototype.export = function() {
    return this.csv;
};

function hasPassed(submission, requiredPoints) {
    let points;
    for (let answer of submission.answers) {
        points += answer.achieved_points;
    }
    if (points >= requiredPoints) return 'bestanden';
    else return 'nicht bestanden';
}

function getOverallFeedback(submission, requiredPoints, maxPoints) {
    let points;
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