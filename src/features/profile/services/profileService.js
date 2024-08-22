require('dotenv').config();

const getImageUrl = (fileName, userName) => {
    const baseUrl = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!fileName || !userName) {
        throw new Error('File name and user name are required to retrieve the image URL.');
    }

    // You can add any logic here to validate or customize the fileName based on the userName if needed.
    // For now, we just concatenate the base URL with the file name.
    const imageUrl = `${baseUrl}${fileName}`;
    return imageUrl;
};

module.exports = {
    getImageUrl
};