(function() {
  var Heroico, load_jquery;

  Heroico = (function() {

    function Heroico() {
      this.create_wrapper_div();
      this.add_chat_frame();
    }

    Heroico.prototype.create_wrapper_div = function() {
      return this.wrapper_div = $('<div></div>').attr("id", "hr_wrapper").appendTo("body");
    };

    Heroico.prototype.add_chat_frame = function() {
      return this.chat_frame = $('<iframe></iframe>').attr({
        src: "http://localhost:4000/" + user_id,
        style: "border: none; \					background: transparent;\					margin: 0; \					padding: 0; \					position: absolute; \					bottom: 0; \					right: 20px; \					height: 450px; \					width: 350px"
      }).appendTo(this.wrapper_div);
    };

    return Heroico;

  })();

  load_jquery = function(cb) {
    var checkReady, script;
    script = document.createElement("SCRIPT");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    checkReady = function(callback) {
      if (window.jQuery) {
        return callback(jQuery);
      } else {
        return window.setTimeout((function() {
          return checkReady(callback);
        }), 100);
      }
    };
    return checkReady(function($) {
      return cb();
    });
  };

  window.jQuery || load_jquery(function() {
    var hr;
    return hr = new Heroico();
  });

}).call(this);
