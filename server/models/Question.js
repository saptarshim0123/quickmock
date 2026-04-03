const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        mockTest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MockTest",
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        options: [
            {
                id: { type: String, required: true }, 
                text: { type: String, required: true },
            },
        ],
        correct: {
            type: String,
            required: true, 
        },
        explanation: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;