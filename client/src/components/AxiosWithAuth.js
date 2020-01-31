import React from 'react';
import axios from 'axios';

export default function AxiosWithAuth() {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });
}