const sliders = document.querySelectorAll(".sliderAmbient");
const playBtn = document.querySelector("#playMainBtn");
const playBtnIcon = document.querySelector(
  "#playMainBtn .play, #playMainBtn .pause"
);

const musicMap = {
  "slider-1": "assets/music/glue-rain.mp4",
  "slider-2": "assets/music/glue-thunder.mp4",
  "slider-3": "assets/music/main-fire.mp4",
};

let soundMusicElements = [];

function playMusic() {
  if (playBtnIcon.classList.contains("pause")) {
    playBtnIcon.classList.remove("pause");
    playBtnIcon.classList.add("play");
    soundMusicElements.forEach((audio) => audio.pause());
  } else {
    playBtnIcon.classList.remove("play");
    playBtnIcon.classList.add("pause");
    soundMusicElements.forEach((audio) => audio.play());
  }
}

function updateMusic(e) {
  const sliderId = e.target.id;
  const sliderValue = parseFloat(e.target.value);

  const musicContainer = document
    .querySelector(`#${sliderId}`)
    .closest(".sound__item")
    .querySelector(".sound__music");

  let audioElement = musicContainer.querySelector("audio");

  if (!audioElement) {
    const audioHTML = `<audio preload="auto" src="${musicMap[sliderId]}" loop></audio>`;
    musicContainer.innerHTML = audioHTML;
    audioElement = musicContainer.querySelector("audio");
    soundMusicElements.push(audioElement);
  }
  audioElement.volume = sliderValue;

  if (playBtnIcon.classList.contains("pause")) {
    audioElement.play();
  }
}

sliders.forEach((slider) => {
  slider.addEventListener("input", updateMusic);
});

playBtn.addEventListener("click", playMusic);
