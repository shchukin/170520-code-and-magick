'use strict';

var Photo = require('photo');
var Gallery = require('gallery');


var theaterElements = document.querySelectorAll('.photogallery-image');

var theaterData = [].map.call(theaterElements, function(item) {
  return new Photo(item.querySelector('img').getAttribute('src'));
});

var theaterGallery = new Gallery();

theaterGallery.setPictures(theaterData);

[].forEach.call(theaterElements, function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();
    var index = [].indexOf.call(theaterElements, this);
    location.hash = theaterData[index].src;
  });

});








