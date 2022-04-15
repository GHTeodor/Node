import { Schema, model } from 'mongoose';

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
        // ref: 'teacher',
        ref: teacherModel,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

studentSchema.virtual('fullName').get(function () {
    // @ts-ignore
    return `${this.name} Zelenskii`;
});

// studentSchema.pre('findOne', function () {
//     this.populate('teacher');
// });

export const studentModel = model('student', studentSchema);
