var url = "https://cs571.org/api/f23/hw2/students";
const BADGER_ID = CS571.getBadgerId();
const num_results = document.getElementById("num-results");
var my_data = "";
let new_data = null;
document.getElementById("students").className = "row";

fetch(url, {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
	.then((response) => response.json())
	.then((data) => {
		num_results.innerHTML = data.length;
		my_data = data
		new_data = my_data
		document.getElementById("students").innerHTML = buildStudentsHtml(data);
	})
	.catch((error) => console.log(error));

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	//var className = "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
	let html = `<div class = "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<strong>${stud.major}</strong>`;
	var fromWisco = stud.fromWisconsin ? "is from Wisconsin": "is not from Wisconsin";
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and ${fromWisco}</p>`
	html += `<p>They have ${stud.interests.length} interests including...</p>`
	html += "<ul>"
	stud.interests.forEach(interest => { 
		html += `<li>${interest}</li>`
	});
	html += "</ul>"
	html += `</div>`
	return html;
}

function handleSearch(e) {
	e.preventDefault();
	const name = document.getElementById("search-name").value.trim();
	const major = document.getElementById("search-major").value.trim();
	const interest = document.getElementById("search-interest").value.trim();
	// TODO
	function compName(stud){
		if (name === ""){
			return true;
		}
		return (stud.name.first + " " + stud.name.last).toLowerCase().includes(name.toLowerCase());
	}
	function compMajor(stud){
		if (major === ""){
			return true;
		}
		return (stud.major.toLowerCase().includes(major.toLowerCase()));
	}
	function compInterest(stud){
		if (interest === ""){
			return true;
		}
		return stud.interests.some((i) => (i.toLowerCase().includes(interest.toLowerCase())));
	}
	fetch(url, {
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			num_results.innerHTML = data.length;
			// filter data by name, major, interest
			my_data = data
				.filter(compName)
				.filter(compMajor)
				.filter(compInterest);
			document.getElementById("students").innerHTML = buildStudentsHtml(my_data);
			num_results.innerHTML = my_data.length;
			// class = "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"

		})
		.catch((error) => console.log(error));

	//console.log(name);
	// if (name){
	// For Step 5, implement the rest of this function!
}

document.getElementById("search-btn").addEventListener("click", handleSearch);
