# Contributing to Video Timestamp & Transcription Tool

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Ways to Contribute

### 🐛 Report Bugs
- Check existing issues first
- Include browser version, extension version
- Provide steps to reproduce
- Include error messages and screenshots

### 💡 Suggest Features
- Open an issue with "enhancement" label
- Describe the feature and use case
- Explain why it would be valuable

### 📝 Improve Documentation
- Fix typos and clarify instructions
- Add examples and use cases
- Improve installation guides
- Translate to other languages

### 💻 Submit Code
- Fix bugs
- Implement features
- Optimize performance
- Add tests

## Getting Started

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/worktool.git
   cd worktool
   ```

3. **Load extension in Chrome**
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Load unpacked → Select worktool folder

4. **Make changes**
   - Edit files in your preferred editor
   - Test changes in Chrome

5. **Test thoroughly**
   - Test on Google Drive videos
   - Check all features work
   - Verify no console errors

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   - Reload extension in Chrome
   - Test all affected features
   - Check browser console for errors

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## Code Style Guidelines

### JavaScript

- Use modern ES6+ syntax
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Add semicolons
- Use meaningful variable names
- Add comments for complex logic

**Example**:
```javascript
// Good
const addTimestamp = (currentTime) => {
  const timestamp = {
    time: currentTime,
    formattedTime: formatTime(currentTime),
    createdAt: new Date().toISOString()
  };
  timestamps.push(timestamp);
};

// Avoid
var add_ts = function(t) {
  var ts = {time: t, formatted: fmt(t), created: new Date().toISOString()};
  timestamps.push(ts);
}
```

### HTML

- Use semantic HTML5 elements
- Include proper indentation
- Use descriptive IDs and classes
- Follow accessibility guidelines

### CSS

- Use consistent naming conventions
- Group related styles
- Comment complex styles
- Prefer classes over IDs for styling

## Pull Request Guidelines

### PR Title

Use clear, descriptive titles:
- ✅ "Add export to CSV functionality"
- ✅ "Fix timestamp not showing on Firefox"
- ❌ "Update"
- ❌ "Bug fix"

### PR Description

Include:
- **What**: What changes were made
- **Why**: Why these changes are needed
- **How**: How the changes work
- **Testing**: How you tested the changes

**Template**:
```markdown
## Description
Brief description of changes

## Motivation
Why this change is needed

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Edge
- [ ] All features work
- [ ] No console errors
- [ ] Documentation updated
```

### Before Submitting

Checklist:
- [ ] Code follows project style
- [ ] Changes are tested
- [ ] No console errors
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear
- [ ] PR description is complete

## Reporting Issues

### Bug Reports

Include:
1. **Title**: Clear, specific description
2. **Environment**:
   - Browser and version
   - Extension version
   - Operating system
3. **Steps to reproduce**:
   - Step 1
   - Step 2
   - Step 3
4. **Expected behavior**: What should happen
5. **Actual behavior**: What actually happens
6. **Screenshots**: If applicable
7. **Console errors**: From browser DevTools

### Feature Requests

Include:
1. **Title**: Clear feature description
2. **Problem**: What problem does this solve?
3. **Proposed solution**: How should it work?
4. **Alternatives**: Other approaches considered
5. **Use case**: When would this be used?

## Development Tips

### Debugging

1. **Content Script**:
   - Open page DevTools (F12)
   - Check Console tab
   - Use `console.log()` liberally

2. **Overlay**:
   - Right-click overlay iframe
   - Inspect element
   - Check iframe's console

3. **Background Script**:
   - Go to `chrome://extensions/`
   - Click "Inspect views: background page"
   - Check console

### Testing

Manual test checklist:
- [ ] Extension loads without errors
- [ ] Overlay appears on Google Drive
- [ ] Spacebar adds timestamps
- [ ] Timestamps are clickable
- [ ] Recording starts/stops
- [ ] Audio is captured
- [ ] Transcription works
- [ ] Questions are generated
- [ ] API key saves

### Common Issues

**Issue**: Changes not appearing
- **Fix**: Refresh extension in chrome://extensions/

**Issue**: Console errors
- **Fix**: Check syntax, missing semicolons, undefined variables

**Issue**: API not working
- **Fix**: Check network tab, verify API key, check CORS

## Code Review Process

When you submit a PR:

1. **Automated checks**: May be added in future
2. **Maintainer review**: Code will be reviewed
3. **Feedback**: You may be asked to make changes
4. **Approval**: PR approved when ready
5. **Merge**: Maintainer merges to main branch

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

- Open a GitHub Discussion
- Comment on related issue
- Check documentation first

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md (if we create one)
- Mentioned in release notes
- Credited in commit messages

Thank you for contributing! 🎉
