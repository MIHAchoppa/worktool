// Overlay UI logic

let timestamps = [];
let isRecording = false;
let hasRecording = false;
let audioBlob = null;
let transcriptionText = '';
let apiKey = '';

// DOM elements
const recordBtn = document.getElementById('recordBtn');
const transcribeBtn = document.getElementById('transcribeBtn');
const timestampsList = document.getElementById('timestampsList');
const transcription = document.getElementById('transcription');
const questionsList = document.getElementById('questionsList');
const statusMessage = document.getElementById('statusMessage');
const videoStatus = document.getElementById('videoStatus');
const videoTime = document.getElementById('videoTime');
const apiKeyInput = document.getElementById('apiKey');
const saveApiKeyBtn = document.getElementById('saveApiKey');

// Load API key from storage
chrome.storage.local.get(['groqApiKey'], (result) => {
  if (result.groqApiKey) {
    apiKey = result.groqApiKey;
    apiKeyInput.value = apiKey;
  }
});

// Save API key
saveApiKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    apiKey = key;
    chrome.storage.local.set({ groqApiKey: key }, () => {
      showStatus('API Key saved successfully!', false);
    });
  }
});

// Event listeners
recordBtn.addEventListener('click', toggleRecording);
transcribeBtn.addEventListener('click', transcribeAudio);

function toggleRecording() {
  if (!isRecording) {
    startRecording();
  } else {
    stopRecording();
  }
}

function startRecording() {
  sendMessageToContent({ type: 'START_RECORDING' });
}

function stopRecording() {
  sendMessageToContent({ type: 'STOP_RECORDING' });
}

async function transcribeAudio() {
  if (!apiKey) {
    showStatus('Please set your Groq API key first!', true);
    return;
  }

  if (!audioBlob) {
    showStatus('No audio recording available!', true);
    return;
  }

  showStatus('Transcribing audio...', false);
  transcribeBtn.disabled = true;

  try {
    // Convert base64 to blob
    const base64Data = audioBlob.split(',')[1];
    const binaryData = atob(base64Data);
    const bytes = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'audio/webm' });

    // Create FormData for Groq API
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
    formData.append('model', 'whisper-large-v3');
    formData.append('response_format', 'json');

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    transcriptionText = data.text;

    // Display transcription
    transcription.textContent = transcriptionText;
    
    showStatus('Transcription completed!', false);

    // Generate questions about the video
    await generateQuestions();

  } catch (error) {
    console.error('Transcription error:', error);
    showStatus(`Transcription failed: ${error.message}`, true);
    transcribeBtn.disabled = false;
  }
}

async function generateQuestions() {
  if (!apiKey || !transcriptionText) return;

  showStatus('Generating questions...', false);

  try {
    const prompt = `Based on the following video transcription, generate 5 thoughtful questions that would help someone understand and remember the key points discussed:

Transcription:
${transcriptionText}

Please provide exactly 5 questions, one per line.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const questionsText = data.choices[0].message.content;

    // Parse and display questions
    const questions = questionsText
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(q => q.length > 0);

    displayQuestions(questions);
    showStatus('Questions generated!', false);

  } catch (error) {
    console.error('Question generation error:', error);
    showStatus(`Question generation failed: ${error.message}`, true);
  } finally {
    transcribeBtn.disabled = false;
  }
}

function displayQuestions(questions) {
  questionsList.innerHTML = '';
  
  if (questions.length === 0) {
    questionsList.innerHTML = '<div class="empty-state">No questions generated</div>';
    return;
  }

  questions.forEach((question, index) => {
    const item = document.createElement('div');
    item.className = 'question-item';
    item.textContent = `${index + 1}. ${question}`;
    questionsList.appendChild(item);
  });
}

function addTimestamp(timestamp) {
  timestamps.push(timestamp);
  updateTimestampsList();
}

function updateTimestampsList() {
  if (timestamps.length === 0) {
    timestampsList.innerHTML = '<div class="empty-state">No timestamps yet. Press Spacebar to add.</div>';
    return;
  }

  timestampsList.innerHTML = '';
  
  timestamps.forEach((ts, index) => {
    const item = document.createElement('div');
    item.className = 'timestamp-item';
    item.innerHTML = `
      <span class="timestamp-time">#${index + 1} - ${ts.formattedTime}</span>
      <span style="font-size: 11px; color: #5f6368;">Click to seek</span>
    `;
    
    item.addEventListener('click', () => {
      sendMessageToContent({
        type: 'SEEK_TO',
        data: { time: ts.time }
      });
    });
    
    timestampsList.appendChild(item);
  });
}

function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.className = isError ? 'status recording' : 'status';
  statusMessage.style.display = 'block';
  
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 3000);
}

function sendMessageToContent(message) {
  window.parent.postMessage(message, '*');
}

// Listen for messages from content script
window.addEventListener('message', (event) => {
  const { type, timestamp, currentTime, duration, audioBlob: recordedAudio } = event.data;
  
  switch (type) {
    case 'VIDEO_DETECTED':
      videoStatus.textContent = 'Video detected!';
      break;
      
    case 'VIDEO_PLAY':
      videoStatus.textContent = 'Playing';
      break;
      
    case 'VIDEO_PAUSE':
      videoStatus.textContent = 'Paused';
      break;
      
    case 'TIME_UPDATE':
      if (currentTime !== undefined) {
        videoTime.textContent = ` - ${formatTime(currentTime)} / ${formatTime(duration)}`;
      }
      break;
      
    case 'TIMESTAMP_ADDED':
      addTimestamp(timestamp);
      showStatus(`Timestamp added at ${timestamp.formattedTime}`, false);
      break;
      
    case 'RECORDING_STARTED':
      isRecording = true;
      hasRecording = false;
      recordBtn.textContent = '⏹️ Stop Recording';
      recordBtn.className = 'btn-danger';
      showStatus('Recording started...', false);
      break;
      
    case 'AUDIO_RECORDED':
      isRecording = false;
      hasRecording = true;
      audioBlob = recordedAudio;
      recordBtn.textContent = '🎤 Start Recording';
      recordBtn.className = 'btn-primary';
      transcribeBtn.disabled = false;
      showStatus('Recording saved! Click Transcribe to process.', false);
      break;
      
    case 'RECORDING_ERROR':
      isRecording = false;
      recordBtn.textContent = '🎤 Start Recording';
      recordBtn.className = 'btn-primary';
      showStatus(`Recording error: ${event.data.error}`, true);
      break;
  }
});

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Request initial data
sendMessageToContent({ type: 'GET_TIMESTAMPS' });
