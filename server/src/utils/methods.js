/**
 * @overview methods is an accumulation of functions that display a middleware between the routings and the mongoose framework.
 * @author Thomas Oswald
 */

import {StatusError} from '../utils/errors';
import mongoose, { Model } from 'mongoose'; // eslint-disable-line no-unused-vars

/**
 * Gets a mongoose document.
 * @param {string} id of the model.
 * @param {Model} model specific mongoose model.
 * @param {object} populateObj object with populate parameters.
 * @see in reference to http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html
 * @returns documents of the model.
 */
function get(id, model, populateObj) {
    return new Promise((resolve, reject) => {
        if (populateObj === undefined) {
            model.findById(id, (err, doc) => {
                if (err) reject(new StatusError(400, err));
                else if (doc === undefined) reject(new StatusError(404, model.modelName + ' not found.'));
                else resolve(doc);
            });
        } else {
            model.findById(id).populate(populateObj).exec((err, doc) => {
                if (err) reject(new StatusError(400, err));
                else if (doc === undefined) reject(new StatusError(404, model.modelName + ' not found.'));
                else resolve(doc);
            });
        }
    });
}

/**
 * Gets a child or children from its parent.
 * @param {string} id of the parent mongoose model.
 * @param {Model} parent mongoose model.
 * @param {Model} child mongoose model.
 * @param {boolean} isSingle whether child has a one-to-one or one-to-many relation with its parent.
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
                if (docs === undefined) reject(new StatusError(404, child.modelName + ' not found.'));
                else resolve(docs);
            });
        });
    });
}

/**
 * Gets all documents of a specific model.
 * @param {Model} model specific mongoose model.
 * @param {object} populateObj object with populate parameters.
 */
function getAll(model, populateObj) {
    return new Promise((resolve, reject) => {
        if (populateObj === undefined) {
            model.find({}, (err, docs) => {
                if (err) reject(new StatusError(400, err));
                if (docs === null || docs.length === 0) reject(new StatusError(404, model.modelName + ' not found.'));
                resolve(docs);
            });
        } else {
            model.find({}).populate(populateObj).exec().then((docs) => {
                resolve(docs);
            }).catch((err) => reject(err));
        }
    });
}

/**
 * Updates a specific document by using its model and its id.
 * @param {string} id of the document.
 * @param {object} body that will be used to update the document.
 * @param {Model} model specific mongoose model.
 */
function put(id, body, model) {
    return new Promise((resolve, reject) => {
        model.findById(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            if (doc === null) reject(new StatusError(404, 'No ' + model.modelName + ' with ' + id + ' was found.'));
            doc.set(body);
            doc.save()
                .then((doc) => resolve(doc))
                .catch((err) => reject(new StatusError(500, err)));
        });
    });
}

/**
 * Deletes a document.
 * @param {string} id of the document.
 * @param {Model} model its mongoose model.
 * @returns {string} success message.
 */
function del(id, model) {
    return new Promise((resolve, reject) => {
        model.findByIdAndRemove(id, (err, doc) => {
            if (err) reject(new StatusError(400, err));
            if (doc === null) reject(new StatusError(404, 'No ' + model.modelName + ' with ' + id + ' was found.'));
            else {
                doc.remove();
                resolve('Deleted ' + model.modelName + ' with id: ' + id + ' successfully.');
            }
        });
    });
}

/**
 * Deletes child documents of a parent document.
 * @param {string} id of the document.
 * @param {Model} model its mongoose model.
 * @returns {string} success message.
 */
function deepDel(id, parentModel, childModel, isSingle) {
    return new Promise((resolve, reject) => {
        let path = childModel.modelName.toLowerCase();
        path += (isSingle) ? '' : 's';
        parentModel.findById(id).populate({ path: path }).exec()
            .then((parent) => {
                if (parent[path] === null || (parent[path] instanceof Array && parent[path].length === 0)) {
                    reject(new StatusError(404, 'No ' + path + ' found within ' + parentModel.modelName + ' with id: ' + id));
                }
                for (let doc of parent[path]) {
                    if (doc.persistent === undefined || !doc.persistent) doc.remove();
                }
                parent[path] = (isSingle) ? null : [];
                parent.save().then((doc) => {
                    resolve('Deleted ' + path + ' of ' + parentModel.modelName + ' with id: ' + id + ' successfully.');
                });
            }).catch((err) => reject(err));
    });
}

/**
 * Creates one or more new documents with the model.
 * @param {object} body of the new document.
 * @param {Model} model its mongoose model.
 * @returns {Array} Array of documents.
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
 * Creates one ore many children under a parent model.
 * @param {string} id of the parent.
 * @param {object} body of the child or children.
 * @param {Model} parent model of the existing document.
 * @param {Model} child model of the soon to be children or child.
 * @param {boolean} isSingle indicates whether one or multiple children are created.
 * @returns {Array} Array of childs.
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

/**
 * Creates children and grandchildren in bulk.
 * @param {*} id ID of a parent.
 * @param {*} body of structure: parent: { children: [ grandChild or grandChildren ] }
 * @param {*} parentModel model of parent.
 * @param {*} childModel model of child.
 */
function bulkPost(id, body, parentModel, childModel) {
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
                childModel.create(body).then((docs) => {
                    let ids = [];
                    for (let doc of docs) { ids.push(doc._id); }
                    parent[childModel.modelName.toLowerCase() + 's'].push(...ids);
                    parent.save().then((doc) => {
                        resolve(doc);
                    }).catch((err) => reject(err));
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        });
    });
}

export {get, deepGet, getAll, put, del, deepDel, post, deepPost, bulkPost};