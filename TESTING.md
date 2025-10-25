# Testing Checklist

Use this checklist to verify all features are working correctly.

## Pre-Installation Testing

- [ ] All files present in repository
- [ ] manifest.json is valid JSON
- [ ] All JavaScript files have valid syntax
- [ ] Icons are present (16px, 48px, 128px)
- [ ] Documentation files are complete

## Installation Testing

- [ ] Extension loads without errors in chrome://extensions/
- [ ] No error messages in extension details
- [ ] Extension icon appears in browser toolbar
- [ ] Clicking icon shows popup with instructions
- [ ] Developer mode works correctly

## Google Drive Video Detection

- [ ] Navigate to Google Drive
- [ ] Open a video file
- [ ] Overlay appears on right side of screen
- [ ] Overlay shows "Waiting for video..." or "Video detected!"
- [ ] Overlay displays correctly (no layout issues)
- [ ] Overlay is draggable/movable (if implemented)
- [ ] Refresh page - overlay reappears

## Video Synchronization

- [ ] Video time displays in overlay
- [ ] Time updates as video plays
- [ ] Format is correct (MM:SS or HH:MM:SS)
- [ ] Play/pause status updates in overlay
- [ ] Video progress syncs accurately

## Timestamp Feature

### Basic Functionality
- [ ] Press Spacebar → timestamp added
- [ ] Timestamp shows correct time
- [ ] Timestamp format is readable
- [ ] Multiple timestamps can be added
- [ ] Timestamps appear in order

### Edge Cases
- [ ] Spacebar doesn't work when in text field (expected behavior)
- [ ] Works when video is paused
- [ ] Works when video is playing
- [ ] Works at video start (0:00)
- [ ] Works at video end

### Navigation
- [ ] Click timestamp → video seeks to that time
- [ ] Seeking is accurate
- [ ] Multiple seeks work correctly
- [ ] Seeking works while playing
- [ ] Seeking works while paused

## Audio Recording

### Permissions
- [ ] First recording prompts for microphone permission
- [ ] Permission can be granted
- [ ] Permission can be denied (error shown)
- [ ] Permission persists after grant

### Recording Process
- [ ] Click "Start Recording" → recording starts
- [ ] Button changes to "Stop Recording"
- [ ] Status shows "Recording started..."
- [ ] Recording indicator appears
- [ ] Can record while video plays
- [ ] Can record while video paused

### Stopping Recording
- [ ] Click "Stop Recording" → recording stops
- [ ] Button changes back to "Start Recording"
- [ ] Status shows "Recording saved!"
- [ ] "Transcribe" button becomes enabled
- [ ] Microphone stream is properly closed

### Multiple Recordings
- [ ] Can start new recording after stopping
- [ ] Previous recording is replaced
- [ ] Each recording works correctly

### Edge Cases
- [ ] Very short recording (2-3 seconds)
- [ ] Medium recording (30-60 seconds)
- [ ] Long recording (2-3 minutes)
- [ ] Recording with silence
- [ ] Recording with background noise

## API Key Management

### Saving
- [ ] Enter API key in field
- [ ] Click "Save API Key"
- [ ] Success message appears
- [ ] Key is saved (persists after refresh)

### Loading
- [ ] Refresh page → API key still present
- [ ] Close tab, reopen → API key still present
- [ ] Field shows masked value (password input)

### Validation
- [ ] Empty key → appropriate message
- [ ] Invalid key → API call fails gracefully
- [ ] Valid key → API calls succeed

## Transcription

### Prerequisites
- [ ] API key is set
- [ ] Audio recording exists
- [ ] "Transcribe" button is enabled

### Process
- [ ] Click "Transcribe"
- [ ] Status shows "Transcribing audio..."
- [ ] Button becomes disabled during processing
- [ ] Network request visible in DevTools

### Success Case
- [ ] Transcription completes
- [ ] Text appears in transcription section
- [ ] Text is readable and formatted
- [ ] Status shows success message
- [ ] Questions generation starts automatically

### Error Cases
- [ ] Invalid API key → error message
- [ ] No internet → error message
- [ ] Silent audio → returns empty or error
- [ ] Network timeout → error message

## Question Generation

### Automatic Trigger
- [ ] Starts after transcription completes
- [ ] Status shows "Generating questions..."

### Success Case
- [ ] Questions appear in questions section
- [ ] 5 questions generated (typically)
- [ ] Questions are formatted correctly
- [ ] Questions are relevant to transcription
- [ ] Numbered list (1-5)

