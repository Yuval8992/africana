/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { signup } from './signup';
import { login, logout } from './login';
import { resetPassword } from './resetPassword';
import { forgotPassword } from './forgotPassword';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const forgotPasswordForm = document.querySelector('.form--forgotPassword');
const resetPasswordForm = document.querySelector('.form--resetPassword');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
    const startLocation = JSON.parse(mapBox.dataset.startlocation);
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(startLocation, locations);
}

if (signupForm)
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.lastChild.lastChild.textContent = 'Processing...';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm')
            .value;
        signup(name, email, password, passwordConfirm);
    });

if (loginForm)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });

if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}

if (forgotPasswordForm)
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.lastChild.lastChild.textContent = 'Processing...';

        const email = document.getElementById('email').value;
        forgotPassword(email);
    });

if (resetPasswordForm)
    resetPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.lastChild.lastChild.textContent = 'Saving...';

        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm')
            .value;
        const resetToken = document.querySelector('.form--resetPassword')
            .dataset.resettoken;

        resetPassword(password, passwordConfirm, resetToken);
    });

if (userDataForm)
    userDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);

        updateSettings(form, 'data');
    });

if (userPasswordForm)
    userPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent =
            'Updating...';

        const passwordCurrent = document.getElementById('password-current')
            .value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm')
            .value;
        await updateSettings(
            { passwordCurrent, password, passwordConfirm },
            'password'
        );

        document.querySelector('.btn--save-password').textContent =
            'Save password';
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });

if (bookBtn)
    bookBtn.addEventListener('click', (e) => {
        e.target.textContent = 'Processing...';
        const { tourId } = e.target.dataset;
        bookTour(tourId);
    });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
