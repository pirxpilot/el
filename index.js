module.exports = el;

// see: http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
var voids = [
  'area', 'base', 'br', 'col', 'embed',
  'hr', 'img', 'input', 'keygen', 'link',
  'menuitem', 'meta', 'param', 'source', 'track', 'wbr'
];

function el(tag, content, attrs) {
  var attrStr, classes, ids, text;

  if (typeof content !== 'string') {
    attrs = content;
    content = '';
  }

  tag = tag || '';
  content = content || '';
  attrs = attrs || {};

  classes = tag.split('.');
  tag = classes.shift() || 'div';
  if (classes.length) {
    classes = classes.join(' ');
    if (attrs['class']) {
      attrs['class'] += ' ' + classes;
    } else {
      attrs['class'] = classes;
    }
  }
  ids = tag.split('#');
  if (ids.length > 1) {
    tag = ids[0] || 'div';
    attrs.id = ids[1];
  }

  attrStr = Object.keys(attrs).map(function(attr) {
    return attr +  '="' + attrs[attr] + '"';
  }).join(' ');


  text = ['<',
    tag,
    attrStr ? ' ' + attrStr :  '',
    '>'
  ];
  if(voids.indexOf(tag) < 0) {
    text = text.concat([
      content,
      '</',
      tag,
      '>'
    ]);
  }
  return text.join('');
}