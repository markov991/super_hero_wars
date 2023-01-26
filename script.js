const addHeroBtn = document.querySelectorAll(".add-hero-btn");

const searchModal = document.querySelector(".search-modal");

const searchBar = document.getElementById("hero-search");

const sugestedHeroContainer = document.querySelector(".sugested-heroes");

const heroInfoModal = document.querySelector(".hero-stats-modal");
const heroImgModal = document.querySelector(".hero-stats-modal-img");
const heroStatsModal = document.querySelector(".hero-stats");

const team1Container = document.querySelector(".team-0");
const team2Container = document.querySelector(".team-1");
const team1Heroes = team1Container.children;

const statcombat = document.querySelector("#combat-stat");
const statdurability = document.querySelector("#durability-stat");
const statintelligence = document.querySelector("#intelligence-stat");
const statSpeed = document.querySelector("#speed-stat");

const mrk = [];

const team1 = [];
const team2 = [];

console.log(addHeroBtn);
let activeSearch;

addEventListener("load", () => {
  getFeaturedHero(team1);
  getFeaturedHero(team2);
  // renderingTeams(team1, team1Container);
});

addHeroBtn.forEach((el, i) => {
  el.addEventListener("click", () => {
    activeSearch = i;

    searchModal.classList.toggle("hidden");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchBar.value = "";
    searchModal.classList.add("hidden");
  }
});

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

          // heroSugQuery se ne prazni kad se dodaju heroji

          document.querySelector(".btn-add").addEventListener("click", () => {
            if (activeSearch === 0) {
              addingHeroToTeam(heroSugQuery[index], team1);
              console.log(heroSugQuery);
              renderingTeams(team1, team1Container);
              heroInfoModal.classList.add("hidden");
              searchModal.classList.add("hidden");
            }
            if (activeSearch === 1) {
              addingHeroToTeam(heroSugQuery[index], team2);
              console.log(heroSugQuery);
              renderingTeams(team2, team2Container);
              heroInfoModal.classList.add("hidden");
              searchModal.classList.add("hidden");
            }
          });

          document
            .querySelector(".btn-close")
            .addEventListener("click", () =>
              heroInfoModal.classList.add("hidden")
            );
          for (const prop in heroSugQuery[index].powerstats) {
            console.log(
              `Prop:${prop} and :${heroSugQuery[index].powerstats[prop]}`
            );
          }
          console.log(heroSugQuery[index]);
        });
      });

      console.log(sughero);
    });
};

document.addEventListener("keyup", (e) => {
  if (searchBar.value.length > 2) {
    searchHero(searchBar.value);
  }
  if (searchBar.value.length <= 2) {
    sugestedHeroContainer.innerHTML = "";
  }
});

const getFeaturedHero = function (team) {
  fetch("https://akabab.github.io/superhero-api/api/all.json")
    .then((response) => response.json())
    .then(
      (allHeros) => {
        team.push(allHeros[Math.trunc(Math.random() * allHeros.length)]);
        renderingTeams(team1, team1Container);
        renderingTeams(team2, team2Container);
      }
      // console.log(allHeros[Math.trunc(Math.random() * allHeros.length)])
    );
};

const addingHeroToTeam = function (hero, team) {
  if (!JSON.stringify(team).includes(JSON.stringify(hero))) {
    team.push(hero);
  }
};

const renderingTeams = function (team, container) {
  container.innerHTML = "";

  team.forEach((hero) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="selected-hero">
      <img
        class="hero-img"
        src="${hero.images.sm}"
        alt=""
        />
        <div class="hero-inf"></div>
        
    `
    );
  });
};

const renderingHeroStats = function (stats) {
  heroStatsModal.innerHTML = "";
  heroImgModal.currentSrc = "";
  heroImgModal.src = stats.images.sm;

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
};

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
