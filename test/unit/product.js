/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Product      = require('../../app/models/product'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'template-test';

describe('Product', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Product object', function(){
      var u = new Product({
        name: 'PS4',
        photo: 'ps4.jpg',
        price: 499.99
      });
      expect(u).to.be.instanceof(Product);
      expect(u.name).to.equal('PS4');
      expect(u.photo).to.equal('ps4.jpg');
      expect(u.price).to.equal(499.99);
    });
  });

  describe('.all', function(){
    it('should display all products in the product database', function(done){
      Product.all(function(err, products){
        expect(products).to.have.length(5);
        done();
      });
    });
  });
});

