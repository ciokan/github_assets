class Heroico

	account_meta = null

	constructor: ->
		@_set_metadata()
		@create_tags()
		@load_events()
		@set_window_position()


	_set_metadata: ->
		#	Runs a ping every x seconds to gather various info such as
		#	operators online and other things
		hr = @
		setInterval ->
			$.getJSON "http://meta.heroico.com/accounts/"+user_id+"/?callback=?", (data) ->
				if data.data
					account_meta = data

			hr.show_status_widgets()
		, 3000


	set_window_position: ->
		if amplify.store('heroico.chat_window_open') and amplify.store('heroico.chat_window_open') == true
			@wrapper_div.addClass "open"


	show_status_widgets: ->
		#	This is useful for images or content that you can place inside your page
		#	Our javascript here will add a class to all elements matching class:
		#	hr_status_widget stating if we have operators online or not: .hr_online/.hr_offline
		$(".hr_status_widget").each ->
			if account_meta?.data?.has_operators_online
				$(this).addClass "hr_online"
			else
				$(this).addClass "hr_offline"


	hide_widget: ->
		@wrapper_div.hide()


	show_widget: ->
		@wrapper_div.show()


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
		
		chat_url = if is_localhost() then "http://localhost:4000/"+user_id else "http://client.heroico.com/"+user_id

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

			newwindow = window.open chat_url,'Heroico Popup Window','screenY='+top+',screenX='+left+',height='+height+',width='+width
			newwindow.focus()

		@chat_frame = $('<iframe></iframe>').attr({
			src: chat_url
		}).appendTo(@wrapper_inner_div)

is_localhost = ->
	window.location.href.indexOf("localhost") != -1

load_requirements = (cb)->
	styles = document.createElement("link")
	styles.setAttribute("rel", "stylesheet")
	styles.setAttribute("type", "text/css")
	styles.setAttribute("href", if is_localhost() then "http://localhost/github_assets/heroico/client_wrapper.css" else "http://ciokan.github.io/github_assets/heroico/client_wrapper.css")

	document.getElementsByTagName("head")[0].appendChild styles

	if not window.jQuery
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


load_requirements(->
	window.heroico = new Heroico()
)