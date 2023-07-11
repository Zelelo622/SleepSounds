const sliders = document.querySelectorAll(".sliderAmbient");

const musicMap = {
  "slider-1": "assets/music/glue-rain.mp4",
  "slider-2": "assets/music/glue-thunder.mp4",
  "slider-3": "assets/music/main-fire.mp4",
};

function updateMusic(e) {
  const sliderId = e.target.id;
  const sliderValue = parseFloat(e.target.value);

  const musicContainer = document.querySelector(`#${sliderId}`).closest(".sound__item").querySelector(".sound__music");

  if (sliderValue !== 0) {
    const audioHTML = `<audio preload="auto" src="${musicMap[sliderId]}" loop></audio>`;
    musicContainer.innerHTML = audioHTML;
  }
}

sliders.forEach((slider) => {
  slider.addEventListener("input", updateMusic);
});
