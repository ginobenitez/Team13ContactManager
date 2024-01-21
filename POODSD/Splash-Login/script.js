const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');

const btnPopup = document.querySelector('.btnLogin-popup');
const closeLogin = document.querySelector('.close-btn');
const closeRegister = document.querySelector('[type="register-close"]');

const loadCircle = document.querySelector('.load-circle');

signupLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
    loadCircle.style.display = 'block';
});

closeLogin.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    loadCircle.style.display = 'none';
});

closeRegister.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
    loadCircle.style.display = 'none';
});

