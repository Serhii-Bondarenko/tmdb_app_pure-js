import {axiosService} from "./axios.service";
import {sort, urls} from "../configs";

export const cinemaService = {
    // getPopular: (page = '1') => axiosService.get(`${urls.popular}=${page}`).then(response => response.data),
    // getTop: (page = '1') => axiosService.get(`${urls.top}=${page}`).then(response => response.data),
    getAll: () => axiosService.get(urls.movies).then(response => response.data),
    getByCategory: (page, endPoint) => axiosService.get(`${urls.categories}=${endPoint}&${sort.popular}&page=${page}`)
        .then(response => response.data),

    getById: (id) => axiosService.get(`${urls.movie}/${id}`).then(response => response.data),

    getGenres: () => axiosService.get(urls.genres).then(response => response.data),

    getPoster: (width, path) => `${urls.img}${width}/${path}`
}