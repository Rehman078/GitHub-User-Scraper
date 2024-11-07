// routes/scraperRoutes.js
import express from 'express';
import { scrapeGitHubUser, getGithubUsers } from '../controller/githubController.js';

const router = express.Router();

router.post('/scrape-user', scrapeGitHubUser);
router.get('/users', getGithubUsers);

export default router;
