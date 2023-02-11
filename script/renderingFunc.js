import {
  sugestedHeroContainer,
  closingHeroStatsModal,
  addingHeroToTeam,
  searchModal,
  selectedHeroesInfoModal,
  toggleingAddHeroBtn,
} from "./script.js";

const heroImgModal = document.querySelector(".hero-stats-modal-img");
const heroStatsModal = document.querySelector(".hero-stats");
const heroName = document.querySelector(".hero-name");

const renderingSugstedHeroes = function (sugestions) {
  sugestedHeroContainer.innerHTML = "";
  sugestions.forEach((hero) => {
    sugestedHeroContainer.insertAdjacentHTML(
      "beforeend",
      `
  
        <div class="sugested-hero">
          <img
          class="hero-img"
          src="${hero.images.sm}"
          alt=""
        />
        <p class= "sugested-hero-name">${hero.name}</p>
      </div>
      `
    );
  });
};

const renderingHeroStats = function (stats) {
  heroStatsModal.innerHTML = "";

  document.querySelector(".hero-stats-btns").innerHTML = "";
  heroImgModal.src = stats.images.sm;
  heroName.innerHTML = stats.name;

  for (const poverstatsName in stats.powerstats) {
    heroStatsModal.insertAdjacentHTML(
      "beforeend",
      `
        <div>${poverstatsName.toUpperCase()}:<span>${
        stats.powerstats[poverstatsName]
      }</span></div>
    
    
    
    `
    );
  }

  if (!searchModal.classList.contains("hidden")) {
    document.querySelector(".hero-stats-btns").insertAdjacentHTML(
      "afterbegin",
      `
        <button class="btn-add">Add</button>
        <button class="btn-close">Close</button>
      `
    );
    addingHeroToTeam(stats);
  }
  if (searchModal.classList.contains("hidden")) {
    document.querySelector(".hero-stats-btns").insertAdjacentHTML(
      "afterbegin",
      `
        <button class="btn-remove">Remove</button>
        <button class="btn-close">Close</button>
      `
    );
  }
  closingHeroStatsModal();
};

const renderingTeams = function (team, container) {
  const selectedHeroes = container.querySelectorAll(".selected-hero");

  selectedHeroes.forEach((hero) => hero.remove());

  toggleingAddHeroBtn(team, container);

  team.forEach((hero) => {
    container.querySelector(".add-hero-btn").insertAdjacentHTML(
      "beforebegin",
      `
        <div class="selected-hero">
        <img
          class="hero-img"
          src="${hero.images.sm}"
          alt=""
          />
          <div class="hero-inf"></div>
          </div>
          
      `
    );
  });

  selectedHeroesInfoModal(team, container);
};

export { renderingSugstedHeroes, renderingHeroStats, renderingTeams };
