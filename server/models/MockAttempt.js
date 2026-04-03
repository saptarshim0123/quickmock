const mongoose = require('mongoose');

const mockAttemptSchema = new mongoose.Schema(
    {
        mockTest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MockTest",
            required: true,
        },
        owner: {
            type: String,
            default: "local",
        },
        answers: [
            {
                questionRef: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                },
                questionSnapshot: { type: String },
                optionsSnapshot: { type: mongoose.Schema.Types.Mixed },
                correctAnswerSnapshot: { type: String },
                explanationSnapshot: { type: String },
                selected: {
                    type: String,
                    default: null,
                },
                isCorrect: {
                    type: Boolean,
                    default: false,
                },
                markedForReview: {
                    type: Boolean,
                    default: false,
                },
                timeTaken: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        score: {
            type: Number,
            default: 0,
        },
        accuracy: {
            type: Number,
            default: 0,
        },
        totalTimeTaken: {
            type: Number, 
            default: 0,
        },
        status: {
            type: String,
            enum: ["in-progress", "completed"],
            default: "in-progress",
        },
    },
    { timestamps: true }
);

const MockTest = mongoose.model('MockTest', mockAttemptSchema);

module.exports = MockTest;