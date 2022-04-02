import { getNewUsers } from './get-new-users';

export const cronRun = async () => {
    await getNewUsers();
};
