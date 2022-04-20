import axios from 'axios';

import baseURL from '../constants/urls';

export const axiosService = axios.create({ baseURL });
