import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    author: String,
    path: String,
    tags: [String],
    date_posted: { type: Date, default: Date.now },
});
