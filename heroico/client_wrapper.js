(function() {
  var Heroico, load_requirements;

  Heroico = (function() {

    function Heroico() {
      this.create_tags();
      this.load_events();
      this.set_window_position();
    }

    Heroico.prototype.set_window_position = function() {
      if (amplify.store('heroico.chat_window_open') && amplify.store('heroico.chat_window_open') === true) {
        return this.wrapper_div.addClass("open");
      }
    };

    Heroico.prototype.load_events = function() {
      var parent;
      parent = this.wrapper_div;
      return this.toggle_handle.click(function() {
        if (parent.hasClass("open")) {
          window.amplify.store('heroico.chat_window_open', false);
        } else {
          window.amplify.store('heroico.chat_window_open', true);
        }
        return parent.toggleClass("open");
      });
    };

    Heroico.prototype.create_tags = function() {
      var self;
      self = this;
      this.wrapper_div = $('<div></div>').attr({
        id: "hr_client_wrapper"
      }).appendTo("body");
      this.wrapper_inner_div = $('<div></div>').attr({
        id: "hr_inner"
      }).appendTo(this.wrapper_div);
      this.toggle_handle = $('<div></div>').attr({
        id: "hr_toggle_handle"
      }).prependTo(this.wrapper_inner_div);
      this.popup_anchor = $("<a></a>").attr({
        id: "hr_popup",
        href: "javascript:void(0)"
      }).appendTo(this.wrapper_inner_div).html("Pop-out").click(function() {
        var height, left, newwindow, top, width;
        self.wrapper_div.removeClass("open");
        window.amplify.store('heroico.chat_window_open', false);
        height = 450;
        width = 400;
        left = (screen.width / 2) - (width / 2);
        top = (screen.height / 2) - (height / 2);
        newwindow = window.open("http://192.168.1.5:4000/" + user_id, 'Heroico Popup Window', 'screenY=' + top + ',screenX=' + left + ',height=' + height + ',width=' + width);
        return newwindow.focus();
      });
      return this.chat_frame = $('<iframe></iframe>').attr({
        src: "http://192.168.1.5:4000/" + user_id
      }).appendTo(this.wrapper_inner_div);
    };

    return Heroico;

  })();

  load_requirements = function(cb) {
    var checkReady, jquery, styles;
    styles = document.createElement("link");
    styles.setAttribute("rel", "stylesheet");
    styles.setAttribute("type", "text/css");
    styles.setAttribute("href", "client_wrapper.css");
    document.getElementsByTagName("head")[0].appendChild(styles);
    jquery = document.createElement("SCRIPT");
    jquery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
    jquery.type = "text/javascript";
    document.getElementsByTagName("head")[0].insertBefore(jquery, document.getElementsByTagName("head")[0].firstChild);
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
      return $.getScript("//cdnjs.cloudflare.com/ajax/libs/amplifyjs/1.1.0/amplify.min.js", function(data, textStatus, jqxhr) {
        return cb();
      });
    });
  };

  window.jQuery || load_requirements(function() {
    var hr;
    return hr = new Heroico();
  });

}).call(this);
