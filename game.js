const images = [
  "https://pngfre.com/wp-content/uploads/doraemon-png-image-from-pngfre-40.png",
  "https://www.freepnglogos.com/uploads/doraemon-png/cartoon-characters-girl-doraemon-new-png-images-1.png",
  "https://www.freepnglogos.com/uploads/doraemon-png/pink-dress-girl-cartoon-characters-doraemon-26.png",
  "https://pngfre.com/wp-content/uploads/doraemon-png-image-from-pngfre-37.png",
  "https://upload.wikimedia.org/wikipedia/en/3/3f/NobitaNobi.png",
  "https://www.freepnglogos.com/uploads/doraemon-png/cartoon-characters-doraemon-girl-hello-18.png",
  "https://pngfre.com/wp-content/uploads/nobita-nobi-41-222x300.png",
  "https://upload.wikimedia.org/wikipedia/en/9/95/Suneo_Honekawa.png",
];

let h = "❤️️❤️️❤️️";
let lives = 3;

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let score = 0;
let timer;
let i = 0;
let start_img = document.getElementById("start-img");
let wrong = 1;

function startGame() {
  updateLivesDisplay();
  start_img.style.display = "none";
  for (i = 0; i < 15; i++) {
    displayScore();
    displayQuestion();
    document.getElementById("sadimg").style.display = "none";
  }
}

function displayQuestion() {
  var random = images[Math.floor(Math.random() * images.length)];
  let image_container = document.getElementById("image-container");
  image_container.innerHTML = `<img src="${random}" style="height:500px ; margin-left:30px" >`;
  const question = document.getElementById("question");
  const charCircle = document.getElementById("char-circle");

  const randomLetter = alphabet.charAt(
    Math.floor(Math.random() * alphabet.length)
  );
  question.textContent = "Guess the alphabet:";
  charCircle.style.color = "white";
  charCircle.textContent = randomLetter;
  start_img.style.display = "none";

  document.getElementById("sadimg").style.display = "none";

  charCircle.style.backgroundColor = getRandomColor();
  charCircle.style.display = "inline-block";

  document.getElementById("answer").value = "";
  document.getElementById("result").textContent = "";

  document.getElementById("answer").style.display = "inline-block";
  document.getElementById("question").style.display = "block";

  clearTimeout(timer);
  timer = setTimeout(displayQuestion, 3000);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById("play-btn").addEventListener("click", function () {
  score = 0;
  displayScore();
  displayQuestion();
  document.getElementById("sadimg").style.display = "none";

  document.getElementById("play-btn").style.display = "none";
});

document.getElementById("answer").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toUpperCase();
  const questionText = document.getElementById("question").textContent;

  if (questionText.includes("number")) {
    if (!isNaN(answer)) {
      const num = parseInt(answer, 10);
      if (
        num === parseInt(document.getElementById("char-circle").textContent, 10)
      ) {
        score++;
        displayScore();
        displayResult("Hurray! Correct!");
      } else {
        displayResult("Oops Wrong!!");

        endGame();
        removeHeart();
      }
    } else {
      displayResult("Oops Wrong!!");

      endGame();
      removeHeart();
    }
  } else {
    if (answer.length > 0 && alphabet.includes(answer)) {
      const letter = document.getElementById("char-circle").textContent;
      if (answer === letter) {
        score++;
        displayScore();
        displayResult("Hurray! Correct!");
      } else {
        displayResult("Oops Wrong!!");

        endGame();
        removeHeart();
      }
    } else {
      displayResult("Oops Wrong!!");
      endGame();
      removeHeart();
    }
  }
}

function displayResult(message) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = message;
  resultElement.style.display = "block";
  resultElement.classList.add("enlarge");

  if (message === "Hurray! Correct!") {
    resultElement.style.color = "black";

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  if (message === "Oops Wrong!!") {
    resultElement.style.color = "red";
    const heart = document.createElement("span");
    heart.classList.add("heart-broken");
    heart.textContent = "💔";
    heart.style.left = resultElement.getBoundingClientRect().left + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.style.transform = "translateY(100vh)";
      heart.style.opacity = "0";
    }, 100);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }

  setTimeout(() => {
    resultElement.classList.remove("enlarge");
  }, 300);
}

function endGame() {
  lives--;
  if (lives === 0) {
    clearTimeout(timer);
    document.getElementById("result").textContent =
      "Game Over. Click Play Game to play again.";
    document.getElementById("sadimg").style.display = "inline";
    document.getElementById("play-btn").style.display = "inline-block";
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("char-circle").style.display = "none";
    document.getElementById("answer").style.display = "none";
  } else if (lives === 1) {
    h = "❤️️💔💔";
    document.getElementById("score").innerHTML = `Score: ${score} <br> ${h}`;
  } else if (lives === 2) {
    h = "❤️️❤️️💔";
    document.getElementById("score").innerHTML = `Score: ${score} <br> ${h}`;
  } else {
  }
}

function displayScore() {
  document.getElementById("score").innerHTML = `Score: ${score} <br> ${h}`;
  document.getElementById("score").style.display = "block";
}

function removeHeart() {
  if (lives > 0) {
    const heartContainer = document.getElementById("heart-container");
    const heart = heartContainer.lastChild;
    heart.style.animation = "fallAndFade 1s forwards";
    setTimeout(() => {
      heartContainer.removeChild(heart);
    }, 1000);

    lives--;
  }
  if (lives === 0) {
    endGame();
    h = "❤️️❤️️❤️️";
  }
}
