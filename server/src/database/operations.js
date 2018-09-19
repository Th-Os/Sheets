import mongoose from 'mongoose';

// TODO: design populating more dynamic.

/**
 * Populating layers.
 * @param {*} doc a mongoose document.
 * @param {*} layer amount of layers to be populated. [optional]
 * @param {*} specificNode a field of the document that will be populated. [optional]
 */
function populate(doc, layer = 3, specificNode = undefined) {
    return new Promise((resolve, reject) => {
        let model = doc.constructor;
        let schema = model.schema;
        let parentFields;
        let currentFields = getFieldsToPopulate(schema, specificNode);
        if (layer > 0) {
            populateLayer(doc, currentFields).then((result) => {
                for (let item of result) {
                    doc[item.path] = item.out;
                }
                if (layer > 1) {
                    parentFields = currentFields;
                    currentFields = [];
                    let promises = [];
                    for (let field of parentFields) {
                        let fields = getFieldsToPopulate(mongoose.model(field.model).schema);
                        currentFields.push(fields);
                        if (field.isMany) {
                            for (let idx = 0; idx < doc[field.name].length; idx++) {
                                promises.push(populateLayer(doc[field.name][idx], fields).then((res) => {
                                    if (res !== null && res.length > 0) {
                                        for (let item of res) {
                                            doc[field.name][idx][item.path] = item.out;
                                        }
                                    }
                                }).catch((err) => console.error(err)));
                            }
                        } else {
                            promises.push(populateLayer(doc[field.name], fields).then((res) => {
                                if (res !== null && res.length > 0) {
                                    for (let item of res) {
                                        doc[field.name][item.path] = item.out;
                                    }
                                }
                            }).catch((err) => console.error(err)));
                        }
                    }
                    Promise.all(promises).then(() => {
                        if (layer > 2) {
                            parentFields = currentFields;
                            currentFields = [];
                            promises = [];

                            // TODO: implement last layer

                            for (let field of parentFields) {
                                console.log(field);
                                let fields = getFieldsToPopulate(mongoose.model(field.model).schema);
                                currentFields.push(fields);
                                if (field.isMany) {
                                    for (let idx = 0; idx < doc[field.name].length; idx++) {
                                        promises.push(populateLayer(doc[field.name][idx], fields).then((res) => {
                                            if (res !== null && res.length > 0) {
                                                for (let item of res) {
                                                    doc[field.name][idx][item.path] = item.out;
                                                }
                                            }
                                        }).catch((err) => console.error(err)));
                                    }
                                } else {
                                    promises.push(populateLayer(doc[field.name], fields).then((res) => {
                                        if (res !== null && res.length > 0) {
                                            for (let item of res) {
                                                doc[field.name][item.path] = item.out;
                                            }
                                        }
                                    }).catch((err) => console.error(err)));
                                }
                            }
                            Promise.all(promises).then(() => {
                                console.log(doc);
                                resolve(doc);
                            });
                        } else resolve(doc);
                    });
                } else resolve(doc);
            });
        }
    });
}

function populateLayer(doc, fields) {
    let promises = [];
    let result = [];

    for (let field of fields) {
        promises.push(populateField(doc, field).then((res) => {
            if (res !== null) result.push({ path: field.name, out: res });
        }).catch((err) => console.error(err)));
    }
    return Promise.all(promises).then(() => { return result; });
}

function populateField(parent, field) {
    if (field.isMany) {
        return mongoose.model(field.model).find().where('_id').in(parent[field.name]).then((res) => {
            if (!(res instanceof Array)) res = [res];
            console.log(field.name + '-result: ' + res);
            return res;
        });
    } else {
        return mongoose.model(field.model).findById(parent[field.name]).then((res) => {
            console.log(field.name + '-result: ' + res);
            return res;
        });
    }
}

function getFieldsToPopulate(schema, specificNode = undefined) {
    let fields = [];
    for (let key in schema.tree) {
        let isMany = false;
        let column = schema.tree[key];
        let type;
        if (column instanceof Array) {
            isMany = true;
            column = column[0];
        }
        if (column instanceof Object) {
            for (let key in column.type) {
                type = column.type[key];
            }
        }
        if (type !== undefined && type === 'ObjectId' && key !== '_id') {
            if (specificNode === undefined || key === specificNode) {
                fields.push({'name': key, 'isMany': isMany, 'model': column.ref});
            }
        }
    }
    return fields;
}

export {populate};