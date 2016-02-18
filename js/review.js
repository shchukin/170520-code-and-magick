function Review(data) {
  this._data = data
}

Review.prototype = {

  _data: '',

  render: function() {
    console.log( this._data )
  }
};



var singleReview = new Review('Hello, Review!');

console.log(singleReview);
singleReview.render();