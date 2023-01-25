const addHeroBtn = document.querySelectorAll(".add-hero-btn");

const searchModal = document.querySelector(".search-modal");

const searchBar = document.getElementById("hero-search");

const sugestedHeroContainer = document.querySelector(".sugested-heroes");

const heroInfoModal = document.querySelector(".hero-stats-modal");
const heroImgModal = document.querySelector(".hero-stats-modal-img");
const heroStatsModal = document.querySelector(".hero-stats");

const statcombat = document.querySelector("#combat-stat");
const statdurability = document.querySelector("#durability-stat");
const statintelligence = document.querySelector("#intelligence-stat");
const statSpeed = document.querySelector("#speed-stat");

console.log(addHeroBtn);

addHeroBtn.forEach((el) => {
  el.addEventListener("click", () => {
    if (searchModal.classList.contains("hidden")) {
      searchModal.classList.toggle("hidden");
    }
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
          // heroImgModal.currentSrc = "";
          // heroImgModal.currentSrc = heroSugQuery[index].images.sm;
          renderingHeroStats(heroSugQuery[index]);

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

// searchHero("bat");

const getFeaturedHero = function () {
  fetch("https://akabab.github.io/superhero-api/api/all.json")
    .then((response) => response.json())
    .then((allHeros) =>
      console.log(allHeros[Math.trunc(Math.random() * allHeros.length)])
    );
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
      <p>${hero.name}</p>
    </div>
    `
    );
  });
};

getFeaturedHero();
