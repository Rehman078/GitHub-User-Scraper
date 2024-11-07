
import puppeteer from 'puppeteer';
import GitHubUser from '../model/githubUser.js';

export const scrapeGitHubUser = async (req, res) => {
    const { profileUrl } = req.body;
    
    // Extract username from the URL
    const match = profileUrl.match(/github\.com\/([\w-]+)/);
    const username = match ? match[1] : null;
  
    if (!username) {
      return res.status(400).json({ message: 'Invalid GitHub URL' });
    }
  
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      
      await page.goto(`https://github.com/${username}`, { waitUntil: 'domcontentloaded' });
  
      // Check if the profile exists by looking for a specific element
      const profileExists = await page.evaluate(() => !!document.querySelector('span.p-name'));
      
      if (!profileExists) {
        await browser.close();
        return res.status(404).json({ message: 'GitHub user profile not found' });
      }
  
      // If profile exists, proceed with scraping
      const userData = await page.evaluate(() => {
        const name = document.querySelector('span.p-name')?.innerText || null;
        const avatar_url = document.querySelector('img.avatar')?.src || null;
        const emailElement = Array.from(document.querySelectorAll('a')).find(a => a.getAttribute('href')?.includes('mailto:') || a.rel?.includes('me'));
        const email = emailElement ? emailElement.getAttribute('href').replace('mailto:', '') : 'Not available';
        const locationElement = document.querySelector('li[itemprop="homeLocation"] span.p-label') || document.querySelector('span[itemprop="homeLocation"]');
        const location = locationElement?.innerText || 'Not available';
        return { name, avatar_url, email, location };
      });
  
      await browser.close();
  
      // Check if the user already exists in the database
      let user = await GitHubUser.findOne({ username });
      if (!user) {
        user = new GitHubUser({
          username,
          name: userData.name,
          avatar_url: userData.avatar_url,
          email: userData.email,
          location: userData.location,
          created_at: new Date(),
        });
        await user.save();
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error scraping user data' });
    }};

export const getGithubUsers = async (req, res) => {
  try {
    const users = await GitHubUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
}