### Error Cases
- [ ] API error → error message shown
- [ ] Empty transcription → handled gracefully
- [ ] Network error → error message

## User Interface

### Layout
- [ ] All sections visible without scrolling (or scroll works)
- [ ] Buttons are properly sized
- [ ] Text is readable
- [ ] Colors are appropriate
- [ ] Icons display correctly

### Responsiveness
- [ ] Overlay resizes appropriately
- [ ] Scrolling works in long lists
- [ ] Timestamps section scrolls if many items
- [ ] Transcription section scrolls if long text
- [ ] Questions section scrolls if needed

### Interactions
- [ ] Buttons have hover effects
- [ ] Buttons show feedback on click
- [ ] Status messages appear/disappear
- [ ] Loading states are clear
- [ ] Error states are clear

## Browser Compatibility

### Chrome
- [ ] Works on Chrome 88+
- [ ] All features functional
- [ ] No console errors
- [ ] Performance is good

### Edge
- [ ] Works on Edge 88+
- [ ] All features functional
- [ ] No console errors
- [ ] Performance is good

### Other Chromium Browsers
- [ ] Brave browser (if available)
- [ ] Opera (if available)

## Performance

### Load Time
- [ ] Extension loads quickly
- [ ] Overlay appears promptly
- [ ] No noticeable lag

### Runtime
- [ ] Video playback not affected
- [ ] Smooth timestamp addition
- [ ] Responsive controls
- [ ] No memory leaks (check DevTools)

### API Calls
- [ ] Transcription completes in reasonable time
- [ ] Question generation is timely
- [ ] No unnecessary API calls

## Error Handling

### User Errors
- [ ] Missing API key → helpful message
- [ ] No recording → helpful message
- [ ] No microphone → helpful message

### System Errors
- [ ] Network failure → error shown
- [ ] API error → error shown
- [ ] Permissions denied → error shown

### Recovery
- [ ] Can retry after error
- [ ] Can fix API key and retry
- [ ] Can grant permissions and retry

## Data Persistence

### Session Persistence
- [ ] API key persists across sessions
- [ ] Timestamps lost on refresh (expected)
- [ ] Recording lost on refresh (expected)

### Privacy
- [ ] No data sent except to Groq API
- [ ] No tracking or analytics
- [ ] API key not logged to console

## Edge Cases

### Video-Related
- [ ] Very short video (<10 seconds)
- [ ] Very long video (>1 hour)
- [ ] Multiple videos in same session
- [ ] Switch between videos

### User Actions
- [ ] Rapid timestamp addition (spam Spacebar)
- [ ] Start/stop recording quickly
- [ ] Multiple transcription requests
- [ ] Closing tab during recording

### Environment
- [ ] Incognito mode
- [ ] Multiple tabs with videos
- [ ] Browser restart
- [ ] System restart

## Documentation Testing

- [ ] README is clear and helpful
- [ ] INSTALL guide works step-by-step
- [ ] QUICKSTART gets user going quickly
- [ ] EXAMPLES are relevant
- [ ] FAQ answers common questions
- [ ] All links work
- [ ] Code examples are correct

## Final Verification

### Complete Workflow
1. [ ] Install extension
2. [ ] Get API key
3. [ ] Open Google Drive video
4. [ ] Add 3-5 timestamps with Spacebar
5. [ ] Start recording
6. [ ] Speak for 30 seconds
7. [ ] Stop recording
8. [ ] Click transcribe
9. [ ] Review transcription
10. [ ] Review questions
11. [ ] Click a timestamp to seek

### Quality Checks
- [ ] No console errors
- [ ] No console warnings
- [ ] All features work as expected
- [ ] UI is polished
- [ ] Documentation is accurate

## Test Results

**Date**: _____________

**Tester**: _____________

**Browser**: _____________

**Version**: _____________

**Overall Status**: ⬜ Pass  ⬜ Fail  ⬜ Partial

**Notes**:
_____________________________________________________
_____________________________________________________
_____________________________________________________

**Issues Found**:
1. _____________________________________________________
2. _____________________________________________________
3. _____________________________________________________

**Recommendations**:
_____________________________________________________
_____________________________________________________
_____________________________________________________

---

## Automated Testing (Future)

Potential test automation:
- [ ] Unit tests for utility functions
- [ ] Integration tests for API calls
- [ ] E2E tests for complete workflow
- [ ] Performance benchmarks
- [ ] Cross-browser testing

For now, manual testing using this checklist is recommended.
