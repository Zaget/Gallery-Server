const photoNameArray = require('./sdcPhotos');

const generateRandomPhotos = (numPhotos) => {
  const photos = [];
  while (photos.length !== numPhotos) {
    const randPhotoNamePos = Math.floor(Math.random() * photoNameArray.length);
    if (!photos.includes(photoNameArray[randPhotoNamePos])) {
      photos.push(photoNameArray[randPhotoNamePos]);
    }
  }
  return photos;
};

module.exports = generateRandomPhotos;
