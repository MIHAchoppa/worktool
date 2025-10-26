# Frequently Asked Questions (FAQ)

Common questions and answers about the Video Timestamp & Transcription Tool.

## General Questions

### What is this tool?

A Chrome extension that adds an overlay to Google Drive videos, allowing you to:
- Add timestamps while watching
- Record voice notes
- Get AI-powered transcription
- Generate study questions automatically

### Is it free?

The extension is **free and open source**. However, you need a Groq API key for transcription:
- Groq offers a **free tier** with generous limits
- Check https://console.groq.com/ for current pricing
- You only pay for what you use beyond free tier

### What browsers are supported?

- ✅ Google Chrome (88+)
- ✅ Microsoft Edge (88+)
- ✅ Brave Browser
- ✅ Other Chromium-based browsers
- ❌ Firefox (different extension system)
- ❌ Safari (different extension system)

### Does it work with other video platforms?

Currently **only Google Drive** is supported. The extension is specifically designed for Google Drive's video player.

Future versions may support:
- YouTube
- Vimeo
- Other platforms

## Installation & Setup

### How do I install the extension?

See [INSTALL.md](INSTALL.md) for detailed instructions, or:

1. Download/clone the repository
2. Open `chrome://extensions/`
3. Enable Developer mode
4. Load unpacked → Select worktool folder

### Where do I get a Groq API key?

1. Visit https://console.groq.com/
2. Create a free account
3. Go to API Keys section
4. Create a new key
5. Copy it (starts with `gsk_`)

### Is my API key secure?

Yes:
- Stored locally in your browser using Chrome's secure storage
- Never sent anywhere except Groq's API
- Not visible in the extension code
- Use password input field for protection

### Can I use without an API key?

Partially:
- ✅ Timestamp marking works without API key
- ✅ Audio recording works without API key
- ❌ Transcription requires API key
- ❌ Question generation requires API key

## Usage Questions

### How do I add a timestamp?

Simply press the **Spacebar** key while watching a video. The timestamp is added at the current playback position.

### Why isn't Spacebar working?

Common reasons:
- You're focused on a text input field → Click on the video player
- The overlay isn't loaded → Refresh the page
- Another extension is intercepting → Disable other extensions
- Video isn't detected → Check that it's a Google Drive video

### How long can I record?

There's no strict limit, but recommendations:
- **Optimal**: 30-60 seconds per recording
- **Maximum practical**: 2-3 minutes
- **Why shorter is better**: Faster processing, lower cost, easier to review

### Can I record while video is playing?

Yes! The recording is independent of video playback. You can:
- Record while video plays
- Pause video and record
- Record at any time

### How accurate is the transcription?

Very accurate! Using Groq's Whisper Large V3:
- ~95%+ accuracy for clear speech
- Handles multiple accents
- Works with technical terms
- Best with minimal background noise

### What languages are supported?

Whisper supports 95+ languages including:
- English, Spanish, French, German, Italian
- Chinese, Japanese, Korean
- Arabic, Hindi, Portuguese
- And many more

Set your language when recording for best results.

### Can I edit the transcription?

Currently, you can:
- Copy the text from the overlay
- Paste into any text editor
- Edit as needed

Future versions may include in-app editing.

## Features

### Can I export timestamps and transcriptions?

Currently, manual export:
1. Copy timestamps from overlay
2. Copy transcription text
3. Paste into your preferred app

Future versions may include:
- Export to CSV
- Export to Markdown
- Export to JSON

### Can I save my sessions?

Currently:
- API key is saved automatically
- Timestamps are session-based (not saved)
- Transcriptions are session-based

To save your work:
- Copy transcription before closing
- Take screenshots if needed
- Or leave the tab open

### How do I navigate using timestamps?

Click any timestamp in the list:
- Video jumps to that exact moment
- Works even after recording/transcribing
- Useful for reviewing specific parts

### What questions does it generate?

AI generates 5 thoughtful questions:
- Based on your transcribed commentary
- Designed to test understanding
- Cover key concepts mentioned
- Help with active learning

## Technical Questions

### What data is collected?

**None by the extension.** 

What happens to your data:
- API key: Stored locally in your browser
- Audio: Sent to Groq API, then deleted
- Transcriptions: Processed by Groq, returned to you
- Timestamps: Stored locally, not sent anywhere

### Is my data private?

Yes:
- Extension runs locally in your browser
- No analytics or tracking
- No data sent to third parties (except Groq API)
- Groq's privacy policy applies to API usage

