function replace() {
    var el = document.getElementById("area");
    var re = /<[^>]*>/g;
    var text = el.value;
    text = text.replace(re, "");
    text = text.replace("&quot;", '"');
    text = text.replace("&amp;", '&');
    text = text.replace("&lt;", '<');
    text = text.replace("&gt;", '>');
    text = text.replace("&nbsp;", '');
    el.value = text;
  }