function saveAction(action) {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	   		// use the xmlhttp.responseText however you need.
		}
	}
	
	xmlhttp.open("POST", "_includes/pages/functions.php?action=" + action, true);
	xmlhttp.send();
}