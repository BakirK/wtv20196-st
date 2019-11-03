document.write(" x&nbsp;");
function buff(val){
  var buff = '';
  var pad = 4 - val;
    while( pad-- > 0 )
            buff += ' &nbsp;';            
  return buff;
}

for (var i = 0; i < 11; i++) {

    for (var j = 0; j < 11; j++) {

        if(i == 0 && j > 0){
          document.write('[' + j + ']&nbsp;&nbsp;' + buff((j+'').length+2));
        } 
        else if(j == 0 && i>0){
          document.write('[' + i + ']');
        } 
        else if(i>0 && j>0){
        document.write(buff((i*j+'').length ) + i*j);
        }
    }
    document.write('<br />');
}


document.write("<table border='1px' width='100%'>");
for(var i = 0; i < 11; i++) {
	document.write("<tr>");
	for(var j = 0; j < 11; j++) {
		if(!i && !j) {
			document.write("<td class='siva'>" + 'X' + "</td>");
		}
		else if(i == 0 && j > 0){
			document.write("<td class='siva'>" + j + "</td>");
        } 
        else if(j == 0 && i>0){
          	document.write("<td class='siva'>" + i + "</td>");
        } 
        else if(i>0 && j>0 && (i%2 == 0)){
        	document.write("<td class='zuta'>" + i*j + "</td>");
        } else {
        	document.write("<td>" + i*j + "</td>");
        }
	}
	document.write("</tr>");
}
document.write("</table>");