class Heroico
	constructor: ->
		@create_wrapper_div()
		@add_chat_frame()
	
	create_wrapper_div: ->
		@wrapper_div = $('<div></div>').attr("id", "hr_wrapper").appendTo("body")
	
	add_chat_frame: ->
		@chat_frame = $('<iframe></iframe>').attr({
			src: "http://localhost:4000/"+user_id,
			style: "border: none; \
					background: transparent;\
					margin: 0; \
					padding: 0; \
					position: absolute; \
					bottom: 0; \
					right: 20px; \
					height: 450px; \
					width: 350px"
		}).appendTo(@wrapper_div)

load_jquery = (cb)->
	# Load the script
	script = document.createElement("SCRIPT")
	script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
	script.type = "text/javascript"
	document.getElementsByTagName("head")[0].appendChild script
  
	# Poll for jQuery to come into existance
	checkReady = (callback) ->
		if window.jQuery
			callback jQuery
		else
			window.setTimeout (->
				checkReady callback
			), 100

	checkReady ($) -> cb()

window.jQuery || load_jquery(->
	hr = new Heroico()
)