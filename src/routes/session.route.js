import passport from 'passport';
import { Router } from 'express';
import { getRoleByUser } from '../util/RoleValidator.js';

const sessionsRouter = Router();

sessionsRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {})

sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    const user = req.user;

    req.session.email = user.email;
    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.age = user.age;
    req.session.role = getRoleByUser(user);

    res.redirect('/')
})

export default sessionsRouter;