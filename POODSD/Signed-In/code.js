const urlBase = 'http://reachout-hub.com/LAMPAPI';
const extension = 'php';
const loginForm = document.querySelector('loginForm');
const loginButton = document.getElementById("loginBtn")
let userId = 0;
let firstName = "";
let lastName = "";

function doLogin () {
	
	let login = document.getElementById("user").value;
	let password = document.getElementById("password").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					//document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					alert("User/Password combination incorrect")
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
				window.location.href = "contact.html";
				//alert(firstName+","+lastName+"UserId:"+userId);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doRegister () {
	
	let newuser = document.getElementById("newuser").value;
	let newpass = document.getElementById("newpass").value;
	let nameF = document.getElementById("nameF").value;
	let nameL = document.getElementById("nameL").value;
//	var hash = md5( password );
	
	//document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:newuser,password:newpass, firstName:nameF, lastName:nameL};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					//document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					alert("registration failed")
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
				
				window.location.href = "contact.html";
				alert(firstName+","+lastName+"UserId:"+userId);
				
			}

			if (this.readyState == 409) 
			{
				alert("There is an account with this information already");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}
function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	/*else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}*/
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	let newFirst = document.getElementById("newFirst").value;
	let newLast = document.getElementById("newLast").value;
	let newNumber = document.getElementById("newNumber").value;
	let newEmail = document.getElementById("newEmail").value;
	document.getElementById("addContactResult").innerHTML = "";
	
	let tmp = {firstName:newFirst,lastName:newLast,phone:newNumber,email:newEmail,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/CreateContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("addContactResult").innerHTML = "Color has been added";
				alert("New contact added!");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert(err.message);
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function loadContacts()
{
	let srch = "";
	//document.getElementById("colorSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srch,userId:userId};
	
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				const listDisplay = document.getElementById('contactList');
				//document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
                for (let i = 0; i < jsonObject.results.length; i++) {
					ids[i] = jsonObject.results[i].ID
					const fName = jsonObject.results[i].FirstName;
    				const lName = jsonObject.results[i].LastName;
   					const pNumber = jsonObject.results[i].PhoneNumber;
    				const email = jsonObject.results[i].EmailAddress;

					const newEntry = document.createElement('li');
					newEntry.classList.add('contact-entry');
			
					const fNameSpan = document.createElement('span');
					fNameSpan.textContent = fName.value;
					const lNameSpan = document.createElement('span');
					lNameSpan.textContent = lName.value;
					const pNumberSpan = document.createElement('span');
					pNumberSpan.textContent = pNumber.value;
					const emailSpan = document.createElement('span');
					emailSpan.textContent = email.value;
			
			
					fNameSpan.innerHTML = "<span class='label'> First Name: </span>" + fName.value;
					lNameSpan.innerHTML = "<span class='label'> Last Name: </span>" + lName.value;
					pNumberSpan.innerHTML = "<span class='label'> Phone Number: </span>" + pNumber.value;
					emailSpan.innerHTML = "<span class='label'> Email: </span>" + email.value;
			
					newEntry.appendChild(fNameSpan);
					newEntry.appendChild(document.createTextNode(" "));
					newEntry.appendChild(lNameSpan);
					newEntry.appendChild(document.createTextNode(" "));
					newEntry.appendChild(pNumberSpan);
					newEntry.appendChild(document.createTextNode(" "));
					newEntry.appendChild(emailSpan);
			
					listDisplay.appendChild(newEntry);
                }
					
                //document.getElementById("contactList").innerHTML = text;
				
				//document.getElementsByTagName("p")[0].innerHTML = colorList;
				alert(jsonObject.results[i].FirstName);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert("cant load contacts");
	}
	
}
