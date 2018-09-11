import {StatusError} from '../utils/error';

/**
 * @param {*} id
 * @param {*} model
 */
function get(id, model) {
    return new Promise((resolve, reject) => {
        model.findById(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            else if (doc === undefined) reject(new StatusError(404, model.modelName + ' not found.'));
            else resolve(doc);
        });
    });
}

/**
 *
 * @param {*} id
 * @param {*} parent
 * @param {*} child
 * @param {*} isSingle
 */
function deepGet(id, parent, child, isSingle) {
    return new Promise((resolve, reject) => {
        let ids = '';
        if (isSingle) ids = child.modelName.toLowerCase();
        else ids = child.modelName.toLowerCase() + 's';
        parent.findById(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            if (doc === undefined) reject(new StatusError(404, parent.modelName + ' not found.'));
            child.find().where('_id').in(doc[ids]).exec((err, docs) => {
                if (err) reject(new StatusError(400, err));
                if (docs === undefined || docs.length === 0) reject(new StatusError(404, child.modelName + ' not found.'));
                else resolve(docs);
            });
        });
    });
}

/**
 *
 * @param {*} model
 */
function getAll(model) {
    return new Promise((resolve, reject) => {
        model.find({}, (err, docs) => {
            if (err) reject(new StatusError(400, err));
            if (docs === null || docs.length === 0) reject(new StatusError(404, model.modelName + ' not found.'));
            resolve(docs);
        });
    });
}

/**
 *
 * @param {*} id
 * @param {*} body
 * @param {*} model
 */
function put(id, body, model) {
    return new Promise((resolve, reject) => {
        model.findById(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            if (doc === null) reject(new StatusError(404, 'No ' + model.modeName + ' with ' + id + ' was found.'));
            doc.set(body);
            doc.save((err, res) => {
                if (err) reject(new StatusError(500, err));
                else resolve(res);
            });
        });
    });
}

/**
 *
 * @param {*} id
 * @param {*} model
 */
function del(id, model) {
    return new Promise((resolve, reject) => {
        model.findByIdAndRemove(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            if (doc === null) reject(new StatusError(404, 'No ' + model.modeName + ' with ' + id + ' was found.'));
            else {
                doc.remove();
                resolve();
            }
        });
    });
}

/**
 *
 * @param {*} body
 * @param {*} model
 */
function post(body, model) {
    return new Promise((resolve, reject) => {
        model.create(body, (err, docs) => {
            if (err) reject(new StatusError(400, err));
            if (docs === null || docs.length === 0) reject(new StatusError(404, model.modelName + ' not found.'));
            if (!(docs instanceof Array)) docs = [docs];
            else resolve(docs);
        });
    });
}

/**
 * Only 2 level post.
 * @param {*} id
 * @param {*} body
 * @param {*} parent
 * @param {*} child
 * @param {*} isSingle
 */
function deepPost(id, body, parent, child, isSingle) {
    return Promise((resolve, reject) => {
        let dest = '';
        if (isSingle) dest = child.modelName.toLowerCase();
        else dest = child.modelName.toLowerCase() + 's';
        parent.findById(id, (err, p) => {
            if (err) reject(new StatusError(400, err));
            else if (p === undefined) reject(new StatusError(404, 'No ' + parent.modeName + ' with ' + id + ' was found.'));
            else {
                child.create(body, (err, childs) => {
                    if (err) reject(new StatusError(400, err));
                    else if (childs === null || childs.length === 0) reject(new StatusError(404, child.modelName + ' not found.'));
                    else {
                        if (p[dest] === undefined) p[dest] = [];
                        if (childs instanceof Array) {
                            for (let doc of childs) {
                                p[dest].push(doc._id);
                            }
                        } else if (isSingle) p[dest] = childs._id;
                        else p[dest].push(childs._id);
                        p.save((err, doc) => {
                            if (err) reject(new StatusError(400, err));
                            else {
                                if (!(childs instanceof Array)) childs = [childs];
                                resolve(childs);
                            }
                        });
                    }
                });
            }
        });
    });
}

export {get, deepGet, getAll, put, del, post, deepPost};