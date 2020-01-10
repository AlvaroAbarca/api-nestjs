import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: {
        type: String,
        required: [true, 'cant be blank'],
    },
    description: { type: String, required: [true, 'cant be blank'] },
    posts: { type: Number, default: 0 },
    // author: String,
}, {
    versionKey: false,
    timestamps: true,
});
