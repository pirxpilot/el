[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# el

creates HTML from jade like expressions

Particularly useful if you are a fan of [`insertAdjacentHTML`][1] but if setting `innerHTML` is your
thing `el` works just as well.

## Installation

  Install with [npm]:

    $ npm install el-component

## API

### el(tag, content, attributes)

- `tag` - can be the name of HTML tag (`span`, `img` etc.) or a jade-like expression
- `content` - is an optional content of the tag
- `attributes` - object with a map of attributes added to the generated HTML, class attribute is
  merged with what was parsed from tag

Some examples:

    el('span', 'some text inside'); // <span>some text inside</span>
    el('span.title', 'Title');      // <span class="title">Title</span>
    el('span.title.car', 'Title');  // <span class="title car">Title</span>
    el('span#title.car', 'Title');  // <span class="car" id="title">Title</span>

you can skip the tag name if you want `div`:

    el('#title', 'Title');   // <div id="title">Title</div>
    el();                    // <div></div>

el knows about void elements:

    el('img', { src: 'http://example.com/img.png' }); // <img src="http://example.com/img.png">
    el('iframe', { src: 'http://example.com' });      // <iframe src="http://example.com"></iframe>


### el.xml(tag, content, attributes)

A version of `el` that can be used to render XML (SVG etc.). It has no notion of voids, which means it closes tags without content with `/>`.

Some examples:

    el.xml('path', { d: 'M0 0H5V7Z' }); // <path d="M0 0H5V7Z"/>

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/el-component
[npm-url]: https://npmjs.org/package/el-component

[build-url]: https://github.com/pirxpilot/el/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/el/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/el-component
[deps-url]: https://libraries.io/npm/el-component

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
[npm]: https://www.npmjs.org/
