# 🚀 Deployment Guide

This guide will help you deploy your Frequenc Frontend Play Module to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Environment variables configured
- Build process working locally

## 🏗️ Build the Project

First, ensure your project builds successfully:

```bash
npm install
npm run build
```

The build output will be in the `build/` directory.

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)

1. **Install gh-pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json homepage**
   ```json
   "homepage": "https://yourusername.github.io/Frequenc-Frontend-2025-Play-Module"
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Select "gh-pages" branch as source
   - Save changes

### Option 2: Vercel (Recommended - Free)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to your GitHub repository
   - Set project name
   - Configure build settings

4. **Production deployment**
   ```bash
   npm run deploy:vercel
   ```

### Option 3: Netlify (Free)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Drag and drop**
   - Go to [netlify.com](https://netlify.com)
   - Drag your `build/` folder to deploy

3. **Or use Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=build --prod
   ```

### Option 4: AWS S3 + CloudFront

1. **Install AWS CLI and configure credentials**

2. **Create S3 bucket and enable static website hosting**

3. **Upload build files**
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

4. **Configure CloudFront for CDN**

## 🔧 Environment Variables

Ensure these are set in your deployment platform:

```bash
VITE_API_BASE_URL=your_production_api_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📱 PWA Configuration

If you want to enable PWA features:

1. **Update manifest.json** in `public/` folder
2. **Configure service worker**
3. **Test offline functionality**

## 🔍 Post-Deployment Checklist

- [ ] Application loads without errors
- [ ] All routes work correctly
- [ ] API calls are successful
- [ ] Google Maps integration works
- [ ] Responsive design works on mobile
- [ ] Performance is acceptable
- [ ] SSL certificate is valid
- [ ] Analytics are tracking correctly

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Environment variables not working**
   - Ensure they're prefixed with `VITE_`
   - Check deployment platform configuration

3. **Routing issues**
   - Configure redirects for SPA
   - Check base URL configuration

4. **API calls failing**
   - Verify CORS configuration
   - Check API endpoint URLs

### Performance Optimization

1. **Enable compression**
2. **Configure caching headers**
3. **Optimize images**
4. **Use CDN for static assets**

## 📊 Monitoring

Set up monitoring for:
- Uptime monitoring
- Performance metrics
- Error tracking
- User analytics

## 🔄 Continuous Deployment

Consider setting up:
- GitHub Actions for auto-deployment
- Automated testing before deployment
- Staging environment for testing

---

For more help, check the main README or open an issue on GitHub.
