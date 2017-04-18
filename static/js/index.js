var banner = $("#dynamic-banner");
var messages = ['Have a good time, you deserve it.', ''];
var images = ['1.gif', '2.gif', '3.gif', '4.gif', '5.gif'];

var i = 0;

var iid = setInterval(function() {
    var messageToDisplay = messages[i];
    $("#dynamic-banner").html(messageToDisplay);
    i++;

    if(i == (messages.length)) {
        clearInterval(iid);
        var min = 1;
        var max = 10;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;

        $('.background-image').css("background-image", "url(static/img/" + random + ".gif)")
        $(document).ready(function() {
            $('.background-image').on('webkitAnimationEnd', function(e) {
                $(this).addClass('visible');
            });
        });
        $(document).ready(function() {
            $('.logo').on('webkitAnimationEnd', function(e) {
                $(this).addClass('visible');
            });
        });
        $(document).ready(function() {
            $('.right_contentlist').on('webkitAnimationEnd', function(e) {
                $(this).addClass('visible');
            });
        });
        $(document).ready(function() {
            $('.itemconfiguration').on('webkitAnimationEnd', function(e) {
                $(this).addClass('visible');
            });
        });
    }

}, 2000);