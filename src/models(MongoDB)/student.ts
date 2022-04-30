import { model, Schema } from 'mongoose';

import { teacherModel } from './teacher';

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    },

    age: {
        type: Number,
        default: 0,
    },

    teacher: {
        type: Schema.Types.ObjectId,
        ref: teacherModel,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

studentSchema.virtual('nickName').get(function () {
    return `${this.name}_${this.age}`;
});

studentSchema.pre('findOne', function () {
    this.populate('teacher');
});

export const studentModel = model('student', studentSchema);
