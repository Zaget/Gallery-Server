const pgp = require('pg-promise')();

const connection = {
  user: 'steve',
  host: 'localhost',
  database: 'zaget-gallery',
  port: 5432,
};

const db = pgp(connection);


const getPhotos = (req, res) => {
  db.any('SELECT restaurants.name, photos.url FROM restaurants, photos WHERE restaurants.place_id=$1 and photos.place_id=$1', [req.params.id])
    .then((data) => {
      const restaurantPhotosArray = [];
      data.forEach(row => restaurantPhotosArray.push(`https://s3-us-west-1.amazonaws.com/zagetphotogallery/${row.url}`));
      res.send({ photoArray: restaurantPhotosArray, restaurantName: data[0].name, place_id: req.params.id });
    })
    .catch(error => (
      console.log(error)
    ));
};

const search = (req, res) => {
  const recurseFindPlaceId = (searchQuery) => {
    db.any('SELECT restaurants.place_id FROM restaurants WHERE restaurants.name=$1', [searchQuery])
      .then((data) => {
        if (data) {
          res.send({ place_id: data[0].place_id });
        } else {
          recurseFindPlaceId(searchQuery.slice(0, -1));
        }
      })
      .catch(error => (
        console.log(error)
      ));
  };
  recurseFindPlaceId(req.params.searchValue);
};

module.exports.getPhotos = getPhotos;
module.exports.search = search;
