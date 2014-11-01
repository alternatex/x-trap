(function(){

  var timeouts = {};

  function _remove(element) {
    element.className = '';
  }

  window.highlight = function(element) {
    var identifier = element.getAttribute('id');
    if(typeof(identifier)=='undefined' || identifier==null){
    identifier = 'x-trap_'+id();
    element.setAttribute('id', identifier);
    }
    element.className = 'highlight';
    if (timeouts[identifier]) {
    clearTimeout(timeouts[identifier]);
    delete timeouts[identifier];
    }

    timeouts[identifier] = setTimeout(function() {
    _remove(element);
    }, 1500);
  }

  function id(){ return Math.round(new Date().getTime() + Math.random(0, 10)); }


  (function(){

    var btnRecord, btnPause, btnUnpause;

    function enable(element){
    element.removeAttribute('disabled');
    }

    function disable(element){
    element.setAttribute('disabled', 'disabled');
    }

    // TODO: at fire event distinguish between local or global instruction

    document.addEventListener('xtrap-paused', function(){
    console.log('<span class="btn">Paused</span>');
    disable(btnRecord);
    disable(btnPause);
    enable(btnUnpause);
    });

    // TODO: at fire event distinguish between local or global instruction

    document.addEventListener('xtrap-unpaused', function(){
    console.info('Unpaused');
    enable(btnRecord);
    enable(btnPause);
    disable(btnUnpause);
    });

    // TODO: at fire event distinguish between local or global instruction

    document.addEventListener('xtrap-added', function(){
    console.info('Added');
    });

    document.addEventListener('xtrap-updated', function(){
    console.info('Updated');
    });

    document.addEventListener('xtrap-trapped', function(e){
    console.info('Trapped');
    });

    document.addEventListener('xtrap-removed', function(){
    console.info('Removed');
    });

    setTimeout(function(){

    document.getElementById('record').onclick=function(){
      this.setAttribute('disabled', 'disabled'); xtag.tags['x-trap'].record(function(sequence) { document.getElementById('record').removeAttribute('disabled'); alert('You pressed: ' + sequence.join(' ')); }); return false;
    };

    document.getElementById('pause').onclick=function(){
      xtag.tags['x-trap'].pause(); return false;
    };

    document.getElementById('unpause').onclick=function(){
      xtag.tags['x-trap'].unpause();
    };

    xtag.addEvent(document.body, 'keydown:keypass(85)', function(e){
      if(!e.srcElement.isContentEditable && ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(e.srcElement.nodeName)===-1){
      xtag.tags['x-trap'].unpause();
      }
    });

    btnRecord = document.getElementById('record');
    btnPause = document.getElementById('pause');
    btnUnpause = document.getElementById('unpause');

    }, 800);

  })();
})();
