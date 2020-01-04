import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    title: String,
    description: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    deleted: { type: Date, default: Date.now },
});
