# Setup and Development Guide

This guide provides detailed instructions for setting up and developing the Video Timestamp & Transcription Tool.

## Quick Start

### For Users

1. **Install the Extension**:
   ```bash
   # Clone the repository
   git clone https://github.com/MIHAchoppa/worktool.git
   cd worktool
   ```

2. **Load in Browser**:
   - Open Chrome/Edge
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `worktool` directory

3. **Get API Key**:
   - Visit [https://console.groq.com/](https://console.groq.com/)
   - Sign up and create an API key
   - Copy the API key

4. **Use the Tool**:
   - Open any video on Google Drive
   - Enter your API key in the overlay
   - Start using the tool!

## Development Setup

### Prerequisites

- Modern web browser (Chrome/Edge)
- Text editor or IDE
- Basic knowledge of JavaScript, HTML, CSS
- Git (optional, for version control)

### Development Workflow

1. **Make Changes**:
   - Edit files in your preferred editor
   - Main files to modify:
     - `content.js` - Video detection and content script logic
     - `overlay.js` - Overlay UI and API interactions
     - `overlay.html` - Overlay UI structure
     - `background.js` - Background service worker

2. **Test Changes**:
   - Go to `chrome://extensions/`
   - Click refresh icon on the extension
   - Open/reload a Google Drive video page
   - Test your changes

3. **Debug**:
   - Use Chrome DevTools (F12)
   - Check Console tab for errors
   - Use `console.log()` for debugging
   - Inspect Network tab for API calls

### File Structure Explained

#### manifest.json
Chrome extension configuration file that defines:
- Extension metadata (name, version, description)
- Required permissions
- Content scripts to inject
- Background service worker
- Web accessible resources

#### content.js
Injected into Google Drive pages. Handles:
- Video element detection
- Overlay creation and positioning
- Keyboard event listening (Spacebar)
- Audio recording via MediaRecorder API
- Communication with overlay iframe

#### overlay.html & overlay.js
The UI that appears over Google Drive videos:
- Timestamp display and management
- Recording controls
- Transcription display
- Question generation display
- API key management

#### background.js
Service worker running in the background:
- Manages extension lifecycle
- Handles storage operations
- Coordinates between content scripts

### Key Technologies

- **Chrome Extension Manifest V3**: Latest extension platform
- **MediaRecorder API**: For audio recording
- **Groq API**: For transcription and AI features
- **Chrome Storage API**: For persistent data
- **PostMessage API**: For iframe communication

## API Integration

### Groq API Endpoints

#### 1. Transcription (Whisper)
```javascript
POST https://api.groq.com/openai/v1/audio/transcriptions
Headers:
  Authorization: Bearer YOUR_API_KEY
Body:
  FormData with audio file
  model: whisper-large-v3
```

#### 2. Question Generation (Chat)
```javascript
POST https://api.groq.com/openai/v1/chat/completions
Headers:
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json
Body:
  {
    model: "llama-3.1-8b-instant",
    messages: [...],
    temperature: 0.7,
    max_tokens: 500
  }
```

### API Error Handling

The extension includes error handling for:
- Invalid API keys
- Network failures
- API rate limits
- Malformed responses

## Testing

### Manual Testing Checklist

1. **Installation**:
   - [ ] Extension loads without errors
   - [ ] Icons display correctly
   - [ ] Popup shows instructions

2. **Video Detection**:
   - [ ] Overlay appears on Google Drive video page
   - [ ] Video time syncs correctly
   - [ ] Video play/pause status updates

3. **Timestamps**:
   - [ ] Spacebar adds timestamp
   - [ ] Timestamps display with correct time
   - [ ] Clicking timestamp seeks video
   - [ ] Multiple timestamps work correctly

4. **Recording**:
   - [ ] Recording starts when clicked
   - [ ] Microphone permission requested
   - [ ] Recording stops correctly
   - [ ] Audio data is captured

5. **Transcription**:
   - [ ] API key saves correctly
   - [ ] Transcription request succeeds
   - [ ] Transcription displays correctly
   - [ ] Error messages show for failures

6. **Questions**:
   - [ ] Questions generate after transcription
   - [ ] Questions are relevant
   - [ ] Questions display correctly

### Browser Console

Check for these common messages:
```
✓ "Initializing Video Timestamp Overlay"
✓ "Video element detected"
✓ "Timestamp added"
✓ "Recording started"
✓ "Recording stopped"
```

### Common Issues During Development

1. **Overlay not appearing**:
   - Check content script is injected
   - Verify iframe is created in DOM
   - Check for CSS conflicts

2. **Spacebar not working**:
   - Ensure event listener is attached
   - Check for event.preventDefault()
   - Verify not in input field

3. **Recording fails**:
   - Check microphone permissions
   - Verify HTTPS connection
   - Check MediaRecorder support

4. **API calls fail**:
   - Verify API key is correct
   - Check network connectivity
   - Review CORS settings
   - Check API rate limits

## Security Best Practices

1. **API Key Storage**:
   - Keys stored in Chrome's local storage
   - Never commit keys to version control
   - Input type="password" for key entry

2. **Content Security Policy**:
   - Extension follows Manifest V3 CSP
   - No inline scripts
   - No eval() usage

3. **Permissions**:
   - Request minimal necessary permissions
   - Explain permission usage to users

## Performance Optimization

1. **Memory Management**:
   - Clean up event listeners
   - Stop media streams when done
   - Clear large data structures

2. **API Efficiency**:
   - Debounce rapid API calls
   - Cache responses when appropriate
   - Handle rate limits gracefully

3. **DOM Operations**:
   - Minimize reflows
   - Use document fragments
   - Batch DOM updates

## Deployment

### Preparing for Release

1. **Test thoroughly** on multiple browsers
2. **Update version** in manifest.json
3. **Create release notes** in CHANGELOG.md
4. **Package extension**:
   ```bash
   # Create a zip file
   zip -r extension.zip . -x "*.git*" "*.DS_Store"
   ```

### Chrome Web Store (Optional)

To publish to Chrome Web Store:
1. Create developer account
2. Pay one-time registration fee
3. Upload extension package
4. Fill in store listing details
5. Submit for review

## Contributing

### Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Use meaningful variable names
- Follow existing code patterns

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request with description

## Resources

### Documentation
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [Groq API Docs](https://console.groq.com/docs)

### Tools
- Chrome DevTools
- Postman (for API testing)
- VS Code with extensions

## Support

For development questions:
- Check existing GitHub issues
- Review Chrome extension documentation
- Test in Chrome DevTools console

## License

MIT License - Free to use and modify
