
function get(id, res, model, populate) {
    if (populate !== undefined) {
        model.findById(id).populate(populate).exec(function(err, doc) {
            if (err) res.status(400).send(err);
            res.send(doc);
        });
    }
    model.findById(id, function(err, doc) {
        if (err) res.status(400).send(err);
        res.send(doc);
    });
}

function getAll(res, model) {
    model.find({}).then((docs) => {
        if (docs === null || docs.length === 0) res.status(404).send('No ' + model + ' found');
        res.status(200).send(docs);
    }).catch((err) => {
        if (err) res.status(400).send(err);
    });
}

function put(id, body, res, model) {
    model.findById(id, function(err, doc) {
        if (err) res.status(404).send(err);
        doc.set(body);
        doc.save(function(err, response) {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });
}

function del(id, res, model) {
    model.findByIdAndRemove(id, function(err, doc) {
        if (err) res.status(400).send(err);
        if (doc === null) res.status(404).send('No object with ' + id + ' was found.');
        else res.send('Successfully deleted document');
    });
}

function post(body, res, model) {
    model.create(body, function(err, docs) {
        if (err) res.status(400).send(err);
        else res.status(200).send(docs);
    });
}

/*
TODO: This function could create all nested models of an json object.

function createAll(parentModel, item) {
    return new Promise(function(resolve, reject) {
        let objects = [];
        for (let i = 0; i < item.length; i++) {
            if (typeof item[i] === 'object') {
                objects.push(item[i]);
                item.splice(i, 1);
                i--;
            }
        }
        parentModel.create(item, function(err, parent) {
            if (err) reject(err);
            // TODO: refactor this code to a more reusable state.
            for (let i in objects) {            
            }
        });
    });
}
*/

export {get, getAll, put, del, post};