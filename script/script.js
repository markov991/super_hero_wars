import { renderingHeroStats, renderingTeams } from "./renderingFunc.js";

import { getFeaturedHeros, searchHero, getRandomHero } from "./data.js";

export {
  sugestedHeroContainer,
  closingHeroStatsModal,
  addingHeroToTeam,
  searchModal,
  selectedHeroesInfoModal,
  toggleingAddHeroBtn,
  team1,
  team2,
  team1Container,
  team2Container,
  heroInfoModal,
  activeSearch,
};

const addHeroBtn = document.querySelectorAll(".add-hero-btn");

const searchModal = document.querySelector(".search-modal");

const searchBar = document.getElementById("hero-search");

const sugestedHeroContainer = document.querySelector(".sugested-heroes");

const heroInfoModal = document.querySelector(".hero-stats-modal");

const team1Container = document.querySelector(".team-0");
const team2Container = document.querySelector(".team-1");

const team1 = [];
const team2 = [];

let activeSearch;

addEventListener("load", () => {
  getFeaturedHeros();
  getRandomHero();
  closingHeroSearchModal();
  defineingActiveTeam();
  conditionForSearchHero();
  fightFunction();
});

const selectedHeroesInfoModal = function (team, container) {
  const teamHeroes = container.querySelectorAll(".selected-hero");

  teamHeroes.forEach((hero, i) => {
    hero.addEventListener("click", () => {
      heroInfoModal.classList.remove("hidden");
      renderingHeroStats(team[i]);

      removingHeroFromTeam(team, container, i);
    });
  });
};

const calTeamStrenght = function () {
  const team1Score = [].flat();
  const team2Score = [].flat();

  team1.forEach((hero) => {
    team1Score.push(
      Object.values(hero.powerstats).reduce((acc, cur) => acc + cur) /
        Object.values(hero.powerstats).length
    );
  });
  team2.forEach((hero) => {
    team2Score.push(
      Object.values(hero.powerstats).reduce((acc, cur) => acc + cur) /
        Object.values(hero.powerstats).length
    );
  });

  document.querySelector(".battle-result").classList.remove("hidden");
  document.querySelector(".battle-result").innerHTML = "";

  if (
    team1Score.reduce((acc, cur) => acc + cur) >
    team2Score.reduce((acc, cur) => acc + cur)
  ) {
    document.querySelector(".battle-result").innerHTML = "TEAM 1 IS WINNER";
    setTimeout(() => {
      document.querySelector(".battle-result").classList.add("hidden");
    }, 3000);
  }
  if (
    team2Score.reduce((acc, cur) => acc + cur) >
    team1Score.reduce((acc, cur) => acc + cur)
  ) {
    document.querySelector(".battle-result").innerHTML = "TEAM 2 IS WINNER";
    setTimeout(() => {
      document.querySelector(".battle-result").classList.add("hidden");
    }, 3000);
  }
  if (
    team2Score.reduce((acc, cur) => acc + cur) ===
    team1Score.reduce((acc, cur) => acc + cur)
  ) {
    document.querySelector(".battle-result").innerHTML = "IT IS A DROW";
    setTimeout(() => {
      document.querySelector(".battle-result").classList.add("hidden");
    }, 3000);
  }
};

const fightFunction = function () {
  document.querySelector(".btn-fight").addEventListener("click", () => {
    calTeamStrenght();
  });
};

const removingHeroFromTeam = function (team, container, hero) {
  const removeBtn = document.querySelector(".btn-remove");

  removeBtn.addEventListener("click", () => {
    team.splice(hero, 1);
    heroInfoModal.classList.add("hidden");
    renderingTeams(team, container);
  });
};

const defineingActiveTeam = function () {
  addHeroBtn.forEach((el, i) => {
    el.addEventListener("click", () => {
      activeSearch = i;

      searchModal.classList.toggle("hidden");
    });
  });
};

const closingHeroSearchModal = function () {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchBar.value = "";
      searchModal.classList.add("hidden");
    }
  });
};

const toggleingAddHeroBtn = function (team, container) {
  if (team.length >= 5) {
    container.querySelector(".add-hero-btn").classList.add("hidden");
  }
  if (team.length < 5) {
    container.querySelector(".add-hero-btn").classList.remove("hidden");
  }
};

const conditionForSearchHero = function () {
  document.addEventListener("keyup", (e) => {
    if (searchBar.value.length > 2) {
      searchHero(searchBar.value);
    }
    if (searchBar.value.length <= 2) {
      sugestedHeroContainer.innerHTML = "";
    }
  });
};

const closingHeroStatsModal = function () {
  document
    .querySelector(".btn-close")
    .addEventListener("click", () => heroInfoModal.classList.add("hidden"));
};

const restartingHeroSearchModal = function () {
  heroInfoModal.classList.add("hidden");
  searchModal.classList.add("hidden");
  sugestedHeroContainer.innerHTML = "";
  searchBar.value = "";
};

const addingHeroToTeam = function (hero) {
  document.querySelector(".btn-add").addEventListener("click", () => {
    switch (activeSearch) {
      case 0:
        {
          if (
            !JSON.stringify(team1).includes(JSON.stringify(hero)) &&
            team1.length < 5
          ) {
            team1.push(hero);
          }
          renderingTeams(team1, team1Container);
        }
        break;
      case 1: {
        if (
          !JSON.stringify(team2).includes(JSON.stringify(hero)) &&
          team2.length < 5
        ) {
          team2.push(hero);
        }
        renderingTeams(team2, team2Container);
      }
    }

    restartingHeroSearchModal();
  });
};
