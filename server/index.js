require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const list = require('../database/list.js');
const mockData = require('./mockData.js');

const app = express();
const PORT = 3002;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  const query = list.findOne({ place_id: req.params.id });
  query.exec((err, photos) => {
    if (err) {
      console.log(err);
    } else {
      var s3String = '//s3-us-west-1.amazonaws.com/apateezgallery93/';
      const restaurantPhotosArray = [];
      if (!photos) { // error handling to avoid server stopping to non-existent place_id
        photos = mockData;
      }
      for (let i = 0; i < photos.photos.length; i++) {
        var s3String = `//s3-us-west-1.amazonaws.com/apateezgallery93/${photos.photos[i].photo_reference}.png`;
        restaurantPhotosArray.push(s3String);
      }
      res.send({ photoArray: restaurantPhotosArray, restaurantName: photos.name, place_id: photos.place_id });
    }
  });
});

// search Functionality in header
app.get('/:searchValue', (req, res) => {
  const searchQuery = req.params.searchValue;
  // recurse the search string and take off last char of the search string at every loop
  var recursefindPlaceId = function (searchQuery) {
    const query = list.findOne({ name: { $regex: searchQuery, $options: 'i' } });
    query.exec((err, photos) => {
      if (err) {
        console.log(err);
      } else if (photos) {
        res.send({ place_id: photos.place_id });
      } else {
        searchQuery = searchQuery.slice(0, -1);
        recursefindPlaceId(searchQuery);
      }
    });
  };
  recursefindPlaceId(searchQuery);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// const fs = require('fs');
// const requestImg = require('request').defaults({ encoding: null });
// const url = require('url');

// script for saving 1000 images locally
// var j =1;
// list.find(function(err, data){
//    if (err){
//     console.log(err);
//    } else{

//        data.map(function(restaurant){

//            restaurant.photos.map(function(photo){
//              //photo_reference = photo.photo_reference;
//              requestImg.get
//                 ("https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+photo.photo_reference+"&key=AIzaSyD7olNRQRLF6mNFwI0dyEyECWNqF8xXNZQ", function(error, response, body){
//          if (error){
//            console.log(error)

//          }else{
//          console.log("writeFile---" + photo.photo_reference);
//            fs.writeFile(__dirname+'/n/'+
// photo.photo_reference+'.png', body, function(){console.log(j++)} );
//          }
//           })
//          })

//        })
//   }

// })

// res.end();

