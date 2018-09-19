import {StatusError} from '../utils/error';
import mongoose from 'mongoose';

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

// Todo: Probably integrate in deepGet-Function above
function deepGetSolution(id, parent, child) {
    return new Promise((resolve, reject) => {
        parent.findById(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            if (doc === undefined || doc === null) reject(new StatusError(404, parent.modelName + ' not found.'));
            child.find().where('_id').in(doc.solution).exec((err, docs) => {
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
            if (doc === null) reject(new StatusError(404, 'No ' + model.modelName + ' with ' + id + ' was found.'));
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
            if (doc === null) reject(new StatusError(404, 'No ' + model.modelName + ' with ' + id + ' was found.'));
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
            resolve(docs);
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
    return new Promise((resolve, reject) => {
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

// ISSUE 10: Implement a way to post multi level objects.
function bulkPost(id, body, parentModel, model) {
    return new Promise((resolve, reject) => {
        parentModel.findById(id).exec().then((parent) => {
            if (!(body instanceof Array)) body = [body];
            let grandChildModel;
            let promises = [];
            for (let child of body) {
                for (let key in child) {
                    if (child[key] instanceof Array) {
                        grandChildModel = key.substring(0, key.length - 1);
                        grandChildModel = grandChildModel.charAt(0).toUpperCase() + grandChildModel.slice(1);
                        try {
                            grandChildModel = mongoose.model(grandChildModel);
                            for (let item of child[key]) {
                                if (item instanceof Object) {
                                    promises.push(grandChildModel.create(item).then((doc) => {
                                        child[key] = child[key].filter(e => e !== item);
                                        child[key].push(doc._id);
                                    }).catch((err) => reject(err)));
                                }
                            }
                        } catch (err) {
                            continue;
                        }
                    } else if (child[key] instanceof Object) {
                        grandChildModel = key.charAt(0).toUpperCase() + key.slice(1);
                        grandChildModel = mongoose.model(grandChildModel);
                        promises.push(grandChildModel.create(child[key]).then((doc) => {
                            child[key] = doc._id;
                        }).catch((err) => reject(err)));
                    }
                }
            }
            Promise.all(promises).then(() => {
                model.create(body).then((doc) => {
                    resolve(doc);
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        });
    });
}

export {get, deepGet, deepGetSolution, getAll, put, del, post, deepPost, bulkPost};