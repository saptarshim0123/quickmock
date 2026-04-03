const mongoose = require('mongoose');

const mockTestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        folder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            default: null,
        },
        topic: {
            type: String,
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "medium",
        },
        numQuestions: {
            type: Number,
            default: 10,
            max: 30,
        },
        duration: {
            type: Number,
            default: 30,
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        owner: {
            type: String,
            default: "local",
        },
    },
    { timestamps: true }
);

const MockTest = mongoose.model('MockTest', mockTestSchema);

module.exports = MockTest;