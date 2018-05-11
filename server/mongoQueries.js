const list = require('../database/list.js');

const search = (inputSearchQuery, res) => {
  const recurseFindPlaceId = (searchQuery) => {
    const query = list.findOne({ name: { $regex: searchQuery, $options: 'i' } });
    query.exec((err, photos) => {
      if (err) {
        console.log(err);
      } else if (photos) {
        res.send({ place_id: photos.place_id });
      } else {
        recurseFindPlaceId(searchQuery.slice(0, -1));
      }
    });
  };
  recurseFindPlaceId(inputSearchQuery);
};

const getPhotos = (req, res) => {
  const query = list.findOne({ place_id: req.params.id });
  query.exec((err, photos) => {
    if (err) {
      console.log(err);
    } else {
      if (photos === null) {
        res.send({ photoArray: [], restaurantName: '', place_id: -1 });
      }
      let s3String = '';
      const restaurantPhotosArray = [];
      for (let i = 0; i < photos.photos.length; i += 1) {
        s3String = `https://s3-us-west-1.amazonaws.com/zagetphotogallery/${photos.photos[i]}`;
        restaurantPhotosArray.push(s3String);
      }
      res.send({ photoArray: restaurantPhotosArray, restaurantName: photos.name, place_id: photos.place_id });
    }
  });
};

module.exports.search = search;
module.exports.getPhotos = getPhotos;
