/**
 * @module x-trap
 */

var globDisabled = false;

(function(){

  /**
   * handleEvent: handle *
   * @return {undefined}
   */
  var handleEvent = function handleEvent(e){
    // TODO: implement add/update of bindings !!!!
  };

  /**
   * A X-Tag element for handling keyboard shortcuts
   *
   * Examples:
   *
   * <x-trap keys="a b c" action="function(){ alert(123); }"></x-trap>
   *
   * @class x-trap
   * @blurb Keyboard shortcuts for X-Tags/Brick
   * @author Gianni Furger
   * @categories Keyboard Shortcuts Bindings
   *
   */
  xtag.register('x-trap', {

    /**
     * isSupported: check if input source is supported
     * @return {boolean}
     */
    isSupported: function isSupported(source){
      if(source==='gestures'){
        return window.Mousetrap!==null;
      }
      else if(source==='keys'){
        return window.Hammer!==null;
      }
      throw new Error('Unknown input source:'+source);
    },

    /**
     * paused: flag to pause event propagation
     * @type {Boolean}
     */
    paused: false,

    /**
     * pause:
     * @type {undefined}
     */
    pause: function(){
      Mousetrap.pause();
    },

    /**
     * unpause:
     * @type {undefined}
     */
    unpause: function(){
      Mousetrap.unpause();
    },

    /**
     * record
     * @type {undefined}
     */
    record: function(cb){
      Mousetrap.record(cb);
    },

    /**
     * paused: flag to pause event propagation
     * @type {Boolean}
     */
    paused: false,

    /**
     * prototype:
     * @type {Object}
     */
    prototype: Object.create(HTMLElement.prototype),

    /**
     * accessors:
     * @type {Object}
     */
    accessors: {

      /**
       * paused: instance paused (vs paused from outer context)
       * @type {String}
       */
      paused: {
        attribute: {Boolean: true}
      },

      /**
       * gestures: gestures combination/flow
       * @type {String}
       */
      gestures: {
        attribute: { String: true }
      },

      /**
       * direction: gesture detection features
       * @more see hammer.js docs
       * @type {String} [DIRECTION_NONE, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_ALL]
       */
      direction: {
        attribute: {String: true}
      },

      /**
       * keys: keyboard combination/flow
       * @type {String}
       */
      keys: {
        attribute: {String: true}
      },

      /**
       * action: keyboard combination/flow
       * @type {String}
       */
      action: {
        attribute: {String: true}
      },

      /**
       * selector: document.querySelectorAll
       * @type {String}
       */
      selector: {
        attribute: {String: true}
      }
    },

    /**
     * lifecycle: DOM lifecycle events
     * @type {Object}
     */
    lifecycle: {
      inserted: function (){
        if(this.gestures && this.gestures.length>0){
          console.log("doing stuff cause gestures defined");
        }
        console.log("parent node is", this.parentNode);
      },
      created: function(){
        var $this = this;
        try {

          if(this.gestures && this.action){
            this.mc = new Hammer(this);
            this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            this.mc.on(this.gestures, function(ev){
              // TODO: implement for real
              if(!$this.paused && !xtag.tags['x-trap'].paused) {
                eval('(function(){ (function(){'+$this.action+'; }).apply($this);; $this.trap(); console.log(ev); }).apply($this);');
              }
            });
          }

          if(this.keys && this.action){
            Mousetrap.bind(this.keys, function(ev){
              // TODO: implement for real
              if(!$this.paused && !xtag.tags['x-trap'].paused) {
                eval('(function(){ (function(){'+$this.action+'; }).apply($this);; $this.trap(); console.log(ev); }).apply($this);');
              }
            });
          }

          this.insert();
        } catch(ex){
          console.error(ex);
        }
      },
      removed: function(){
        // TODO: fix. does not work with the DOM element already out to nirvana :-/
        if(this.gestures){
          this.mc.off(this.gestures);
          this.mc = null;
        } else if(this.keys){
          Mousetrap.unbind(this.keys);
        }
        this.remove();
      },
      attributeChanged: function(attribute, previous, current){
        var $this = this;
        var xattributes = xtag.tags['x-trap'].attributes;

        // check input: we only care about event handler relevant stuff
        if([xtag.tags['x-trap'].attributes.gestures.key,
            xtag.tags['x-trap'].attributes.keys.key,
            xtag.tags['x-trap'].attributes.action.key].indexOf(attribute)==-1) return false;

        if(attribute==xattributes.gestures.key){
          this.gestures = current;
        }

        if(attribute==xattributes.keys.key){
          this.keys = current;
        }

        if(attribute==xattributes.action.key){
          this.action = current;
        }

        if(this.gestures && this.action){
          this.mc.off(previous, '');
          this.mc.on(this.gestures, function(ev){
            // TODO: implement for real
            if(!$this.paused && !xtag.tags['x-trap'].paused) {
              eval('(function(){ (function(){'+$this.action+'; }).apply($this); $this.trap(); console.log(ev); }).apply($this);');
            }
          });
        }

        if(this.keys && this.action){
          Mousetrap.unbind(this.keys);
          Mousetrap.bind(this.keys, function(ev){
            // TODO: implement for real
            if(!$this.paused && !xtag.tags['x-trap'].paused) {
              eval('(function(){ (function(){'+$this.action+'; }).apply($this); $this.trap(); console.log(ev); }).apply($this);');
            }
          });
        }

        this.update();
      }
    },

    /**
     * methods: events
     * @type {Object}
     */
    methods: {

      /**
       * insert
       * @type {boolean}
       */
      insert: function(){
        xtag.fireEvent(this, 'xtrap-added');
      },

      /**
       * update
       * @type {boolean}
       */
      update: function(){
        xtag.fireEvent(this, 'xtrap-updated');
      },

      /**
       * remove
       * @type {boolean}
       */
      remove: function(){
        xtag.fireEvent(document, 'xtrap-removed');
      },

      /**
       * trap
       * @type {boolean}
       */
      trap: function(){
        xtag.fireEvent(this, 'xtrap-trapped');
      },

      /**
       * isPaused
       * @type {boolean}
       */
      isPaused: function(){
        return this.paused;
      },

      /**
       * pause
       * @type {undefined}
       */
      pause: function(){
        this.paused = true;
        xtag.fireEvent(this, 'xtrap-paused');
      },

      /**
       * unpause
       * @type {undefined}
       */
      unpause: function(){
        this.paused = false;
        xtag.fireEvent(this, 'xtrap-unpaused');
      }
    }
  });
})();
