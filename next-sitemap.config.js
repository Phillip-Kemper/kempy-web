/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kemperino.com',
  generateRobotsTxt: false, // We already created robots.txt manually
  outDir: './client/public',
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/private/*'],
} 
