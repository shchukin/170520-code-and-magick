'use strict';

function Photo(url) {
  this.src = url;
  this.element = document.createElement('img');
  this.element.src = this.src;
}

Photo.prototype.renderElement = function(location) {
  location.appendChild(this.element);
};

Photo.prototype.removeElement = function() {
  if (this.element.parentNode) {
    this.element.parentNode.removeChild(this.element);
  }
};

module.exports = Photo;
