// Content script for Google Drive video detection and overlay injection

let videoElement = null;
let overlayIframe = null;
let timestamps = [];
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];

// Initialize the overlay
function initializeOverlay() {
  console.log('Initializing Video Timestamp Overlay');
  
  // Find video element
  detectVideoElement();
  
  // Create overlay
  createOverlay();
  
  // Setup keyboard listener
  setupKeyboardListener();
  
  // Monitor for video element changes
  const observer = new MutationObserver(() => {
    if (!videoElement || !document.contains(videoElement)) {
      detectVideoElement();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function detectVideoElement() {
  // Google Drive uses HTML5 video element
  const video = document.querySelector('video');
  
  if (video && video !== videoElement) {
    videoElement = video;
    console.log('Video element detected:', videoElement);
    
    // Listen to video events
    videoElement.addEventListener('play', onVideoPlay);
    videoElement.addEventListener('pause', onVideoPause);
    videoElement.addEventListener('timeupdate', onTimeUpdate);
    
    sendMessageToOverlay({ type: 'VIDEO_DETECTED', duration: videoElement.duration });
  }
}

function createOverlay() {
  if (overlayIframe) return;
  
  overlayIframe = document.createElement('iframe');
  overlayIframe.id = 'timestamp-overlay';
  overlayIframe.src = chrome.runtime.getURL('overlay.html');
  overlayIframe.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 400px;
    height: 600px;
    border: 2px solid #4285f4;
    border-radius: 8px;
    z-index: 999999;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(overlayIframe);
  
  // Listen for messages from overlay
  window.addEventListener('message', handleOverlayMessage);
}

function setupKeyboardListener() {
  document.addEventListener('keydown', (e) => {
    // Spacebar to add timestamp
    if (e.code === 'Space' && !isInputFocused()) {
      e.preventDefault();
      addTimestamp();
    }
  });
}

function isInputFocused() {
  const activeElement = document.activeElement;
  return activeElement && (
    activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA' ||
    activeElement.isContentEditable
  );
}

function addTimestamp() {
  if (!videoElement) return;
  
  const currentTime = videoElement.currentTime;
  const timestamp = {
    time: currentTime,
    formattedTime: formatTime(currentTime),
    createdAt: new Date().toISOString()
  };
  
  timestamps.push(timestamp);
  
  sendMessageToOverlay({
    type: 'TIMESTAMP_ADDED',
    timestamp: timestamp
  });
  
  console.log('Timestamp added:', timestamp);
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function onVideoPlay() {
  sendMessageToOverlay({ type: 'VIDEO_PLAY' });
}

function onVideoPause() {
  sendMessageToOverlay({ type: 'VIDEO_PAUSE' });
}

function onTimeUpdate() {
  if (videoElement) {
    sendMessageToOverlay({
      type: 'TIME_UPDATE',
      currentTime: videoElement.currentTime,
      duration: videoElement.duration
    });
  }
}

function sendMessageToOverlay(message) {
  if (overlayIframe && overlayIframe.contentWindow) {
    overlayIframe.contentWindow.postMessage(message, '*');
  }
}

function handleOverlayMessage(event) {
  // Only accept messages from our overlay
  if (event.source !== overlayIframe?.contentWindow) return;
  
  const { type, data } = event.data;
  
  switch (type) {
    case 'START_RECORDING':
      startRecording();
      break;
    case 'STOP_RECORDING':
      stopRecording();
      break;
    case 'SEEK_TO':
      if (videoElement) {
        videoElement.currentTime = data.time;
      }
      break;
    case 'GET_TIMESTAMPS':
      sendMessageToOverlay({
        type: 'TIMESTAMPS_DATA',
        timestamps: timestamps
      });
      break;
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    
    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });
    
    mediaRecorder.addEventListener('stop', async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      // Send audio for transcription
      sendMessageToOverlay({
        type: 'AUDIO_RECORDED',
        audioBlob: await blobToBase64(audioBlob)
      });
      
      // Stop all tracks
      stream.getTracks().forEach(track => track.stop());
    });
    
    mediaRecorder.start();
    isRecording = true;
    
    sendMessageToOverlay({ type: 'RECORDING_STARTED' });
    console.log('Recording started');
  } catch (error) {
    console.error('Error starting recording:', error);
    sendMessageToOverlay({
      type: 'RECORDING_ERROR',
      error: error.message
    });
  }
}

function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    console.log('Recording stopped');
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOverlay);
} else {
  initializeOverlay();
}
