class Heroico
	constructor: ->
		@create_wrapper_div()
		@add_chat_frame()
	
	create_wrapper_div: ->
		@wrapper_div = $('<div></div>').attr("id", "hr_wrapper").appendTo("body")
	
	add_chat_frame: ->


window.jQuery || document.write('<script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js">\x3C/script>')
hr = new Heroico()