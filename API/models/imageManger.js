const sharp = require('sharp');

module.exports.saveImage = (imageBuffer, imageName, destFolder) => {
    console.log(imageBuffer);
    
    return sharp(imageBuffer)
        .jpeg()
        .resize({
            fit: 'inside',
            width: 1920,
            height: 1080
        })
        .toFile(`${destFolder}/${imageName}.jpeg`);
};
