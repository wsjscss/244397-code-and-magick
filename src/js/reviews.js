'use strict';

var getData = function(url, callback) {

  window.jspCallack = function(data) {
    callback(data);
  };

  var sc = document.createElement('script');
  sc.src = url;
  document.body.appendChild(sc);


};

getData('data.js', draw);

function draw(data) {
  data.forEach(function(el) {
    console.log(el);
  });
}
