jQuery(function($){

	//region Init Footer Form submit
	$('.pi-contact-form').submit(function(){
		$(".pi-contact-form .pi-btn").prop('disabled', true);
		var $form = $(this),
			$error = $form.find('.pi-error-container'),
			action  = $form.attr('action');


		$error.slideUp(750, function() {
			$error.hide();
			var $name = $form.find('.form-control-name'),
				$email = $form.find('.form-control-email'),
				$company = $form.find('.form-control-company-name'),
				$phone = $form.find('.form-control-phone'),
				$comments = $form.find('.form-control-comments'),
				$recaptcha = $form.find('#g-recaptcha-response'),
				$csrf_token = $(".pi-contact-form input[name='csrfmiddlewaretoken']").val();

			/*	recaptcha server side validation
			 var $post_data = {
			 "secret": "6LfzIR8TAAAAAOSDgsKkgnGN1Fb9Gy8sHx-XgwUQ",
			 "response": $recaptcha.val(),
			 }
			 $.ajax({
			 url: 'https://www.google.com/recaptcha/api/siteverify',
			 dataType: 'json',
			 type: 'post',
			 contentType: 'application/json',
			 data: $post_data,
			 processData: false,
			 success: function (data) {
			 if(data['success']==True)
			 {
			 $(".modal-body").html('<p> Google verification passed</p>');
			 $("#webpyd").modal('show');
			 grecaptcha.reset();
			 }
			 else{
			 $(".modal-body").html('<p> Google verification failed</p>');
			 $("#webpyd").modal('show');
			 grecaptcha.reset();
			 }


			 },
			 error: function (jqXhr, textStatus, errorThrown) {
			 $(".modal-body").html('<p> Google verification failed in error</p>');
			 $("#webpyd").modal('show');
			 grecaptcha.reset();
			 }
			 });
			 */
			$name = $name.val().trim();
			$company = $company.val().trim();
			$comments = $comments.val().trim();
			$email = $email.val().trim();
			$phone = $phone.val().trim();
			if (!$recaptcha.val() || !$email || !$name || $name.length<5 || !$comments || $comments.length<20)  {
				$(".modal-title").html('<p style="color:darkorange;">Oops! seems that you left something blank</p>');
				var $error_html = "<p>Please rectify one or more error(s) below<ul>";
				if(!$name || $name.length<5){ $error_html = $error_html + "<li>Fill in your Name (at least 5 characters)</li>"}
				if(!$email){ $error_html = $error_html + "<li>Fill in your valid E-mail</li>"}
				if(!$comments || $comments.length<20){ $error_html = $error_html + "<li>Tell us how can we help you? (at least 20 characters)</li>"}
				if(!$recaptcha.val()){ $error_html = $error_html + "<li>Prove that you are a Human. Click \"I\'m not a robot\" Box</li>"}
				$error_html = $error_html + "</ul></p>";

				$(".modal-body").html($error_html);
				$("#webpyd").modal('show');
			}
			else
			{
				$.ajax({
					url: 'http://127.0.0.1:8000/contact',
					dataType: 'json',
					type: 'post',
					contentType: 'application/json',
					data: JSON.stringify({
						"name": $name,
						"email": $email,
						"company": $company,
						"phone": $phone,
						"message": $comments,
						//"csrfmiddlewaretoken": $csrf_token,
						"captcha": $recaptcha.val()
					}),
					processData: false,
					success: function (data) {
						$(".modal-title").html('<p style="color:darkgreen;">Aiy! We got your mail</p>');
						$(".modal-body").html('<p>Hello '+ data['email']+', Thanks for reaching us. We will get back to you shortly. Have a nice day!</p>');
						$("#webpyd").modal('show');
					},
					error: function () {
						$(".modal-title").html('<p style="color:orangered;">Oops! Something is broken</p>');
						$(".modal-body").html('<p>Server Busy. Please try again.</p>');
						$("#webpyd").modal('show');
					}
				});
				$form.find('.form-control-name').val('');
				$form.find('.form-control-email').val('');
				$form.find('.form-control-company-name').val('');
				$form.find('.form-control-phone').val('');
				$form.find('.form-control-comments').val('');
				grecaptcha.reset();
			}
		});
		$(".pi-contact-form .pi-btn").prop('disabled', false);
	});

		return false;

});
	//endregion

