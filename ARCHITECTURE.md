# System Architecture

This document explains how the Video Timestamp & Transcription Tool works internally.

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Google Drive (Video Page)                │
│                                                              │
│  ┌────────────────┐                  ┌──────────────────┐  │
│  │                │                  │                  │  │
│  │  Video Player  │◄─────────────────┤  Overlay (iframe)│  │
│  │                │  Time Sync       │                  │  │
│  │                │                  │  - Timestamps    │  │
│  └────────────────┘                  │  - Recording     │  │
│         ▲                            │  - Transcription │  │
│         │                            │  - Questions     │  │
│         │ Spacebar                   └──────────────────┘  │
│         │                                     ▲             │
│  ┌──────┴────────┐                           │             │
│  │ Content Script│───────────────────────────┘             │
│  │  (content.js) │      PostMessage API                    │
│  └───────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Chrome Extension APIs
                              ▼
                    ┌──────────────────┐
                    │  Background      │
                    │  Service Worker  │
                    │  (background.js) │
                    └──────────────────┘
                              │
                              │ Storage API
                              ▼
                    ┌──────────────────┐
                    │  Chrome Storage  │
                    │  (API Keys)      │
                    └──────────────────┘

External Services:
                              │
                              │ HTTPS API Calls
                              ▼
                    ┌──────────────────┐
                    │   Groq API       │
                    │  - Whisper V3    │
                    │  - Llama 3.1     │
                    └──────────────────┘
```

## Component Breakdown

### 1. Manifest.json
**Purpose**: Extension configuration

**Key Settings**:
- Manifest V3 (latest standard)
- Permissions: activeTab, storage, tabs
- Content scripts for drive.google.com
- Background service worker

### 2. Content Script (content.js)
**Runs in**: Google Drive page context

**Responsibilities**:
- Detect video element on page
- Create and inject overlay iframe
- Listen for keyboard events (Spacebar)
- Manage audio recording via MediaRecorder API
- Sync video time with overlay
- Handle video play/pause events
- Communicate with overlay via PostMessage

**Key Functions**:
```javascript
initializeOverlay()      // Setup on page load
detectVideoElement()     // Find HTML5 video element
createOverlay()          // Inject iframe
setupKeyboardListener()  // Handle Spacebar
addTimestamp()           // Create timestamp entry
startRecording()         // Start MediaRecorder
stopRecording()          // Stop and save audio
```

### 3. Overlay UI (overlay.html + overlay.js)
**Runs in**: Isolated iframe context

**Responsibilities**:
- Display user interface
- Show timestamps list
- Display video time sync
- Manage recording controls
- Handle API key storage
- Make API calls to Groq
- Display transcriptions
- Show generated questions

**Key Functions**:
```javascript
toggleRecording()        // Start/stop recording
transcribeAudio()        // Call Whisper API
generateQuestions()      // Call Llama API
addTimestamp()           // Add to UI list
sendMessageToContent()   // Communicate with content script
```

### 4. Background Service Worker (background.js)
**Runs in**: Extension background

**Responsibilities**:
- Extension lifecycle management
- Storage operations coordination
- Message passing hub

**Key Functions**:
```javascript
onInstalled()           // Handle installation
onMessage()             // Process messages
```

## Data Flow Diagrams

### Adding a Timestamp

```
User presses Spacebar
         │
         ▼
content.js detects keydown event
         │
         ▼
content.js gets video.currentTime
         │
         ▼
content.js creates timestamp object
         │
         ▼
content.js sends message to overlay
         │
         ▼
overlay.js receives message
         │
         ▼
overlay.js adds to UI list
         │
         ▼
User sees timestamp in overlay
```

### Recording & Transcription Flow

```
1. START RECORDING
   User clicks "Start Recording"
            │
            ▼
   overlay.js sends START_RECORDING message
            │
            ▼
   content.js receives message
            │
            ▼
   content.js requests microphone permission
            │
            ▼
   MediaRecorder starts capturing audio
            │
            ▼
   UI shows "Recording..."

2. STOP RECORDING
   User clicks "Stop Recording"
            │
            ▼
   overlay.js sends STOP_RECORDING message
            │
            ▼
   content.js stops MediaRecorder
            │
            ▼
   Audio chunks converted to Blob
            │
            ▼
   Blob converted to Base64
            │
            ▼
   content.js sends AUDIO_RECORDED message with data
            │
            ▼
   overlay.js receives audio data
            │
            ▼
   UI enables "Transcribe" button

3. TRANSCRIPTION
   User clicks "Transcribe"
            │
            ▼
   overlay.js converts Base64 to Blob
            │
            ▼
   overlay.js creates FormData
            │
            ▼
   HTTPS POST to Groq Whisper API
            │
            ▼
   Groq processes audio
            │
            ▼
   Response with transcription text
            │
            ▼
   overlay.js displays transcription
            │
            ▼
   overlay.js calls generateQuestions()
            │
            ▼
   HTTPS POST to Groq Chat API
            │
            ▼
   Response with questions
            │
            ▼
   overlay.js displays questions
```

## Communication Patterns

### PostMessage Communication (content.js ↔ overlay.js)

**Content → Overlay Messages**:
```javascript
{
  type: 'VIDEO_DETECTED',
  duration: 3600
}

{
  type: 'TIMESTAMP_ADDED',
  timestamp: {
    time: 120.5,
    formattedTime: '2:00',
    createdAt: '2025-10-25T...'
  }
}

