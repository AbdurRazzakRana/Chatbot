/**
 * Created by aravind on 4/28/17.
 */
$(function () {

    $('form').on('submit', function (e) {
        var query = $("#message").val();
        showUserText();
        e.preventDefault();

        var uri = "https://api.dialogflow.com/v1/query?v=20150910&lang=en&query=";
        uri+=query;
        uri+="&sessionId=123456789&timezone=Asis/Almaty";
        $.ajax({
            type: 'get',
            url: uri,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer 06739e5ce32444e4a8f636fed317eb2b');
            },
            
            dataType: 'JSON',
            //data: { userID : userID }
            data: {submit:true, message:query},
            success: function (response) {
                //console.log(response["result"]["resolvedQuery"]);
                var obj = response["result"]["fulfillment"]["speech"];

                var answerdiv = jQuery('<div/>', {
                    html: obj.linkify()+'&nbsp;',
                    'class': "rounded-div-bot",
                    tabindex:1
                });
                $("#chat-text").append(answerdiv);
                $(answerdiv).focus();
 
                $("#message").focus();
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(msg);
            }
        });

    });

});

function showUserText(){
    var div = jQuery('<div/>', {
        text: $("#message").val(),
        'class': "rounded-div",
        tabindex:1
    });
    $("#chat-text" ).append(div);
    $("#message").val('');
}

if(!String.linkify) {
    String.prototype.linkify = function() {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

        return this
            .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
            .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}