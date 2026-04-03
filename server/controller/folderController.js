const Folder = require("../models/Folder");

// GET all folders
exports.getFolders = async (req, res) => {
    try {
        const keyword = req.query.search
            ? { name: { $regex: req.query.search, $options: 'i' } }
            : {};
        const folders = await Folder.find({...keyword}).sort({ createdAt: -1 });
        res.status(200).json(folders);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to fetch entries'});
    }
}

// CREATE a folder
exports.createFolder = async (req, res) => {
    try {
        const { name, parent, owner } = req.body;
        
        let path = [];
        if (parent) {
            const parentFolder = await Folder.findById(parent);
            if (!parentFolder) {
                return res.status(404).json({ message: 'Parent folder not found' });
            }
            path = [...parentFolder.path, parentFolder._id];
        }

        const newFolder = new Folder({
            name,
            parent: parent || null,
            path,
            owner: owner || "local",
        });

        const savedFolder = await newFolder.save();
        res.status(201).json(savedFolder);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to create folder' });
    }
};

// GET single folder by ID
exports.getFolderById = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }
        res.status(200).json(folder);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to fetch folder' });
    }
};

// UPDATE a folder
exports.updateFolder = async (req, res) => {
    try {
        const { name, parent, owner } = req.body;
        
        const folder = await Folder.findById(req.params.id);
        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        if (name) folder.name = name;
        if (owner) folder.owner = owner;
        
        if (parent !== undefined) {
             folder.parent = parent || null;
             if (parent) {
                 const parentFolder = await Folder.findById(parent);
                 if (parentFolder) {
                     folder.path = [...parentFolder.path, parentFolder._id];
                 }
             } else {
                 folder.path = [];
             }
        }

        const updatedFolder = await folder.save();
        res.status(200).json(updatedFolder);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to update folder' });
    }
};

// DELETE a folder
exports.deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findByIdAndDelete(req.params.id);
        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to delete folder' });
    }
};