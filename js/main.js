/**
 * Created by nick on 6/13/17.
 */
var user = function(u, p) {
    this.username = u;
    this.password = p;
    this.cookies = {
        sugar: 0,
        chocolate: 0,
        lemon: 0
    };
};
var loggedInUser = undefined;
$(document).ready(function () {
    let $canvas = $('canvas');
    for(i = 1; i<8;i++) {
        drawImage('img/cookies/'+i+'.png');
    }
    $canvas.drawLayers();
    $canvas.getLayer('img/cookies/1.png').visible = true;
    $('#login').click(function() {
        $('#openModal').toggleClass("modalDialog-show");
    });
    $('#close').click(function () {
       $('#openModal').toggleClass("modalDialog-show");
    });
    $('#login-button').click(function() {
        event.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        console.log("'"+username+"'");
        if (Cookies.get("'"+username+"'") == undefined) {
            loggedInUser = new user(username, password);
            Cookies.set("'"+username+"'", loggedInUser);
            window.location.href = "#close";
        } else {
            loggedInUser = Cookies.getJSON("'"+username+"'");
            window.location.href = "#close";
        }
    });
    function drawImage(src) {
        $canvas.drawImage({
            source: src,
            name: src,
            visible: false,
            x: 250, y: 100,
            fromCenter: false,
            shadowColor: '#222',
            shadowBlur: 3,
            rotate: 40,
            layer: true,
            click: function (layer) {
                console.log("click");
            }
        });
    }
});