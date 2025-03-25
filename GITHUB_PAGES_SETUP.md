# Setting Up GitHub Pages for PFL Academy Site

This guide explains how to enable GitHub Pages for your PFL Academy site repository.

## Step 1: Configure Repository Settings

1. Go to your GitHub repository: https://github.com/jghiglia2380/pfl-academy-site
2. Click on "Settings" tab near the top of the page
3. In the left sidebar, click on "Pages" under "Code and automation"

## Step 2: Configure Build Source

1. Under "Build and deployment" > "Source", select "Deploy from a branch"
2. Under "Branch", select "main" and "/(root)" folder
3. Click "Save"

GitHub will now build and deploy your site. This may take a few minutes.

## Step 3: Verify Deployment

1. After GitHub finishes deploying your site, you'll see a message at the top of the GitHub Pages settings indicating your site is published
2. Click the provided URL to visit your site (it will be in the format: https://jghiglia2380.github.io/pfl-academy-site/)

## Step 4: Custom Domain (Optional)

If you want to use a custom domain:

1. In the GitHub Pages settings, enter your custom domain in the "Custom domain" field
2. Click "Save"
3. Add the required DNS records with your domain registrar:
   - For apex domain (example.com): Add A records pointing to GitHub Pages IP addresses
   - For subdomain (www.example.com): Add a CNAME record pointing to your GitHub Pages URL

## Troubleshooting

If your site doesn't appear:

1. Check the "Actions" tab to see if the build is still in progress or if there were any errors
2. Ensure your repository contains an index.html file in the root directory
3. Check that all file paths in your HTML files are correct (relative paths should work)

## Updating Content

After setting up GitHub Pages, any content pushed to your main branch will automatically be deployed to your live site. This happens through GitHub's automatic build process, or through the n8n workflow integration if you've set that up.

## Site Organization

Remember that your site is organized by standards and chapters:

- Homepage: https://jghiglia2380.github.io/pfl-academy-site/
- Standards list: https://jghiglia2380.github.io/pfl-academy-site/standards/
- Standard 1: https://jghiglia2380.github.io/pfl-academy-site/standards/Standard-1/
- Chapter 1.1 Day 1: https://jghiglia2380.github.io/pfl-academy-site/standards/Standard-1/Chapter-1-1/student/day1.html

## Testing Your Site

After deployment, test these aspects of your site:

1. Navigation between pages
2. Responsive design on different device sizes
3. Interactive elements like tabs and timers
4. Links to different sections within pages

## Next Steps

Once your site is live:

1. Integrate the first chapter content from your n8n workflow
2. Test the content display and formatting
3. Set up the automatic content integration workflow
4. Create a full chapter as a showcase example

For questions or issues, create an issue in the repository or contact the development team.
