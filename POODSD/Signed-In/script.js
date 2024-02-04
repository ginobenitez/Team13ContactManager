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

        const editButton = document.createElement('button');
        editButton.className = 'edit_button';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete_button';

        editButton.innerHTML = '<i class="fa fa-edit" style="font-size:20px; color:blue"></i>';
        deleteButton.innerHTML = '<i class="fa fa-trash-o" style="font-size:20px; color:red"></i>';
        deleteButton.addEventListener('click', function() {
            const confirmed = window.confirm("Are you sure you want to delete this contact? ");
            if (confirmed) {
                
                const contactId = newEntry.dataset.contactId;
                const firstName = newEntry.querySelector('.label-first-name').textContent.trim();
                const lastName = newEntry.querySelector('.label-last-name').textContent.trim();
                deleteContact(firstName, lastName, contactId);
                newEntry.remove();
            }
        });

        

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

        listDisplay.appendChild(newEntry);

        fName.value = '';
        lName.value = '';
        pNumber.value = '';
        email.value = '';
    });

    addCButton.addEventListener('click', function() {
        contactForm.style.display = 'flex';
    });

    cancelButton.addEventListener('click', function(e){
        e.preventDefault();
        contactForm.style.display = 'none';
        contactForm.reset();
    });

    
    




});