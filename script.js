const addHeroBtn = document.querySelectorAll(".add-hero-btn");
// const selectedHeroes = document.querySelectorAll(".selected-heroes-container");

const searchModal = document.querySelector(".search-modal");

const searchBar = document.getElementById("hero-search");

const sugestedHeroContainer = document.querySelector(".sugested-heroes");

const heroInfoModal = document.querySelector(".hero-stats-modal");
const heroImgModal = document.querySelector(".hero-stats-modal-img");
const heroStatsModal = document.querySelector(".hero-stats");
const heroName = document.querySelector(".hero-name");

const team1Container = document.querySelector(".team-0");
const team2Container = document.querySelector(".team-1");

const team1 = [];
const team2 = [];

let activeSearch;

addEventListener("load", () => {
  getFeaturedHeros();
  getRandomHero();
});

const selectedHeroesInfoModal = function (team, container) {
  const teamHeroes = container.querySelectorAll(".selected-hero");

  teamHeroes.forEach((hero, i) => {
    hero.addEventListener("click", () => {
      console.log(team[i], i);

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

document.querySelector(".btn-fight").addEventListener("click", () => {
  calTeamStrenght();
});

const removingHeroFromTeam = function (team, container, hero) {
  const removeBtn = document.querySelector(".btn-remove");

  removeBtn.addEventListener("click", () => {
    team.splice(hero, 1);
    heroInfoModal.classList.add("hidden");
    renderingTeams(team, container);
  });
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
        });
      });
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
};

const restartingHeroSearchModal = function () {
  heroInfoModal.classList.add("hidden");
  searchModal.classList.add("hidden");
  sugestedHeroContainer.innerHTML = "";
  searchBar.value = "";
};

const getRandomHero = function () {
  const randombtn = document.querySelector(".random-icon");

  randombtn.addEventListener("click", () => {
    console.log("hello");
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

const addingHeroToTeam = function (hero) {
  document.querySelector(".btn-add").addEventListener("click", () => {
    if (activeSearch === 0) {
      if (
        !JSON.stringify(team1).includes(JSON.stringify(hero)) &&
        team1.length < 5
      ) {
        team1.push(hero);
      }
      renderingTeams(team1, team1Container);

      
    }
    if (activeSearch === 1) {
      if (
        !JSON.stringify(team2).includes(JSON.stringify(hero)) &&
        team2.length < 5
      ) {
        team2.push(hero);
      }
      renderingTeams(team2, team2Container);
      
    }
    restartingHeroSearchModal();
  });
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

const renderingHeroStats = function (stats) {
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

  if (!searchModal.classList.contains("hidden")) {
    console.log("Sugested Hero");
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
    console.log("selected hero");
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
