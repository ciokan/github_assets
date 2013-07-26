(function() {
  var Heroico, load_requirements;

  Heroico = (function() {
    var account_meta;

    account_meta = null;

    function Heroico() {
      this._set_metadata();
      this.create_tags();
      this.load_events();
      this.set_window_position();
    }

    Heroico.prototype._set_metadata = function() {
      var hr;
      hr = this;
      return setInterval(function() {
        $.getJSON("http://meta.heroico.com/accounts/" + user_id + "/?callback=?", function(data) {
          if (data.data) return this.account_meta = data;
        });
        return hr.show_status_widgets();
      }, 3000);
    };

    Heroico.prototype.set_window_position = function() {
      if (amplify.store('heroico.chat_window_open') && amplify.store('heroico.chat_window_open') === true) {
        return this.wrapper_div.addClass("open");
      }
    };

    Heroico.prototype.show_status_widgets = function() {
      return $(".hr_status_widget").each(function() {
        var _ref, _ref2;
        if ((_ref = this.account_meta) != null ? (_ref2 = _ref.data) != null ? _ref2.has_operators_online : void 0 : void 0) {
          return $(this).addClass("hr_online");
        } else {
          return $(this).addClass("hr_offline");
        }
      });
    };

    Heroico.prototype.hide_widget = function() {
      return this.wrapper_div.hide();
    };

    Heroico.prototype.show_widget = function() {
      return this.wrapper_div.show();
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
      var chat_url, self;
      self = this;
      chat_url = window.location.href.indexOf("localhost") !== -1 ? "http://localhost:4000/" + user_id : "http://client.heroico.com/" + user_id;
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
        newwindow = window.open(chat_url, 'Heroico Popup Window', 'screenY=' + top + ',screenX=' + left + ',height=' + height + ',width=' + width);
        return newwindow.focus();
      });
      return this.chat_frame = $('<iframe></iframe>').attr({
        src: chat_url
      }).appendTo(this.wrapper_inner_div);
    };

    return Heroico;

  })();

  load_requirements = function(cb) {
    var checkReady, jquery, styles;
    styles = document.createElement("link");
    styles.setAttribute("rel", "stylesheet");
    styles.setAttribute("type", "text/css");
    styles.setAttribute("href", "http://ciokan.github.io/github_assets/heroico/client_wrapper.css");
    document.getElementsByTagName("head")[0].appendChild(styles);
    if (!window.jQuery) {
      jquery = document.createElement("SCRIPT");
      jquery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
      jquery.type = "text/javascript";
      document.getElementsByTagName("head")[0].insertBefore(jquery, document.getElementsByTagName("head")[0].firstChild);
    }
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

  load_requirements(function() {
    return window.heroico = new Heroico();
  });

}).call(this);
