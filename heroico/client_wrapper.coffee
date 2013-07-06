class Heroico
	constructor: ->
		@create_tags()
		@load_events()
		@set_window_position()

	set_window_position: ->
		if amplify.store('heroico.chat_window_open') and amplify.store('heroico.chat_window_open') == true
			@wrapper_div.addClass "open"

	load_events: ->
		parent = @wrapper_div
		@toggle_handle.click ->
			if parent.hasClass "open"
				window.amplify.store('heroico.chat_window_open', false)
			else
				window.amplify.store('heroico.chat_window_open', true)
			parent.toggleClass "open"

	create_tags: ->
		self = @
		@wrapper_div = $('<div></div>').attr({
			id: "hr_client_wrapper"
		}).appendTo("body")
		
		@wrapper_inner_div = $('<div></div>').attr({
			id: "hr_inner"
		}).appendTo(@wrapper_div)
		
		@toggle_handle = $('<div></div>').attr({
			id: "hr_toggle_handle"
		}).prependTo(@wrapper_inner_div)

		@popup_anchor = $("<a></a>").attr({
			id: "hr_popup",
			href: "javascript:void(0)"
		}).appendTo(@wrapper_inner_div).html("Pop-out").click ->
			self.wrapper_div.removeClass "open"
			window.amplify.store('heroico.chat_window_open', false)

			#	Popup
			height = 450
			width = 400
			left = (screen.width/2) - (width/2)
			top = (screen.height/2) - (height/2)
			newwindow = window.open "http://192.168.1.5:4000/"+user_id,'Heroico Popup Window','screenY='+top+',screenX='+left+',height='+height+',width='+width
			newwindow.focus()

		@chat_frame = $('<iframe></iframe>').attr({
			src: "http://192.168.1.5:4000/"+user_id
		}).appendTo(@wrapper_inner_div)

load_requirements = (cb)->
	styles = document.createElement("link")
	styles.setAttribute("rel", "stylesheet")
	styles.setAttribute("type", "text/css")
	styles.setAttribute("href", "client_wrapper.css")

	document.getElementsByTagName("head")[0].appendChild styles

	jquery = document.createElement("SCRIPT")
	jquery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
	jquery.type = "text/javascript"
	document.getElementsByTagName("head")[0].insertBefore(jquery, document.getElementsByTagName("head")[0].firstChild)

	# Poll for jQuery to come into existance
	checkReady = (callback) ->
		if window.jQuery
			callback jQuery
		else
			window.setTimeout (->
				checkReady callback
			), 100

	checkReady ($) ->
		$.getScript "//cdnjs.cloudflare.com/ajax/libs/amplifyjs/1.1.0/amplify.min.js", (data, textStatus, jqxhr) ->
			cb()

window.jQuery || load_requirements(->
	hr = new Heroico()
)