const sliders = document.querySelectorAll(".sliderAmbient");
const playBtn = document.querySelector("#playMainBtn");
const playBtnIcon = document.querySelector(
  "#playMainBtn .play, #playMainBtn .pause"
);
const globalVolumeSlider = document.querySelector("#globalVolumeSlider");
const globalVolumeBtn = document.querySelector("#globalVolumeBtn");

const musicMap = {
  "slider-1": "assets/music/glue-rain.mp4",
  "slider-2": "assets/music/glue-thunder.mp4",
  "slider-3": "assets/music/main-fire.mp4",
  "slider-4": "assets/music/main-crickets.mp4",
};

let soundMusicElements = [];
let globalVolume = 1;

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
  audioElement.volume = sliderValue * globalVolume;

  if (playBtnIcon.classList.contains("pause")) {
    audioElement.play();
  }
  if (globalVolumeBtn.textContent === "Включить звук") {
    audioElement.muted = true;
  }
}

function updateGlobalVolume() {
  let globalVolume = parseFloat(globalVolumeSlider.value);

  soundMusicElements.forEach((audio) => {
    audio.volume =
      (audio.volume / globalVolumeSlider.previousGlobalVolume) * globalVolume;
  });
  globalVolumeSlider.previousGlobalVolume = globalVolume;
}

let isMuted = false;
function muteVolume() {
  isMuted = !isMuted; 

  if (isMuted) {
    globalVolumeBtn.textContent = "Включить звук";
    soundMusicElements.forEach((audio) => {
      audio.muted = true; 
    });
  } else {
    globalVolumeBtn.textContent = "Отключить звук";
    soundMusicElements.forEach((audio) => {
      audio.muted = false; 
    });
  }
}

sliders.forEach((slider) => {
  slider.addEventListener("input", updateMusic);
});

globalVolumeBtn.addEventListener("click", muteVolume);

globalVolumeSlider.addEventListener("input", updateGlobalVolume);
globalVolumeSlider.previousGlobalVolume = globalVolume;

playBtn.addEventListener("click", playMusic);
