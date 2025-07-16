# 🚀 Automatic Deployment Setup

Your portfolio is configured for automatic deployments! Here's how to complete the setup:

## 📋 GitHub Secrets Required

You need to add these secrets to your GitHub repository:

### 🔗 Go to GitHub Settings:
1. Go to your repository: https://github.com/carolinapowers/portfolio
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of these:

### 🔑 Add These 3 Secrets:

```
SECRET NAME: VERCEL_TOKEN
VALUE: [Get this from step below]

SECRET NAME: ORG_ID  
VALUE: team_IOTJaXr1ynt7rcphGGMRwnkb

SECRET NAME: PROJECT_ID
VALUE: prj_9VDN6Qcyz6zT3duxiNqOloQyop9v
```

## 🎫 How to Get Your VERCEL_TOKEN:

1. Go to: https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it: `GitHub Actions Portfolio`
4. Copy the token and paste it as the `VERCEL_TOKEN` secret value

## ✅ What Happens After Setup:

- **Pull Requests**: Automatically create preview deployments for testing
- **Main Branch**: Automatically deploy to production at `https://carolinapowers-portfolio.vercel.app/`
- **Quality Checks**: Runs linting and tests before deployment
- **Notifications**: GitHub will show deployment status on PRs

## 🧪 Test It:

1. Create a small change (like updating a comment)
2. Push to main branch
3. Watch the **Actions** tab in GitHub
4. Your site will automatically update!

## 📦 Manual Deployment (Backup):

If you ever need to deploy manually:
```bash
npm run deploy
```

---

**Your portfolio will be automatically deployed to:**
**https://carolinapowers-portfolio.vercel.app/**