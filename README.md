# Video Timestamp & Transcription Tool

A Chrome/Edge browser extension that provides an overlay interface for Google Drive videos, enabling synchronized timestamp marking, audio recording, and AI-powered transcription using Groq's Whisper API.

## Features

- 🎥 **Automatic Video Detection**: Works seamlessly with Google Drive video player
- ⏱️ **Timestamp Marking**: Press Spacebar to capture timestamps while watching
- 🎤 **Audio Recording**: Record your commentary while watching videos
- 📝 **AI Transcription**: Powered by Groq's Whisper API for accurate transcription
- 🤔 **Question Generation**: Automatically generates thoughtful questions about the video content
- 🎯 **Video Navigation**: Click timestamps to jump to specific moments
- 💾 **Persistent Storage**: API keys and settings are saved locally

## Installation

### Prerequisites
- Chrome or Edge browser (Manifest V3 compatible)
- Groq API key (get one at [https://console.groq.com/](https://console.groq.com/))

### Steps

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/MIHAchoppa/worktool.git
   cd worktool
   ```

2. **Load the Extension**:
   - Open Chrome/Edge and navigate to `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `/worktool` folder

3. **Configure API Key**:
   - Click the extension icon in your browser toolbar
   - Follow the instructions to get your Groq API key
   - Open a Google Drive video
   - Enter your API key in the overlay panel
   - Click "Save API Key"

## Usage

### Basic Workflow

1. **Open a Google Drive Video**:
   - Navigate to any video on Google Drive
   - The overlay panel will automatically appear on the right side

2. **Add Timestamps**:
   - While watching the video, press the **Spacebar** to mark important moments
   - Timestamps appear in the overlay with clickable links to jump back

3. **Record Commentary**:
   - Click "🎤 Start Recording" to begin audio recording
   - Speak your thoughts and observations about the video
   - Click "⏹️ Stop Recording" when done

4. **Transcribe Audio**:
   - Click "📝 Transcribe" to send your recording to Groq Whisper
   - The transcription will appear in the overlay
   - AI-generated questions will be created automatically

5. **Review & Learn**:
   - Use the timestamps to navigate key moments
   - Review the transcription of your commentary
   - Answer the generated questions to reinforce learning

### Keyboard Shortcuts

- **Spacebar**: Add timestamp at current video position
  - Note: Only works when not typing in an input field

## Project Structure

```
worktool/
├── manifest.json         # Extension configuration
├── background.js         # Service worker for background tasks
├── content.js           # Content script injected into Google Drive
├── overlay.html         # Overlay UI structure
├── overlay.js           # Overlay UI logic
├── overlay.css          # Minimal overlay styles
├── popup.html           # Extension popup UI
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md            # This file
└── SETUP.md            # Setup and development guide
```

## Privacy & Security

- **Local Storage**: API keys are stored locally in your browser using Chrome's storage API
- **No Data Collection**: The extension does not collect or transmit any personal data
- **API Communication**: Audio is sent only to Groq's API for transcription
- **Permissions**: The extension only requests necessary permissions

## Troubleshooting

### Overlay Not Appearing
- Ensure you're on a Google Drive video page
- Refresh the page after installing the extension
- Check browser console for errors (F12)

### Recording Not Working
- Grant microphone permissions when prompted
- Check browser settings to ensure microphone access is enabled
- Try using HTTPS (Google Drive uses HTTPS by default)

### Transcription Failing
- Verify your Groq API key is correct
- Check your Groq account has available credits
- Ensure you have internet connectivity

### Spacebar Not Adding Timestamps
- Ensure you're not focused on an input field
- Click on the video player area first

## Development

See [SETUP.md](SETUP.md) for detailed development instructions.

## License

MIT License

## Support

For issues, questions, or suggestions, please open an issue on GitHub.