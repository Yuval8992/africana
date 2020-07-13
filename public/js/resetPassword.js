/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const resetPassword = async (password, passwordConfirm, resetToken) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/resetPassword/${resetToken}`,
            data: {
                password,
                passwordConfirm
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Password changed successfully');
            window.setTimeout(() => {
                location.assign('/me');
            }, 2000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
    document.querySelector('.btn').textContent = 'Save Password';
};
