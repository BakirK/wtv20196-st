var x = 5;
var dugme = document.getElementById("dugme");
dugme.addEventListener( "click", function( ev ) {
    var c = document.getElementById("slika");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height); // clear radi
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(funkcija.value, funkcija.value);
    ctx.stroke();
}, false);


