function cute_over(id){
	var x = document.getElementById(id);
	if (x.className.indexOf("cute-show") == -1) {
       		x.className += " cute-show";
    	}

}

function cute_out(id) {
    var x = document.getElementById(id);
    x.className = x.className.replace(" cute-show", "");
}