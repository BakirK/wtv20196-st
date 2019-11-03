var odgovor = prompt("Kako se zoves?", "Imenom i prezimenom(default)");
if (odgovor!=null && odgovor!="")
{
     var r=confirm("Pritisnite OK da prikazete ime u alertboxu a Cancel za prikaz direktno na stranici");
     if (r==true){  // ili if(r)
     	var temp = "";
	    for (var i = odgovor.length - 1; i >= 0; i--) {
			     temp = temp + odgovor[i];
		  }
           alert(temp);
      }
     else{
       for (var i = odgovor.length - 1; i >= 0; i--) {
			   document.write(odgovor[i]);
      }
		}
}

