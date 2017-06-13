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
var canvas = undefined;
$(document).ready(function () {
    canvas = $('canvas');
    for(i = 1; i<35;i++) {
        drawImage(i);
    }
    canvas.drawLayers();
    canvas.getLayer(0).visible=true;
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
        $('#login').text(username);
        $('canvas').drawText({
            fillStyle: '#c33',
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: 18,
            text: "Sugar: " + loggedInUser.cookies.sugar + "\nChocolate: " + loggedInUser.cookies.chocolate + "\nLemon: " + loggedInUser.cookies.lemon,
            x: 50, y: 50,
            letterSpacing: 0.02
        });
    });
    function drawImage(src) {
        canvas.drawImage({
            source: 'img/cookies/'+src+'.png',
            name: "Cookie"+src,
            visible: false,
            x: 150, y: 150,
            fromCenter: false,
            shadowColor: '#222',
            shadowBlur: 3,
            layer: true,
            width: 300,
            height: 300,
            click: function (layer) {
                console.log("click");
                layer.visible = false;
                switch (src) {
                    case 7:
                        loggedInUser.cookies.chocolate++;
                        break;
                    case 11:
                        loggedInUser.cookies.lemon++;
                        break;
                    case 34:
                        loggedInUser.cookies.sugar++;
                        break;
                }
                if(canvas.getLayer("Cookie" + (src+1)) != undefined) {
                    canvas.getLayer("Cookie" + (src + 1)).visible = true;
                }else{
                    Cookies.set("'"+loggedInUser.username+"'", loggedInUser);
                    canvas.getLayer("Cookie1").visible = true;
                }
                $('canvas').drawText({
                    fillStyle: '#c33',
                    fontFamily: 'Ubuntu, sans-serif',
                    fontSize: 18,
                    text: "Sugar: " + loggedInUser.cookies.sugar + "\nChocolate: " + loggedInUser.cookies.chocolate + "\nLemon: " + loggedInUser.cookies.lemon,
                    x: 50, y: 50,
                    letterSpacing: 0.02
                });
            }
        });
    }
});