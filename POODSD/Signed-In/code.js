const urlBase = 'http://reachout-hub.com/LAMPAPI';
const extension = 'php';
const loginForm = document.querySelector('loginForm');
const loginButton = document.getElementById("loginBtn")
let userId = 0;
let firstName = "";
let lastName = "";
const ids = [];

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
	else{
		document.getElementById('heading').innerHTML="<h2 id = 'heading'>"+firstName+" "+lastName+"'s Contact List</h2>";
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
	
	formattedNumber = newNumber.replace('-',""); 
	newNumber= formatedNumber.split(" ").join("");
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
function updateContact(id){

	const name = document.getElementById("nameFirst" + id).value;
    const last = document.getElementById("nameLast" + id).value;
    const email = document.getElementById("emailaddress" + id).value;
    const phone = document.getElementById("phonenumber" + id).value;
    const ID = ids[id];

	document.getElementById("FirstName" + id).innerHTML = name;//.value;
    document.getElementById("LastName" + id).innerHTML = last;//.value;
    document.getElementById("EmailAddress" + id).innerHTML = email;//.value;
    document.getElementById("PhoneNumber" + id).innerHTML = phone;//.value;

	let tmp = {
		"ID": ID,
		"firstName": name,
		"lastName": last,
		"phone": phone,
		"email": email
	  };
	let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Contact has been updated");
				
				document.getElementById("editButton"+id).style.display = "inline-block";
        		document.getElementById("saveEditButton"+id).style.display = "none";

                //location.reload();
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }

}
function editContact(id){
    document.getElementById("editButton"+id).style.display = "none";
    document.getElementById("saveEditButton"+id).style.display = "inline-block";
    let firstName = document.getElementById("FirstName" + id);
    let lastName = document.getElementById("LastName" + id);
    let email = document.getElementById("EmailAddress" + id);
    let phone = document.getElementById("PhoneNumber" + id);

    let name_data = firstName.innerText;
    let namel_data = lastName.innerText;
    let email_data = email.innerText;
    let phone_data = phone.innerText;

    firstName.innerHTML = "<input class = 'input-box' type='text' id='nameFirst" + id + "' value='" + name_data + "'>";
    lastName.innerHTML = "<input class = 'input-box' type='text' id='nameLast" + id + "' value='" + namel_data + "'>";
    email.innerHTML = "<input class = 'input-box' type='text' id='emailaddress" + id + "' value='" + email_data + "'>";
    phone.innerHTML = "<input class = 'input-box' type='text' id='phonenumber" + id + "' value='" + phone_data + "'>";

};

function searchContact()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let colorList = "";

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
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += `<div>
											<p>Name: ${contact.FirstName} ${contact.LastName}</p>
											<p>Phone: ${contact.Phone}</p>
											<p>Email: ${contact.Email}</p>
                    					</div>`;
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
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
   					const pNumber = jsonObject.results[i].Phone;
    				const email = jsonObject.results[i].Email;
					//const newImage= document.createElement('img');
					//newImage.classList.add('contact-Image');
					//newImage.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXY0YXhrODg5d2xjdjhpdTNvNzVkem0wYTB6b2VlYmRzZTF0N3c4cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5FVtsLf6g9QOqIakxw/giphy.gif';
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
			
			
					fNameSpan.innerHTML = "<span  class='label'> First Name: </span> <p id = 'FirstName"+i+"'>" + fName+"</p>";
					lNameSpan.innerHTML = "<span  class='label'> Last Name: </span> <p id = 'LastName"+i+"'>" + lName+"</p>";
					pNumberSpan.innerHTML = "<span class='label'> Phone Number: </span> <p id = 'PhoneNumber"+i+"'>" + pNumber+"</p>";
					emailSpan.innerHTML = "<span  class='label'> Email: </span> <p id = 'EmailAddress"+i+"'>" + email+"</p>";
					
					const editButton = document.createElement('button');
        			editButton.className = 'edit_button';
        			const deleteButton = document.createElement('button');
        			deleteButton.className = 'delete_button';
					const saveEditButton = document.createElement('button');
        			saveEditButton.className = 'save_edit_button';

					editButton.innerHTML = "<i id = 'editButton"+i+"' class='fa fa-edit' onclick ='editContact(" + i + ")' style= 'font-size:20px'; color:'blue'></i>";
					deleteButton.innerHTML = "<i id = 'deleteButton"+i+"' class='fa fa-trash-o' style= 'font-size:20px'; color:'red'></i>";
					saveEditButton.innerHTML ="<i id= 'saveEditButton" + i + "'class='fa fa-check' onclick='updateContact(" + i + ")' style='display: none' color:'green'>";
					deleteButton.addEventListener('click', function() {
					const confirmed = window.confirm("Are you sure you want to delete this contact? ");
						if (confirmed) {
							let firstName = fNameSpan.textContent;
							firstName=firstName.replace(" First Name: ","");
							let lastName = lNameSpan.textContent;
							lastName=lastName.replace(" Last Name: ","");
							deleteContact(firstName, lastName, userId);
							newEntry.remove();
						}
					});

					//newEntry.appendChild(newImage);
					newEntry.appendChild(fNameSpan);
					//newEntry.appendChild(document.createTextNode(" "));
					newEntry.appendChild(lNameSpan);
					//newEntry.appendChild(document.createTextNode(" "));
					newEntry.appendChild(pNumberSpan);
					//newEntry.appendChild(document.createTextNode(" "));
					newEntry.appendChild(emailSpan);
					newEntry.appendChild(editButton);
					newEntry.appendChild(deleteButton);
					newEntry.appendChild(saveEditButton);
					
					
					listDisplay.appendChild(newEntry);
                }
					
                //document.getElementById("contactList").innerHTML = text;
				
				//document.getElementsByTagName("p")[0].innerHTML = colorList;
				//alert(jsonObject.results[i].FirstName);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert("cant load contacts");
	}
	
}

function deleteContact(firstName, lastName, userID) {
    let contactInfo = { firstName: firstName, lastName: lastName, UserID: userID };
    let jsonPayload = JSON.stringify(contactInfo);

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
				// debuging ...
                console.log(console.log(xhr.response));
                alert("Contact deleted successfully!");
            } else if (this.status == 500) {
                // Server Error
                alert("Server Error");
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        alert(err.message);
    }
}