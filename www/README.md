# Welcome to Onsen UI 2!

This template is using Onsen UI, a HTML5 framework that is focusing on the speed and ease of use.
For details, please check out [Onsen UI Website](http://onsenui.io) and [the documents](http://onsenui.io/v2/).

"<a href='http://maps.google.com/maps?q=35.689634,139.692101' rel='nofollow'>ローソン</a>"




  		iFrameResize({
				log                     : true,                  // Enable console logging
				enablePublicMethods     : true,                  // Enable methods within iframe hosted page
				resizedCallback         : function(messageData){ // Callback fn when resize is received
					$('p#callback').html(
						'<b>Frame ID:</b> '    + messageData.iframe.id +
						' <b>Height:</b> '     + messageData.height +
						' <b>Width:</b> '      + messageData.width + 
						' <b>Event type:</b> ' + messageData.type
					);
				},
				messageCallback         : function(messageData){ // Callback fn when message is received
					$('p#callback').html(
						'<b>Frame ID:</b> '    + messageData.iframe.id +
						' <b>Message:</b> '    + messageData.message
					);
					alert(messageData.message);
				},
				closedCallback         : function(id){ // Callback fn when iFrame is closed
					$('p#callback').html(
						'<b>IFrame (</b>'    + id +
						'<b>) removed from page.</b>'
					);
				}
			});
