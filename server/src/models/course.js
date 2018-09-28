/**
 * @overview The definition of the schema and model of course.
 * @author Thomas Oswald and Johannes Dengler
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    min_req_sheets: {
        type: Number,
        required: true
    },
    sheets: [{
        type: Schema.Types.ObjectId,
        ref: 'Sheet',
        required: false
    }]
});

courseSchema.post('remove', (doc) => {
    mongoose.model('Sheet').find().where('_id').in(doc.sheets).exec((err, docs) => {
        if (err) throw err;
        for (let doc of docs) {
            doc.remove();
        }
    });
});

export let Course = mongoose.model('Course', courseSchema);