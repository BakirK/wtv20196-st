src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"

function openList1() {
  let li = document.getElementsByClassName('prikazPrva');
  if (li[0].style.display == "none"){
    li[0].style.display = "block";
  }else{
    li[0].style.display = "none";
  }
}

function openList2() {
  let li = document.getElementsByClassName('prikazDruga');
  if (li[0].style.display == "none"){
    li[0].style.display = "block";
  }else{
    li[0].style.display = "none";
  }
}
