const express = require('express');
const router = express.Router();

const {
    getFolders,
    createFolder,
    getFolderById,
    updateFolder,
    deleteFolder
} = require('../controller/folderController');

router.route('/')
    .get(getFolders)
    .post(createFolder);

router.route('/:id')
    .get(getFolderById)
    .put(updateFolder)
    .delete(deleteFolder);

module.exports = router;