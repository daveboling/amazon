'use strict';



function Product(o){
  this.name  = o.name;
  this.photo = o.photo;
  this.price = parseFloat(o.price.toFixed(2));
}

Object.defineProperty(Product, 'collection', {
  get: function(){return global.mongodb.collection('products');}
});

Product.all = function(cb){
  Product.collection.find().toArray(cb);
}



module.exports = Product;