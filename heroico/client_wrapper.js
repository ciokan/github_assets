(function() {
  var Heroico, hr;

  Heroico = (function() {

    function Heroico() {
      this.create_wrapper_div();
      this.add_chat_frame();
    }

    Heroico.prototype.create_wrapper_div = function() {
      return this.wrapper_div = $('<div></div>').attr("id", "hr_wrapper").appendTo("body");
    };

    Heroico.prototype.add_chat_frame = function() {};

    return Heroico;

  })();

  window.jQuery || document.write('<script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js">\x3C/script>');

  hr = new Heroico();

}).call(this);
