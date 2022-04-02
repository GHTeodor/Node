import cron from 'node-cron';

import { userRepository } from '../repositories';

export const getNewUsers = async () => {
    cron.schedule('*/30 * * * * *', async () => {
        console.log(await userRepository.getNewUsers());
    });
};
