import { describe, it } from 'node:test';
import el, { xml } from '../index.js';

/* global describe, it */

describe('el', () => {
  it('should generate simple element', t => {
    t.assert.equal(el('iframe'), '<iframe></iframe>');
    t.assert.equal(el(), '<div></div>');
  });

  it('should generate content', t => {
    t.assert.equal(el('span', 'some text inside'), '<span>some text inside</span>');
  });

  it('should parse class', t => {
    t.assert.equal(el('span.title', 'Title'), '<span class="title">Title</span>');
    t.assert.equal(el('span.title.car', 'Title'), '<span class="title car">Title</span>');
    t.assert.equal(el('span.title', 'Title', { class: 'car' }), '<span class="car title">Title</span>');
  });

  it('should parse ID', t => {
    t.assert.equal(el('span#title', 'Title'), '<span id="title">Title</span>');
    t.assert.equal(el('#title', 'Title'), '<div id="title">Title</div>');
    t.assert.equal(el('span#title.car', 'Title'), '<span class="car" id="title">Title</span>');
    t.assert.equal(el('span#title.car.a.b', 'Title'), '<span class="car a b" id="title">Title</span>');
    t.assert.equal(el('#title.car', 'Title'), '<div class="car" id="title">Title</div>');
  });

  it('should treat void elements differently from non void elements', t => {
    t.assert.equal(el('img', { src: 'http://example.com/img.png' }), '<img src="http://example.com/img.png">');
    t.assert.equal(el('iframe', { src: 'http://example.com' }), '<iframe src="http://example.com"></iframe>');
  });
});

describe('xml', () => {
  it('should render empty elements', t => {
    t.assert.equal(xml('svg'), '<svg/>');
  });

  it('should ignore voids', t => {
    t.assert.equal(xml('img', { src: 'http://example.com/img.png' }), '<img src="http://example.com/img.png"/>');
  });

  it('should render content without attributes', t => {
    t.assert.equal(xml('path', 'some text inside'), '<path>some text inside</path>');
  });

  it('should render attributes without content', t => {
    t.assert.equal(
      xml('path', {
        width: 1,
        height: '0.5em'
      }),
      '<path width="1" height="0.5em"/>'
    );
  });

  it('should render attributes with content', t => {
    t.assert.equal(
      xml('item', 'some text', {
        width: 1,
        height: '0.5em'
      }),
      '<item width="1" height="0.5em">some text</item>'
    );
  });
});
