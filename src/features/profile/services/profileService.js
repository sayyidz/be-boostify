require('dotenv').config();

const getImageUrl = (fileName, userName) => {
    const baseUrl = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!fileName || !userName) {
        throw new Error('File name and user name are required to retrieve the image URL.');
    }

    // Ensure the file name includes the user's name for security
    if (!fileName.includes(userName)) {
        throw new Error('File name does not match the user name.');
    }

    // Construct the full URL for the image
    const imageUrl = `${baseUrl}${fileName}`;
    return imageUrl;
};

module.exports = {
    getImageUrl
};
