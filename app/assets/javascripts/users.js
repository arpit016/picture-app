$(document).ready(function() {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    $('#form-submit-btn').click(function(event) {
        event.preventDefault();
        $('input[type=submit]').prop('disabled', true);
        var error = false;
        if (!error) {
            Stripe.card.createToken($('#new_user'), stripeResponseHandler);
        }
        return false;
    }); //form submission
    
    function stripeResponseHandler(status, response){
        if (status == 200){
            //Get a reference to the form
            var f = $('#new_user');
            
            //Get the token from the response
            var token = response.id;
            console.log("Token:" + token);
            
            //Add the token to the form
            f.append('<input type="hidden" id="token-value" name="user[stripe_card_token]" value="' + token + '" />');
            console.log("Hidden token value:" + $('#token-value').val());
            
            //Submit the form
            f.get(0).submit();
        }
        else {
            $('#stripe_error').text(response.error.message).show();
            $('input[type=submit]').attr('disabled', false)
        }
    }
});