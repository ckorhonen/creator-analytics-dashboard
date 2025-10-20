# 🤝 Contributing to Creator Analytics Dashboard

Thank you for considering contributing! This project is all about making analytics simple and beautiful for creators.

## 🎯 Our Philosophy

**80% UX, 20% Code** - We prioritize user experience and visual design over technical complexity. Every contribution should make the dashboard:
- More intuitive
- More beautiful
- More helpful for creators

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/creator-analytics-dashboard.git
   cd creator-analytics-dashboard
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start developing**
   ```bash
   npm run dev
   ```

## 📋 What We're Looking For

### High Priority
- 🎨 **UX Improvements** - Better layouts, clearer data presentation
- 📊 **New Visualizations** - Charts and graphs that tell a story
- 🔌 **Platform Integrations** - Instagram, TikTok, Substack, etc.
- ♿ **Accessibility** - Make it work for everyone
- 📱 **Mobile Optimization** - Perfect on all screen sizes

### Medium Priority
- ✨ **New Features** - Date range filters, export options, etc.
- 🐛 **Bug Fixes** - Things that aren't working right
- 📝 **Documentation** - Help others understand the code
- ⚡ **Performance** - Make it faster

### Lower Priority
- 🧪 **Tests** - Automated testing (nice to have)
- 🔧 **Refactoring** - Code cleanup (if it improves readability)

## 💅 Design Guidelines

### Colors
- Use the existing color palette for consistency
- Primary gradient: `#667eea` → `#764ba2`
- Platform colors: Match official brand colors
- Text: `#1f2937` (dark), `#6b7280` (medium), `#9ca3af` (light)

### Typography
- Font: System font stack for best performance
- Headers: Bold, clear hierarchy
- Numbers: Large and prominent
- Labels: Small but readable

### Spacing
- Use consistent padding: `0.5rem`, `1rem`, `1.5rem`, `2rem`
- Card padding: `1.5rem`
- Grid gaps: `1.5rem`

### Components
- Border radius: `12px` (cards), `8px` (buttons)
- Box shadows: Subtle but present for depth
- Hover states: Smooth transitions, slight lift
- Loading states: Spinner with message

## 🔧 Code Standards

### TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Avoid `any` types

### React
- Functional components with hooks
- Props interfaces for all components
- Keep components focused and single-purpose

### CSS
- Use CSS modules or scoped styles
- Mobile-first responsive design
- Smooth transitions (0.3s ease)

### Example Component
```typescript
import './MyComponent.css'

interface MyComponentProps {
  title: string
  value: number
  color?: string
}

function MyComponent({ title, value, color = '#667eea' }: MyComponentProps) {
  return (
    <div className="my-component" style={{ borderColor: color }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

export default MyComponent
```

## 🧪 Testing Your Changes

1. **Visual Testing**
   - Check on desktop (1920px, 1440px, 1024px)
   - Check on tablet (768px)
   - Check on mobile (375px, 414px)

2. **Functional Testing**
   - Test with mock data first
   - Test with real API data (if available)
   - Test error states
   - Test loading states

3. **Browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

## 📝 Commit Messages

Use clear, descriptive commit messages:

```
✨ Add Instagram analytics integration
🐛 Fix revenue chart tooltip overflow
💅 Improve mobile layout for metric cards
📝 Update README with Twitch setup guide
♿ Add ARIA labels to dashboard metrics
⚡ Optimize API response caching
```

Emojis (optional but fun):
- ✨ New feature
- 🐛 Bug fix
- 💅 Style/UI improvement
- 📝 Documentation
- ♿ Accessibility
- ⚡ Performance
- 🔧 Configuration
- 🧪 Tests

## 🔍 Pull Request Process

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test thoroughly**
   - Run `npm run build` to ensure no build errors
   - Test in multiple browsers
   - Verify mobile responsiveness

3. **Create Pull Request**
   - Use a descriptive title
   - Reference any related issues
   - Include screenshots/videos of visual changes
   - List what was changed and why

4. **PR Template**
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] UI/UX improvement
   - [ ] Documentation
   - [ ] Performance optimization

   ## Screenshots/Videos
   (If applicable)

   ## Testing
   - [ ] Tested on desktop
   - [ ] Tested on mobile
   - [ ] Tested on multiple browsers
   - [ ] No console errors

   ## Related Issues
   Closes #123
   ```

## 🌟 Platform Integration Guidelines

Adding a new platform? Follow these steps:

1. **Create service file**
   ```typescript
   // src/services/newplatform.ts
   export async function getNewPlatformStats() {
     // Implementation
   }
   ```

2. **Add to types**
   ```typescript
   // src/types/index.ts
   // Add relevant interfaces
   ```

3. **Update aggregator**
   ```typescript
   // src/services/api.ts
   // Add to fetchAnalytics()
   ```

4. **Add mock data**
   ```typescript
   // src/services/mockData.ts
   // Add platform to mock data
   ```

5. **Add configuration**
   ```typescript
   // wrangler.toml, .env.example
   // Add necessary API keys
   ```

6. **Document in INTEGRATION_GUIDE.md**
   - API setup instructions
   - Code examples
   - Links to official docs

## 🎨 Design Contributions

Don't code? No problem! We love design contributions:

- **Mockups** - Share your vision in Figma, Sketch, etc.
- **Icons** - Better platform icons or metrics icons
- **Color schemes** - Alternative themes
- **Layouts** - New ways to visualize data

Share them in GitHub Discussions or Issues!

## 📚 Documentation

Good documentation is crucial:

- **Code comments** - Explain complex logic
- **README updates** - Keep setup instructions current
- **Integration guides** - Help others add platforms
- **Examples** - Show real usage scenarios

## 🤔 Questions?

- **GitHub Discussions** - For general questions and ideas
- **GitHub Issues** - For bugs and specific feature requests
- **Email** - ckorhonen@gmail.com for private inquiries

## 📜 Code of Conduct

Be kind, respectful, and constructive:
- Welcome newcomers
- Provide helpful feedback
- Focus on the idea, not the person
- Assume good intentions

## 🎉 Recognition

Contributors will be:
- Listed in README acknowledgments
- Credited in release notes
- Thanked profusely! 🙏

---

**Thank you for making creator analytics better!** ❤️
