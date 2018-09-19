// TODO: nested object POST and GET.

/**
 * @param {*} id
 * @param {*} res
 * @param {*} model
 * @param {*} populate
 */
function get(id, res, model, populate) {
    // FIXME: Population will not work right now. Further data modeling is needed.
    if (populate !== undefined) {
        model.findById(id).populate(populate).exec((err, doc) => {
            if (err) res.status(400).send(err);
            res.send(doc);
        });
    }
    model.findById(id, (err, doc) => {
        if (err) res.status(400).send(err);
        else if (doc === undefined) res.status(404).send(model.modelName + ' not found.');
        else res.send(doc);
    });
}

function deepGet(id, res, parent, model, isSingle) {
    let ids = '';
    if (isSingle) ids = model.modelName.toLowerCase();
    else ids = model.modelName.toLowerCase() + 's';
    parent.findById(id, (err, doc) => {
        if (err) res.status(400).send(err);
        if (doc === undefined) res.status(404).send(parent.modelName + ' not found.');
        model.find().where('_id').in(doc[ids]).exec((err, docs) => {
            if (err) res.status(400).send(err);
            if (docs === undefined || docs.length === 0) res.status(404).send(model.modelName + ' not found.');
            res.status(200).send(docs);
        });
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
        else {
            doc.remove();
            res.send('Successfully deleted document');
        }
    });
}

function post(body, res, model) {
    model.create(body, (err, docs) => {
        console.log(docs);
        if (err) res.status(400).send(err);
        if (!(docs instanceof Array)) docs = [docs];
        console.log(docs[0]);
        res.status(200).send(docs[0]);
    });
}

function multiLevelPost(id, body, res, levels) {
    // TODO: Implement a multiple object post.
}

// only second level posting
function deepPost(id, body, res, parent, child, isSingle) {
    let dest = '';
    if (isSingle) dest = child.modelName.toLowerCase();
    else dest = child.modelName.toLowerCase() + 's';
    parent.findById(id, (err, p) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (p === undefined) {
            res.status(404).send('No ' + parent + ' found');
            return;
        }
        child.create(body, (err, childs) => {
            if (err) res.status(400).send(err);
            if (p[dest] === undefined) p[dest] = [];
            if (childs instanceof Array) {
                for (let doc of childs) {
                    p[dest].push(doc._id);
                }
            } else if (isSingle) p[dest] = childs._id;
            else p[dest].push(childs._id);
            p.save((err, doc) => {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                if (!(childs instanceof Array)) childs = [childs];
                res.send(childs);
            });
        });
    });
}

export {get, deepGet, getAll, put, del, post, deepPost};