{
  type: 'TIME_UPDATE',
  currentTime: 120.5,
  duration: 3600
}

{
  type: 'AUDIO_RECORDED',
  audioBlob: 'data:audio/webm;base64,...'
}
```

**Overlay → Content Messages**:
```javascript
{
  type: 'START_RECORDING'
}

{
  type: 'STOP_RECORDING'
}

{
  type: 'SEEK_TO',
  data: { time: 120.5 }
}
```

### Chrome Storage API

**Storage Structure**:
```javascript
{
  groqApiKey: 'gsk_xxxxxxxxxxxxx'
}
```

**Operations**:
- `chrome.storage.local.set()` - Save API key
- `chrome.storage.local.get()` - Retrieve API key

## API Integration

### Groq Whisper API (Transcription)

**Endpoint**: `https://api.groq.com/openai/v1/audio/transcriptions`

**Request**:
```
Method: POST
Headers:
  Authorization: Bearer {API_KEY}
Body: FormData
  - file: audio blob (WebM format)
  - model: whisper-large-v3
  - response_format: json
```

**Response**:
```javascript
{
  text: "This is the transcribed text..."
}
```

### Groq Chat API (Question Generation)

**Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

**Request**:
```
Method: POST
Headers:
  Authorization: Bearer {API_KEY}
  Content-Type: application/json
Body:
  {
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: "Based on this transcription, generate 5 questions..."
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  }
```

**Response**:
```javascript
{
  choices: [
    {
      message: {
        content: "1. Question one?\n2. Question two?..."
      }
    }
  ]
}
```

## Security Considerations

### Content Security Policy (CSP)

Manifest V3 enforces strict CSP:
- No inline scripts
- No eval() or Function()
- No remote code execution
- All code must be in extension package

### API Key Security

- Stored using Chrome's secure storage API
- Never exposed in console logs
- Input field type="password"
- Only sent to Groq API over HTTPS
- Not included in git repository

### Permissions

Minimal permissions requested:
- `activeTab`: Only active tab access
- `storage`: Only for API key
- `tabs`: Only for Google Drive detection
- Host permissions: Only drive.google.com

### Data Privacy

- No analytics or tracking
- No data collection
- Audio sent only to Groq (user's choice)
- No persistent storage of recordings
- All processing happens client-side or via user's API

## Performance Optimizations

### Lazy Loading

- Extension only activates on Google Drive
- Overlay created only when video detected
- API calls only when user requests

### Efficient DOM Operations

- Minimal DOM manipulations
- Event delegation where possible
- Debounced time updates

### Memory Management

- MediaRecorder streams properly closed
- Event listeners cleaned up
- Large data structures cleared after use

## Browser Compatibility

### Chrome/Edge (Manifest V3)

**Supported APIs**:
- MediaRecorder API
- Chrome Storage API
- Chrome Extension APIs
- PostMessage API
- Fetch API

**Minimum Versions**:
- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)

### Not Supported

- Firefox (uses WebExtensions API, different manifest)
- Safari (uses different extension system)
- Mobile browsers (limited extension support)

## Error Handling

### Graceful Degradation

1. **No API Key**: Timestamps and recording work, transcription disabled
2. **No Microphone**: Timestamps work, recording disabled
3. **API Failure**: User notified, can retry
4. **Network Issues**: Error messages shown, operations can be retried

### Error Messages

User-friendly messages for common issues:
- "Please set your Groq API key first!"
- "No audio recording available!"
- "Transcription failed: {error}"
- "Recording error: {error}"

## Extension Lifecycle

### Installation
1. User loads unpacked extension
2. `chrome.runtime.onInstalled` fires
3. Background service worker initializes
4. Extension icon appears in toolbar

### Activation
1. User opens Google Drive video
2. Content script injected into page
3. Video element detected
4. Overlay iframe created
5. UI initialized and shown

### Usage
1. User interacts with overlay
2. Messages passed between components
3. API calls made as needed
4. Results displayed in real-time

### Deactivation
1. User closes tab or navigates away
2. Content script context destroyed
3. Overlay removed from DOM
4. Session data lost (unless copied)

## Future Architecture Considerations

### Potential Enhancements

1. **Session Persistence**:
   - IndexedDB for local storage
   - Export/import functionality

2. **Multi-Platform Support**:
   - YouTube content script
   - Vimeo content script
   - Generic video player detection

3. **Backend Service**:
   - Optional cloud sync
   - Collaborative features
   - API key management

4. **Mobile Support**:
   - Responsive overlay design
   - Touch-friendly controls
   - Alternative to keyboard shortcuts

## Development Workflow

### Local Testing
1. Make code changes
2. Refresh extension in chrome://extensions/
3. Reload Google Drive page
4. Test changes
5. Check console for errors

### Debugging
- Browser DevTools (F12)
- Extension background page inspection
- Network tab for API calls
- Console for error messages

## Deployment

### Manual Installation
- Load unpacked from source folder
- Updates by refreshing extension

### Potential Distribution
- Chrome Web Store (requires review)
- GitHub Releases (ZIP download)
- Direct repository clone

---

This architecture is designed to be:
- ✅ Secure (minimal permissions, secure storage)
- ✅ Private (no data collection)
- ✅ Performant (lazy loading, efficient operations)
- ✅ Maintainable (clear separation of concerns)
- ✅ Extensible (modular design for future features)
