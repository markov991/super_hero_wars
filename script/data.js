import {
  team1,
  team2,
  team1Container,
  team2Container,
  heroInfoModal,
  activeSearch,
} from "./script.js";
import {
  renderingTeams,
  renderingSugstedHeroes,
  renderingHeroStats,
} from "./renderingFunc.js";

const getFeaturedHeros = function () {
  fetch("https://akabab.github.io/superhero-api/api/all.json")
    .then((response) => response.json())
    .then((allHeros) => {
      team1.push(allHeros[Math.trunc(Math.random() * allHeros.length)]);
      team2.push(allHeros[Math.trunc(Math.random() * allHeros.length)]);

      renderingTeams(team1, team1Container);
      renderingTeams(team2, team2Container);
    });
};

const searchHero = function (searchPar) {
  fetch("https://akabab.github.io/superhero-api/api/all.json")
    .then((response) => response.json())
    .then((allHeros) => {
      const heroSugQuery = [];
      allHeros.forEach((hero) => {
        if (
          hero.name.toLowerCase().includes(searchPar.toLowerCase()) &&
          heroSugQuery.length < 6
        ) {
          heroSugQuery.push(hero);
        }
      });
      renderingSugstedHeroes(heroSugQuery);
      const sughero = document.querySelectorAll(".sugested-hero");

      sughero.forEach((hero, index) => {
        hero.addEventListener("click", () => {
          heroInfoModal.classList.toggle("hidden");

          renderingHeroStats(heroSugQuery[index]);
        });
      });
    });
};

const getRandomHero = function () {
  const randombtn = document.querySelector(".random-icon");

  randombtn.addEventListener("click", () => {
    if (activeSearch === 0)
      fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then((response) => response.json())
        .then((allHeros) => {
          heroInfoModal.classList.remove("hidden");
          let randomHero =
            allHeros[Math.trunc(Math.random() * allHeros.length)];

          renderingHeroStats(randomHero);
        });
    if (activeSearch === 1)
      fetch("https://akabab.github.io/superhero-api/api/all.json")
        .then((response) => response.json())
        .then((allHeros) => {
          heroInfoModal.classList.remove("hidden");
          let randomHero =
            allHeros[Math.trunc(Math.random() * allHeros.length)];

          renderingHeroStats(randomHero);
        });
  });
};

export { getFeaturedHeros, searchHero, getRandomHero };
