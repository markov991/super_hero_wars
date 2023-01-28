const addHeroBtn = document.querySelectorAll(".add-hero-btn");
const selectedHeroes = document.querySelectorAll(".selected-heroes-container");

const searchModal = document.querySelector(".search-modal");

const searchBar = document.getElementById("hero-search");

const sugestedHeroContainer = document.querySelector(".sugested-heroes");

const heroInfoModal = document.querySelector(".hero-stats-modal");
const heroImgModal = document.querySelector(".hero-stats-modal-img");
const heroStatsModal = document.querySelector(".hero-stats");
const heroName = document.querySelector(".hero-name");

const team1Container = document.querySelector(".team-0");
const team2Container = document.querySelector(".team-1");

const statcombat = document.querySelector("#combat-stat");
const statdurability = document.querySelector("#durability-stat");
const statintelligence = document.querySelector("#intelligence-stat");
const statSpeed = document.querySelector("#speed-stat");

const team1 = [];
const team2 = [];

let activeSearch;

addEventListener("load", () => {
  getFeaturedHeros();
});

const selectedHeroesInfoModal = function () {
  const team1Heroes = team1Container.querySelectorAll(".selected-hero");

  team1Heroes.forEach((hero, i) => {
    hero.addEventListener(
      "click",
      () => {
        console.log(team1[i]);

        heroInfoModal.classList.toggle("hidden");
        renderingHeroStats(team1[i]);
        closingHeroStatsModal();
        // renderingTeams(team1, team1Container);
        // renderingTeams(team2, team2Container);
      }
      // ,
      // { once: true }
    );
  });
  // hero.removeEventListener("click");
};

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

          document.querySelector(".btn-add").addEventListener(
            "click",
            () => {
              if (activeSearch === 0) {
                addingHeroToTeam(heroSugQuery[index], team1);
                renderingTeams(team1, team1Container);
                restartingHeroSearchModal();
                selectedHeroesInfoModal();
              }
              if (activeSearch === 1) {
                addingHeroToTeam(heroSugQuery[index], team2);
                renderingTeams(team2, team2Container);
                restartingHeroSearchModal();
                selectedHeroesInfoModal();
              }
            },
            { once: true }
          );
          closingHeroStatsModal();
        });
      });
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

const closingHeroStatsModal = function () {
  document
    .querySelector(".btn-close")
    .addEventListener("click", () => heroInfoModal.classList.add("hidden"));
  renderingTeams(team1, team1Container);
  renderingTeams(team2, team2Container);
};

const restartingHeroSearchModal = function () {
  heroInfoModal.classList.add("hidden");
  searchModal.classList.add("hidden");
  sugestedHeroContainer.innerHTML = "";
  searchBar.value = "";
};

const getFeaturedHeros = function () {
  fetch("https://akabab.github.io/superhero-api/api/all.json")
    .then((response) => response.json())
    .then((allHeros) => {
      team1.push(allHeros[Math.trunc(Math.random() * allHeros.length)]);
      team2.push(allHeros[Math.trunc(Math.random() * allHeros.length)]);

      renderingTeams(team1, team1Container);
      renderingTeams(team2, team2Container);
      selectedHeroesInfoModal();
    });
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
  // console.log("hello");
  heroStatsModal.innerHTML = "";
  heroImgModal.currentSrc = "";
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

  document.querySelector(".hero-stats-btns").insertAdjacentHTML(
    "afterbegin",
    `
    <button class="btn-add">Add</button>
    <button class="btn-close">Close</button>
  `
  );
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
