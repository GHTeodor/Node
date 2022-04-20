import { axiosService } from './axiosService';
import { urls } from '../constants';

export const userService = {
    create: (user) => axiosService.post(urls.users, user),
    getByEmail: (email) => axiosService.get(`${urls.users}/${email}`)

}
