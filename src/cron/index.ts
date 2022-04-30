import { getNewUsers } from './get-new-users';

export const cronRun = async () => {
    console.log('CRON has been started');
    await getNewUsers();
};
