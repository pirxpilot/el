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

function toStr(tagFn, tagStr, content, attrs) {
  if (typeof content !== 'string') {
    attrs = content;
    content = '';
  }

  attrs = attrs || {};

  let [tag = 'div', ...classes] = tagStr?.split('.') || [];
  if (classes.length) {
    const classesStr = classes.join(' ');
    if (attrs['class']) {
      attrs['class'] += ` ${classesStr}`;
    } else {
      attrs['class'] = classesStr;
    }
  }
  const ids = tag.split('#');
  if (ids.length > 1) {
    tag = ids[0] || 'div';
    attrs.id = ids[1];
  }

  const attrStr = Object.entries(attrs)
    .map(([attr, value]) => `${attr}="${value}"`)
    .join(' ');

  return tagFn(tag, content, attrStr).join('');
}

export default toStr.bind(null, htmlTag);
export const xml = toStr.bind(null, xmlTag);
