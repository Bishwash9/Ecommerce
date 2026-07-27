import multer from "multer";

const allowedFileTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
]);

export const uploadProductImages = multer({
    storage: multer.memoryStorage(),

    limits: {
        files: 5, // Limit to 5 files
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },

    fileFilter: (req, file, cb) => {
        if(!allowedFileTypes.has(file.mimetype)) {
            cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
            return;
        }

        cb(null, true);
    },
}).array("images", 5); // Expecting an array of files with the field name "images" and a maximum of 5 files