function get(id, res, model, populate) {
    if (populate !== undefined) {
        model.findById(id).populate(populate).exec((err, doc) => {
            if (err) res.status(400).send(err);
            res.send(doc);
        });
    }
    model.findById(id, (err, doc) => {
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
    model.findById(id, (err, doc) => {
        if (err) res.status(404).send(err);
        doc.set(body);
        doc.save((err, response) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });
}

function del(id, res, model) {
    model.findByIdAndRemove(id, (err, doc) => {
        if (err) res.status(400).send(err);
        if (doc === null) res.status(404).send('No object with ' + id + ' was found.');
        else res.send('Successfully deleted document');
    });
}

function post(body, res, model) {
    model.create(body, (err, docs) => {
        if (err) res.status(400).send(err);
        else res.status(200).send(docs);
    });
}

export {get, getAll, put, del, post};