### Does it work offline?

Partially:
- ✅ Extension loads offline
- ✅ Timestamp marking works offline
- ✅ Recording works offline
- ❌ Transcription requires internet (API call)
- ❌ Question generation requires internet

### How much does transcription cost?

Check Groq's current pricing at https://console.groq.com/

Approximate costs (as of 2025):
- Whisper transcription: Very low cost per minute
- Chat completions: Very low cost per request
- Free tier usually sufficient for personal use

Example: Transcribing 1 hour of audio might cost a few cents.

### Can I use my own API?

Currently only Groq is supported. The code can be modified to support:
- OpenAI's Whisper API
- Azure Speech Services
- Google Cloud Speech-to-Text
- Other providers

See [SETUP.md](SETUP.md) for development info.

## Troubleshooting

### Overlay doesn't appear

**Solutions**:
1. Refresh the Google Drive page
2. Check you're on a video file (not folder)
3. Verify extension is enabled in chrome://extensions/
4. Check browser console (F12) for errors
5. Try a different video

### Recording button doesn't work

**Solutions**:
1. Grant microphone permission when prompted
2. Check browser settings → Privacy → Microphone
3. Ensure microphone is not in use by another app
4. Try in an incognito window
5. Check browser console for errors

### Transcription fails

**Solutions**:
1. Verify API key is correct (starts with `gsk_`)
2. Check Groq account has credits
3. Test API key at https://console.groq.com/
4. Ensure internet connection is stable
5. Try a shorter recording first
6. Check browser console for error details

### Questions aren't generated

**Solutions**:
1. Ensure transcription completed successfully
2. Check transcription has content
3. Verify API key has access to chat models
4. Check Groq API status
5. Try again after a few seconds

### Video doesn't sync properly

**Solutions**:
1. Refresh the page
2. Pause and play the video
3. Check if Google Drive changed their interface
4. Report issue on GitHub

## Performance

### Does it slow down my browser?

No, the extension is lightweight:
- Minimal CPU usage
- Small memory footprint
- Only active on Google Drive videos
- No background processing when not in use

### How much storage does it use?

Very little:
- Extension files: ~50KB
- API key storage: <1KB
- No persistent data storage
- Recordings not saved locally

### Can I use it on mobile?

Currently **not supported**. Chrome extensions on mobile have limited capabilities:
- No content script injection on Chrome iOS
- Limited API access on Chrome Android

Desktop browsers only for now.

## Getting Help

### Where can I report bugs?

GitHub Issues: https://github.com/MIHAchoppa/worktool/issues

Include:
- Browser version
- Extension version
- Steps to reproduce
- Error messages from console

### Where can I request features?

GitHub Issues with "enhancement" label or Discussions section.

Popular requests:
- Export functionality
- Multi-platform support
- Persistent sessions
- Custom question templates

### Where's the documentation?

- **README.md**: Overview and features
- **QUICKSTART.md**: Get started in 5 minutes
- **INSTALL.md**: Installation guide
- **SETUP.md**: Development setup
- **EXAMPLES.md**: Usage examples
- **FAQ.md**: This file

### How can I contribute?

See [SETUP.md](SETUP.md) for development info:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

All contributions welcome!

## Future Plans

### What features are planned?

Potential future additions:
- Export to various formats
- Session persistence
- Custom keyboard shortcuts
- Multi-platform support (YouTube, etc.)
- Collaborative features
- Video summaries
- Timeline visualization
- Integration with note apps

### Can I suggest features?

Absolutely! Open an issue on GitHub with:
- Feature description
- Use case
- Why it would be helpful

Popular suggestions may be implemented.

## Miscellaneous

### Is this officially affiliated with Google or Groq?

No, this is an independent open-source project:
- Not affiliated with Google
- Not affiliated with Groq
- Uses public APIs
- Community-maintained

### Can I use this for commercial purposes?

Yes, under MIT License:
- Free to use commercially
- Free to modify
- Free to distribute
- Attribution appreciated

Check Groq's terms for API usage.

### How do I cite this tool?

For academic use:
```
Video Timestamp & Transcription Tool (2025)
GitHub: https://github.com/MIHAchoppa/worktool
License: MIT
```

## Still Have Questions?

- 📖 Check the [documentation](README.md)
- 💬 Open a [GitHub Discussion](https://github.com/MIHAchoppa/worktool/discussions)
- 🐛 Report [issues](https://github.com/MIHAchoppa/worktool/issues)
- 📧 Contact the maintainers

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
