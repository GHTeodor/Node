import { Request, Response } from 'express';

import authService from '../services/authService';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
        );
        return res.json(data);
    }

    // public async login() {
    //
    // }
    //
    // public async logout() {
    //
    // }
    //
    // public async refresh() {
    //
    // }
}

export default new AuthController();
