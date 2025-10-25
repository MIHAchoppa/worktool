// Background service worker

chrome.runtime.onInstalled.addListener(() => {
  console.log('Video Timestamp & Transcription Tool installed');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SAVE_DATA') {
    chrome.storage.local.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.type === 'GET_DATA') {
    chrome.storage.local.get(request.keys, (result) => {
      sendResponse(result);
    });
    return true;
  }
});
