const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            default: null,
        },
        path: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Folder",
            },
        ],
        owner: {
            type: String,
            default: "local",
        },
    },
    { timestamps: true }
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;