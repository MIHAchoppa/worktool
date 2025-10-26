# Installation Guide

This guide walks you through installing and setting up the Video Timestamp & Transcription Tool.

## Step-by-Step Installation

### Step 1: Download the Extension

**Option A: Clone with Git**
```bash
git clone https://github.com/MIHAchoppa/worktool.git
cd worktool
```

**Option B: Download ZIP**
1. Go to https://github.com/MIHAchoppa/worktool
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to a location on your computer

### Step 2: Open Chrome Extensions Page

1. Open Google Chrome or Microsoft Edge
2. Type in the address bar:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Press Enter

### Step 3: Enable Developer Mode

1. Look for "Developer mode" toggle in the top-right corner
2. Click to enable it
3. You should see additional buttons appear

### Step 4: Load the Extension

1. Click the "Load unpacked" button
2. Navigate to the folder where you extracted/cloned the repository
3. Select the `worktool` folder (the one containing `manifest.json`)
4. Click "Select Folder" or "Open"

### Step 5: Verify Installation

You should see the extension appear in your extensions list:
- **Name**: Video Timestamp & Transcription Tool
- **Version**: 1.0.0
- **Icon**: Blue square with video camera icon

### Step 6: Get Groq API Key

1. Visit https://console.groq.com/
2. Sign up for a free account (or log in if you have one)
3. Navigate to the "API Keys" section
4. Click "Create API Key"
5. Give it a name (e.g., "Video Timestamp Tool")
6. **Important**: Copy the API key immediately - you won't be able to see it again!
7. The key starts with `gsk_`

### Step 7: Test the Extension

1. Go to Google Drive (https://drive.google.com/)
2. Open any video file
3. You should see the overlay panel appear on the right side of the screen
4. The overlay should show "Waiting for video..." or "Video detected!"

### Step 8: Configure API Key

1. In the overlay panel, find the "Groq API Configuration" section
2. Paste your API key in the input field
3. Click "Save API Key"
4. You should see a success message

## Verification Checklist

After installation, verify these items:

- [ ] Extension appears in `chrome://extensions/`
- [ ] Extension toggle is ON (enabled)
- [ ] No error messages in the extension details
- [ ] Video overlay appears on Google Drive video pages
- [ ] Spacebar adds timestamps
- [ ] Recording button is clickable
- [ ] API key is saved and shows success message

## Common Installation Issues

### Issue: "Load unpacked" button not visible

**Solution**: 
- Make sure Developer mode is enabled
- Look in the top-right corner for the toggle
- Refresh the extensions page

### Issue: Extension loads but shows errors

**Solution**:
- Click "Details" on the extension
- Check for error messages
- Verify all files are present in the folder
- Try removing and re-loading the extension

### Issue: Overlay doesn't appear on Google Drive

**Solution**:
- Refresh the Google Drive page
- Make sure you're viewing a video file (not just a folder)
- Check browser console (F12) for errors
- Verify extension is enabled
- Try opening a different video

### Issue: Can't save API key

**Solution**:
- Check that you copied the complete key (starts with `gsk_`)
- Make sure you clicked "Save API Key" button
- Check browser console for storage errors
- Try clearing Chrome storage and re-entering

## Browser Compatibility

### Supported Browsers
- ✅ Google Chrome (version 88+)
- ✅ Microsoft Edge (version 88+)
- ✅ Brave Browser (Chromium-based)
- ✅ Opera (Chromium-based)

### Not Supported
- ❌ Firefox (uses different extension format)
- ❌ Safari (uses different extension format)
- ❌ Internet Explorer (obsolete)

## Permissions Explained

When you load the extension, it requests these permissions:

1. **activeTab**: To interact with the current Google Drive tab
   - Why needed: To inject the overlay and detect video elements

2. **storage**: To save your API key and settings
   - Why needed: To remember your API key between sessions

3. **tabs**: To detect when you're on a Google Drive page
   - Why needed: To only activate on Google Drive videos

4. **host_permissions for drive.google.com**: To run on Google Drive
   - Why needed: To work specifically with Google Drive videos

All permissions are standard and safe for this type of extension.

## First-Time Setup

After installation, follow these steps for first use:

### 1. Prepare a Test Video

- Upload a short video to Google Drive (or use an existing one)
- Open the video in Google Drive viewer
- The overlay should appear automatically

### 2. Test Timestamp Feature

- Play the video
- Press the Spacebar key
- You should see "Timestamp added at X:XX" message
- Timestamp should appear in the list

### 3. Test Recording

- Click "🎤 Start Recording"
- Grant microphone permission when prompted
- Speak for a few seconds
- Click "⏹️ Stop Recording"
- Button should change back to "Start Recording"

### 4. Test Transcription

- After recording, click "📝 Transcribe"
- Wait for the transcription to complete
- Text should appear in the Transcription section
- Questions should be generated below

## Updating the Extension

To update to a newer version:

1. Download the new version
2. Extract to the same location (or a new one)
3. Go to `chrome://extensions/`
4. Click the refresh icon on the extension card
5. Or remove the old version and load the new one

## Uninstallation

To remove the extension:

1. Go to `chrome://extensions/`
2. Find the "Video Timestamp & Transcription Tool"
3. Click "Remove"
4. Confirm the removal
5. Your API key and data will be deleted from browser storage

## Data and Privacy

### What's Stored Locally
- Your Groq API key (encrypted by Chrome)
- Extension settings

### What's Sent to External Services
- Audio recordings (to Groq API for transcription)
- Transcription text (to Groq API for question generation)

### What's NOT Collected
- No usage analytics
- No personal information
- No video content
- No viewing history

All data processing happens locally in your browser or through the Groq API (which you control with your API key).

## Getting Help

If you encounter issues:

1. **Check the README**: Contains common troubleshooting tips
2. **Check EXAMPLES.md**: See usage examples
3. **Browser Console**: Press F12 and check for error messages
4. **GitHub Issues**: Report bugs or ask questions
5. **Extension Details**: Click "Details" in chrome://extensions/ to see error logs

## Next Steps

After successful installation:

1. ✅ Read the [README.md](README.md) for feature overview
2. ✅ Check [EXAMPLES.md](EXAMPLES.md) for usage patterns
3. ✅ Review [SETUP.md](SETUP.md) for development info
4. ✅ Start using the tool with your videos!

## Success Indicators

You've successfully installed the extension when:

✅ Extension appears in chrome://extensions/ without errors
✅ Overlay panel appears on Google Drive videos
✅ Spacebar adds timestamps while watching video
✅ Recording starts and stops correctly
✅ Transcription works with your API key
✅ Questions are generated from transcription

Congratulations! You're ready to use the Video Timestamp & Transcription Tool.
