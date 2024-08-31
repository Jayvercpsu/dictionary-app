const words = {
    easy: ["computer", "network", "internet", "keyboard", "mouse", "software", "data", "email", "server", "browser"],
    normal: ["database", "programming", "algorithm", "hardware", "server", "coding", "security", "networking", "protocol", "application"],
    hard: ["cryptography", "virtualization", "microprocessor", "multithreading", "authentication", "cloudcomputing", "datamining", "machinelearning", "scalability", "webservices"],
    funny: ["bayot", "bati kag nawong", "pisot ang ga type", "walay ligo", "bahug ilok", "bahung kuging", "nawong nimo murag potyokan", "kalagot kaayo", "dili ko ganahan", "nagmahay"]
  };
  
  let currentWord = "";
  let score = 0;
  let timeLeft = 0;
  let timer;
  let nickname = "";
  
  const wordBox = document.getElementById('word-box');
  const wordDisplay = document.getElementById('word');
  const inputBox = document.getElementById('input-box');
  const scoreDisplay = document.getElementById('score');
  const timeLeftDisplay = document.getElementById('time-left');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const resetBtn = document.getElementById('reset-btn');
  const nicknameInput = document.getElementById('nickname');
  const leaderboardList = document.getElementById('leaderboard-list');
  
  function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    const duration = document.getElementById('duration').value;
    timeLeft = parseInt(duration);
    timeLeftDisplay.textContent = timeLeft;
    inputBox.value = "";
    inputBox.disabled = false;
    inputBox.focus();
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    generateWord();
    timer = setInterval(updateTime, 1000);
  }
  
  function generateWord() {
    const difficulty = document.getElementById('difficulty').value;
    const wordsArray = words[difficulty];
    currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    wordDisplay.textContent = currentWord;
  }
  
  function updateTime() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }
  
  function endGame() {
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    inputBox.disabled = true;
    nickname = nicknameInput.value.trim() || "Player";
    updateLeaderboard();
    nicknameInput.value = ""; // Clear the nickname input for the new game
  }
  
  function stopGame() {
    clearInterval(timer);
    endGame();
  }
  
  function cancelGame() {
    clearInterval(timer);
    score = 0;
    timeLeft = 0;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
    inputBox.value = "";
    inputBox.disabled = true;
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    nicknameInput.disabled = false;
  }
  
  function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeLeft = 0;
    timeLeftDisplay.textContent = timeLeft;
    inputBox.value = "";
    inputBox.disabled = true;
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    nicknameInput.disabled = false;
    leaderboardList.innerHTML = "";
  }
  
  function updateLeaderboard() {
    const listItem = document.createElement('li');
    listItem.textContent = `${nickname}: ${score}`;
    listItem.classList.add('list-group-item');
    leaderboardList.appendChild(listItem);
  }
  
  inputBox.addEventListener('input', () => {
    if (inputBox.value.toLowerCase() === currentWord.toLowerCase()) {
      score++;
      scoreDisplay.textContent = score;
      inputBox.value = "";
      generateWord();
    }
  });
  
  startBtn.addEventListener('click', startGame);
  stopBtn.addEventListener('click', stopGame);
  cancelBtn.addEventListener('click', cancelGame);
  resetBtn.addEventListener('click', resetGame);
  