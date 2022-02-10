import {axiosService} from "./axios.service";
import {sort, urls} from "../configs";

export const cinemaService = {
    getByValue: (page, value) => axiosService.get(`${urls.movie}/${value}?page=${page}`).then(response => response.data),

    getByCategory: (page, endPoint) => axiosService.get(urls.movies, {
        params: {
            with_genres: endPoint,
            sort_by: sort.popular,
            page
        }
    }).then(response => response.data),

    getByQuery: (page, query) => axiosService.get(sort.query, {params: {query, page}}).then(response => response.data),

    getById: (id) => axiosService.get(`${urls.movie}/${id}`).then(response => response.data),

    getGenres: () => axiosService.get(urls.genres).then(response => response.data),

    getPoster: (width, path) => `${urls.img}${width}/${path}`
}