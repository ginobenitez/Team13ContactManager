const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');

const btnPopup = document.querySelector('.btnLogin-popup');
const closeLogin = document.querySelector('.close-btn');
const closeRegister = document.querySelector('[type="register-close"]');

const loadCircle = document.querySelector('.load-circle');
const loadOval = document.querySelector('.load-oval');

// BEGIN EDIT FOR SPLASH TEXT
document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = document.querySelector('.welcome-text');

    btnPopup.addEventListener('click', () => {
        welcomeText.style.display = 'none';
    });

    closeLogin.addEventListener('click', () => {
        welcomeText.style.display = 'block';
    });

    closeRegister.addEventListener('click', () => {
        welcomeText.style.display = 'block';
    });
});
// END EDIT FOR SPLASH TEXT


signupLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
    loadCircle.style.display = 'none';
    loadOval.style.display = 'block';
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
    loadCircle.style.display = 'block';
    loadOval.style.display = 'none';
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
    if (wrapper.classList.contains('active')) {
        loadCircle.style.display = 'none';
        loadOval.style.display = 'block';
    }
    else {
        loadCircle.style.display = 'block';
        loadOval.style.display = 'none';
    }
});

closeLogin.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    loadCircle.style.display = 'none';
});

closeRegister.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
    loadCircle.style.display = 'none';
    loadOval.style.display = 'none';
});
