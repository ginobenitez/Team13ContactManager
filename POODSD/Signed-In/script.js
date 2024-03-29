
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const fName = document.querySelector('input[type="text"]');
    const lName = document.querySelector('input[type="LastName"]');
    const pNumber = document.querySelector('input[type="PhoneNumber"]');
    const email = document.querySelector('input[type="email"]');
    const listDisplay = document.getElementById('contactList');

    const addCButton = document.querySelector('.addC');
    const cancelButton = document.querySelector('.cancelBtn')

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        addContact();

        /*const newEntry = document.createElement('li');
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

        const editButton = document.createElement('button');
        editButton.className = 'edit_button';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete_button';
        const saveEditButton = document.createElement('button');
        saveEditButton.className = 'save_edit_button';

        editButton.innerHTML = '<i class="fa fa-edit" style="font-size:20px; color:blue"></i>';
        deleteButton.innerHTML = '<i class="fa fa-trash-o" style="font-size:20px; color:red"></i>';
        saveEditButton.innerHTML ="<i id= 'saveEditButton'class='fa fa-check' onclick='updateContact(" + i + ")' style='display: none' color:'green'>";


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

        editButton.addEventListener('click', function(){
            contactForm.style.display='flex';
        })

        newEntry.appendChild(fNameSpan);
        newEntry.appendChild(document.createTextNode(" "));
        newEntry.appendChild(lNameSpan);
        newEntry.appendChild(document.createTextNode(" "));
        newEntry.appendChild(pNumberSpan);
        newEntry.appendChild(document.createTextNode(" "));
        newEntry.appendChild(emailSpan);
        newEntry.appendChild(document.createTextNode(" "));
        newEntry.appendChild(editButton);
        newEntry.appendChild(document.createTextNode(" "));
        newEntry.appendChild(deleteButton);
        newEntry.appendChild(document.createTextNode(" "));
        newEntry.appendChild(saveEditButton);

        listDisplay.appendChild(newEntry);
        */

        fName.value = '';
        lName.value = '';
        pNumber.value = '';
        email.value = '';
        contactForm.style.display = 'none';

       location.reload();
    });

    
    addCButton.addEventListener('click', function() {
        contactForm.style.display = 'flex';
    });

    cancelButton.addEventListener('click', function(e){
        e.preventDefault();
        contactForm.style.display = 'none';
        contactForm.reset();
    });

    
    document.getElementById('searchInput').addEventListener('keyup', function() {
        var searchQuery = this.value.toLowerCase();
        var contactListItems = document.getElementById('contactList').getElementsByTagName('li');

          Array.from(contactListItems).forEach(function(item) {
               var itemName = item.textContent || item.innerText;
               if (itemName.toLowerCase().indexOf(searchQuery) !== -1) {
                   item.style.display = ''; // Show matching item
                 } else {
                       item.style.display = 'none'; // Hide non-matching item
        }
    });
 });
});

