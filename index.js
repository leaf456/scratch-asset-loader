var projectid = "704708801"
var apiurl = "https://projects.scratch.mit.edu/" + projectid
var rawdata = null
var parseddata = null
var assetids = []
var sprites = []
function start() {
	//setInterval(function(){}, 20);
	if (document.getElementById("projectid").value != "") {
		projectid = document.getElementById("projectid").value
		apiurl = "https://projects.scratch.mit.edu/" + projectid
	} else {
		projectid = "704708801"
		apiurl = "https://projects.scratch.mit.edu/" + projectid
	}
	rawdata = null
	parseddata = null
	assetids = []
	sprites = []
	document.getElementById("output").innerHTML = ""
	
	//document.getElementById("gamestartbutton").style.display = "none";
	xmlrequest(apiurl, displayandparse)
}
function displayandparse(response) {
	rawdata = response
	document.getElementById("raw-output").value = rawdata
	parseddata = JSON.parse(rawdata)
	for (const [key, value] of Object.entries(parseddata["targets"])) {
		sprites.push(value)
	}
	for (const [key, value] of Object.entries(sprites)) {
		for (const [key, value2] of Object.entries(value["costumes"])) {
			assetids.push(["img", value2["md5ext"]])
		}
		for (const [key, value2] of Object.entries(value["sounds"])) {
			assetids.push(["sound", value2["md5ext"]])
		}
	}
	for (let i in assetids) {
		if (assetids[i][0] == "img") {
			let img = document.createElement("img")
			img.src = "https://assets.scratch.mit.edu/internalapi/asset/" + assetids[i][1] + "/get/"
			img.style.width = "auto"
			img.style.height = "auto"
			img.style.maxWidth = "200px"
			img.style.maxHeight = "150px"
			document.getElementById("output").appendChild(img)
		}
	}
	for (let i in assetids) {
		if (assetids[i][0] == "sound") {
			let sound = document.createElement("audio")
			sound.src = "https://assets.scratch.mit.edu/internalapi/asset/" + assetids[i][1] + "/get/"
			sound.setAttribute("controls", null);
			document.getElementById("output").appendChild(sound)
		}
	}
}
function xmlrequest(url, onfinish) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (onfinish != null) {
				onfinish(this.responseText)
			}
		}
	}
	request.onerror = function() {
		console.log("Error!")
	}
	request.open("GET", url, true);
	request.send();
}