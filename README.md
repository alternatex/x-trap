# &lt;x-trap&gt;

A [X-Tag](http://www.x-tags.org) element for handling keyboard shortcuts &amp; gestures, backed by <a target="_blank" href="https://github.com/hammerjs/hammer.js">Hammer.js</a> and <a target="_blank" href="https://github.com/ccampbell/mousetrap">Mousetrap</a>.</h2>

> Maintained by [Gianni Furger](https://github.com/alternatex).

## Demo

> [Check it live](http://alternatex.github.io/x-trap).

## Install

Install with [Bower](http://bower.io):

```sh
$ bower install --save x-tag-trap
```

## Usage

1.  Import Web Components' polyfill:

    ```html
    <script src="dist/x-tags-components.js"></script>
    ```

2.  Import `hammer.js` to handle gestures:

    ```html
    <script src="dist/hammer.min.js"></script>
    ```
3.  Import `mousetrap.js` to handle keyboard shortcuts:

    ```html
    <script src="dist/mousetrap.min.js"></script>
    ```

3.  Import Custom Element:

    ```html
    <script src="dist/trap.js"></script>
    ```

4.  Start using it!

    ```html
    <x-trap></x-trap>
    ```

## Examples

#### HTML

```html
  <x-trap keys="a space command" action="window.open('http://spacecommandmusic.com');"></x-trap>
```

## Setup

In order to run it locally you'll need a basic server setup.

1. Install [Node.js](http://nodejs.org/download/)
2. Install [Grunt](http://gruntjs.com/):

    ```sh
    $ npm install --global grunt-cli
    ```
3. Install [Bower](http://bower.io/)
4. Install local dependencies:

    ```sh
    $ npm install && bower install
    ```

5. Run a local server and open `http://localhost:3001`.

    ```sh
    $ grunt connect
    ```

## Options

Attribute  | Options                   | Default              | Description
---        | ---                       | ---                  | ---
`keys`     | *string*                  | ``                   | Keys
`gestures` | *string*                  | ``                   | Gestures 
`action`   | *string/function*         | `function(){}`       | Action

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/webcomponents/element-boilerplate/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)

