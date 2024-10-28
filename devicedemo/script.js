let isHomeScreen = true; // Start at home screen
let startY = 0;

// Screen elements
const loginScreen = document.getElementById('login-screen');
const homeScreen = document.getElementById('home-screen');
const clockScreen = document.getElementById('clock-screen');
const settingsScreen = document.getElementById('settings-screen');
const messageScreen = document.getElementById('message-screen');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const closeButton = document.getElementById('close-button');

// Set up clock
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock(); // initial call

// Handle swipe events
document.addEventListener('mousedown', startSwipe);
document.addEventListener('mouseup', endSwipe);
document.addEventListener('touchstart', startSwipe);
document.addEventListener('touchend', endSwipe);

function startSwipe(e) {
    if (!isHomeScreen) {
        startY = e.clientY || e.touches[0].clientY;
        document.addEventListener('mousemove', moveSwipe);
        document.addEventListener('touchmove', moveSwipe);
    }
}

function moveSwipe(e) {
    const currentY = e.clientY || e.touches[0].clientY;
    if (startY - currentY > 50) { // Swipe up detection
        transitionToHome();
    }
}

function endSwipe() {
    document.removeEventListener('mousemove', moveSwipe);
    document.removeEventListener('touchmove', moveSwipe);
}

// Transition to home screen
function transitionToHome() {
    isHomeScreen = true;
    homeScreen.style.transform = 'translateY(0)';
    clockScreen.style.transform = 'translateY(100%)';
    settingsScreen.style.transform = 'translateY(100%)';
    messageScreen.style.transform = 'translateY(100%)';
}

// App navigation
function navigateToApp(app) {
    isHomeScreen = false;
    homeScreen.style.transform = 'translateY(100%)';
    app.style.transform = 'translateY(0)';
}

// Event listeners for app clicks
document.getElementById('clock-app').addEventListener('click', () => navigateToApp(clockScreen));
document.getElementById('settings-app').addEventListener('click', () => {
    navigateToApp(settingsScreen);
    document.getElementById('phone-specs').textContent = `Phone Specs: 
    - Model: Phone 2024
    - OS: Custom OS 1.0
    - Storage: 128GB
    - RAM: 4GB`;
});
document.getElementById('message-app').addEventListener('click', () => navigateToApp(messageScreen));

// Back buttons for apps
document.getElementById('back-to-home-clock').addEventListener('click', transitionToHome);
document.getElementById('back-to-home-settings').addEventListener('click', transitionToHome);
document.getElementById('back-to-home-messages').addEventListener('click', transitionToHome);

// Sending messages in the message app
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `You: ${message}`;
        chatWindow.appendChild(messageDiv);
        messageInput.value = '';
    }
});

closeButton.addEventListener('click', () => {
    messageInput.value = '';
    chatWindow.innerHTML = '';
});
