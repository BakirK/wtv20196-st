/*var jedinice = ["jedan", "dva", "tri", "cetiri", "pet", "sest", "sedam", "osam", "devet", "deset"]
var desetice = ["deset", "dvadeset", "trideset", "cetrdeset", "pedeset", "sezdeset", "sedamdeset", "osamdeset", "devetdeset"];
var stotine = ["stotinu", "dvijestotine", "tristotine", "cetiristotine", "petstotina", "seststotina", "sedamstotina", "osamstotina", "devetstotina"];*/



var names = [["jedan", "dva", "tri", "cetiri", "pet", "sest", "sedam", "osam", "devet"],
[ "deset", "dvadeset", "trideset", "cetrdeset", "pedeset", "sezdeset", "sedamdeset", "osamdeset", "devetdeset"],
["stotinu", "dvijestotine", "tristotine", "cetiristotine", "petstotina", "seststotina", "sedamstotina", "osamstotina", "devetstotina"]];
var specific = ["jedanaest", "dvanaest", "trienaest", "cetrnaest","petnaest", "sesnaest", "sedamnaest", "osamnaest", "devetnaest"];
var dugme = document.getElementById("dugme");
// Funkcija koja se izvršava klikom na dugme
dugme.addEventListener( "click", function( ev ) {
   var text = document.getElementById("tekst").value;
   var matches = text.match(/\d+/g);
             
    if (matches) { 
       	for (var i = matches.length - 1; i >= 0; i--) {
	    	document.getElementById('tekst').value = document.getElementById('tekst').value.replace(matches[i], dajNaziv(matches[i]));
	    } 
    } 
}, false);

function dajNaziv(broj) {
	if (parseInt(broj)==0) {return "nula";}
	var naziv = "";
	var i = 0;
	var first = true;
	while(parseInt(broj) > +0 && i < 3) {
		while((parseInt(broj)%10) == 0) {
			i++;
			broj /= 10;
			first = false;
		} 
		var temp2 = parseInt(broj)%10;
		var temp = parseInt(broj)/10;
		if(parseInt(temp)%10 == 1 && first) {
			first = false;
			naziv = specific[temp2-1] + naziv;	
			i++;
			broj /= 10;
		} else {
			naziv = names[i][(parseInt(broj)%10) - 1] + naziv;		
		}
		i++;
		broj /= 10;
	}
	return naziv;
}

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function toWords(s) {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += tn[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    return str.replace(/\s+/g, ' ');
}