module.exports = el;


function el(tag, content, attrs) {
  var attrStr, classes, ids;

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

  return ['<',
    tag,
    attrStr ? ' ' + attrStr :  '',
    '>',
    content,
    '</',
    tag,
    '>'
  ].join('');
}