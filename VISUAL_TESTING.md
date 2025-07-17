# 📸 Visual Testing Guide

Your portfolio now includes comprehensive visual testing using Playwright's visual comparison features.

## 🎯 What's Covered

### **Desktop Testing** (1280x720)
- ✅ Full homepage layout
- ✅ Hero/header section
- ✅ Rich text editor component
- ✅ Recommendations grid
- ✅ Brainstorming section
- ✅ Footer with action buttons
- ✅ Above-the-fold content

### **Mobile Testing** (iPhone 12)
- ✅ Mobile-responsive layout
- ✅ Mobile hero section
- ✅ Mobile navigation/content stacking

### **Tablet Testing** (iPad Pro)
- ✅ Tablet homepage layout
- ✅ Responsive grid behavior

### **Interactive States**
- ✅ Button hover effects
- ✅ Tech stack styling
- ✅ Loading states

### **Accessibility**
- ✅ Dark mode preference detection

## 🚀 Commands

```bash
# Run all visual tests
npm run test:e2e:visual

# Run visual tests for specific browser
npm run test:e2e:visual -- --project=chromium

# Update visual baselines (after intentional changes)
npm run test:e2e:update

# Debug visual tests interactively
npm run test:e2e:debug -- --grep @visual

# Run visual tests with UI
npm run test:e2e:ui -- --grep @visual
```

## 🔧 Configuration

Visual tests are configured in `playwright.config.ts`:

- **Threshold**: 0.2 (20% difference tolerance)
- **Animations**: Disabled for consistency
- **Multiple viewports**: Desktop, mobile, tablet
- **Stable rendering**: Waits for network idle + fonts

## 📁 Screenshot Storage

Visual baselines are stored in:
```
tests/e2e/visual.spec.ts-snapshots/
├── homepage-full-chromium-darwin.png
├── hero-section-chromium-darwin.png
├── mobile-homepage-chromium-darwin.png
└── ... (other screenshots)
```

## 🔄 Workflow

### **When Visual Tests Fail:**

1. **Expected failure** (you made UI changes):
   ```bash
   npm run test:e2e:update
   ```

2. **Unexpected failure** (regression):
   ```bash
   # Review the diff in the HTML report
   npx playwright show-report
   
   # Debug the specific test
   npm run test:e2e:debug -- --grep "failing test name"
   ```

### **Adding New Visual Tests:**

1. Add test with `@visual` tag:
   ```typescript
   test('should match new component @visual', async ({ page }) => {
     await page.goto('/');
     const component = page.locator('.new-component');
     await expect(component).toHaveScreenshot('new-component.png');
   });
   ```

2. Generate baseline:
   ```bash
   npm run test:e2e:update -- --grep "new component"
   ```

## 🎨 Best Practices

### **Stable Screenshots:**
- Tests wait for `networkidle` and fonts to load
- Animations are disabled
- Consistent viewport sizes

### **Meaningful Tests:**
- Test components in isolation
- Test responsive breakpoints
- Test interactive states
- Test accessibility features

### **Maintenance:**
- Update baselines when making intentional UI changes
- Review diffs carefully for unintended changes
- Use descriptive test names and file names

## 🚨 CI/CD Integration

Visual tests run in GitHub Actions and will:
- ✅ Pass if screenshots match baselines
- ❌ Fail if visual regressions are detected
- 📊 Generate HTML reports with diffs

The tests use consistent browser versions across environments for reliable results.

## 📊 Benefits

- **Catch regressions**: Automatically detect unintended UI changes
- **Cross-device testing**: Ensure responsive design works correctly
- **Component isolation**: Test individual sections independently
- **Documentation**: Screenshots serve as visual documentation
- **Quality gates**: Prevent visual bugs from reaching production