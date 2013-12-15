var el = require('..');

/* global describe, it */

describe('el', function() {

  it('should generate simple element', function() {
    el('iframe').should.eql('<iframe></iframe>');
    el().should.eql('<div></div>');
  });

  it('should generate content', function() {
    el('span', 'some text inside').should.eql('<span>some text inside</span>');
  });

  it('should parse class', function() {
    el('span.title', 'Title').should.eql('<span class="title">Title</span>');
    el('span.title.car', 'Title').should.eql('<span class="title car">Title</span>');
    el('span.title', 'Title', { 'class': 'car' }).should.eql('<span class="car title">Title</span>');
  });

  it('should parse ID', function() {
    el('span#title', 'Title').should.eql('<span id="title">Title</span>');
    el('#title', 'Title').should.eql('<div id="title">Title</div>');
    el('span#title.car', 'Title').should.eql('<span class="car" id="title">Title</span>');
    el('span#title.car.a.b', 'Title').should.eql('<span class="car a b" id="title">Title</span>');
    el('#title.car', 'Title').should.eql('<div class="car" id="title">Title</div>');
  });
});