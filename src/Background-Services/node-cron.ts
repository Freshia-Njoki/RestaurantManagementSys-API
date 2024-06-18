import cron from 'node-cron';
import { mailFunction } from './mail';

export const task = () => {
    cron.schedule('* * * * *', () => {
        mailFunction(
            'fnjokimacharia1@gmail.com',
            'masters application',
            'Due date for master application is approaching, Please consider making your application'
        )
    });
}


