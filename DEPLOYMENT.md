# Deploying to GitHub Pages

This guide will help you deploy your cleaning calendar app to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Your cleaning calendar project ready

## Steps to Deploy

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `cleaning-calendar`)
4. Make it public (required for free GitHub Pages)
5. Don't initialize with README (since you already have one)
6. Click "Create repository"

### 2. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/cleaning-calendar.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically run when you push to main branch

### 4. Configure GitHub Pages Settings

1. In the same "Pages" section:
   - Source: "GitHub Actions"
   - Branch: This will be handled automatically by the workflow

### 5. Your Site Will Be Available At

Once deployed, your site will be available at:
```
https://YOUR_USERNAME.github.io/cleaning-calendar/
```

## Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:

1. Automatically build your Next.js app when you push to the main branch
2. Deploy it to GitHub Pages
3. Update your site with the latest changes

## Manual Build (Optional)

If you want to test the build locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# The built files will be in the `out` directory
```

## Troubleshooting

### Common Issues:

1. **Build fails**: Check the GitHub Actions tab in your repository for error details
2. **Site not loading**: Make sure the repository is public
3. **404 errors**: The base path is configured for `/cleaning-calendar/` - make sure your repository name matches

### Check Deployment Status:

1. Go to your repository on GitHub
2. Click on "Actions" tab
3. You should see the deployment workflow running or completed

## Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository settings → Pages
2. Add your custom domain
3. Update your DNS settings accordingly

## Notes

- The app is configured to work with the repository name `cleaning-calendar`
- If you change the repository name, update the `basePath` in `next.config.ts`
- The site will be static (no server-side features)
- All functionality will work client-side
