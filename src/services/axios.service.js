import axios from 'axios';

import baseURL from "../configs/urls";

export const axiosService = axios.create({
    baseURL,
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTIwYzU5YmQ0MTU1MTMwOWU2Y2NmYjk5Mzg' +
            '3MGQwZSIsInN1YiI6IjYxZmU3ODU0MTk3ZGU0MDA4ZTA2Y2M4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.' +
            '3ZAanODXylIqMO66bDeLVIAMXr1Ir1mbGaWwKW2Eh0k'
    }
});