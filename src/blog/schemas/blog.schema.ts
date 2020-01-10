import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'cant be blank'] },
    description: { type: String, required: [true, 'cant be blank'] },
    body: { type: String, required: [true, 'cant be blank'] },
    author: String,
    cat_id: { type: Number },
}, {
    versionKey: false,
    timestamps: true,
});
