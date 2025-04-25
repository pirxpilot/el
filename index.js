// see: http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
const voids = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

function htmlTag(tag, content, attrStr) {
  const text = ['<', tag, attrStr ? ` ${attrStr}` : '', '>'];
  if (!voids.has(tag)) {
    text.push(content || '', '</', tag, '>');
  }
  return text;
}

function xmlTag(tag, content, attrStr) {
  const text = ['<', tag, attrStr ? ` ${attrStr}` : ''];
  if (!content || !content.length) {
    text.push('/>');
  } else {
    text.push('>', content, '</', tag, '>');
  }
  return text;
}

function toStr(tagFn, tag, content, attrs) {
  if (typeof content !== 'string') {
    attrs = content;
    content = '';
  }

  tag = tag || '';
  attrs = attrs || {};

  let classes = tag.split('.');
  tag = classes.shift() || 'div';
  if (classes.length) {
    classes = classes.join(' ');
    if (attrs['class']) {
      attrs['class'] += ` ${classes}`;
    } else {
      attrs['class'] = classes;
    }
  }
  const ids = tag.split('#');
  if (ids.length > 1) {
    tag = ids[0] || 'div';
    attrs.id = ids[1];
  }

  const attrStr = Object.keys(attrs)
    .map(function (attr) {
      return `${attr}="${attrs[attr]}"`;
    })
    .join(' ');

  return tagFn(tag, content, attrStr).join('');
}

module.exports = toStr.bind(null, htmlTag);
module.exports.xml = toStr.bind(null, xmlTag);
