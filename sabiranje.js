function sabiranje() {
    var a = document.getElementById("sabirak1").value;
    var b = document.getElementById("sabirak2").value;
    var c= +a + parseInt(b); //number(n)
    document.getElementById("zbir").value = c;
  }

   // Dugme sa IDom "dugme"
   var dugme = document.getElementById("dugme");
   // Funkcija koja se izvršava klikom na dugme
   dugme.addEventListener( "click", function( ev ) {
       alert( "Well hello there" );
   }, false);	
   var nesto = function( ev ) { alert( "Zdravo"+ev ); }
   nesto();