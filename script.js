const addHeroBtn = document.querySelectorAll(".add-hero-btn");

const searchModal = document.querySelector(".search-modal");

const searchBar = document.getElementById("hero-search");

const sugestedHeroContainer = document.querySelector(".sugested-heroes");

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
      const x = [];
      allHeros.forEach((hero) => {
        if (
          hero.name.toLowerCase().includes(searchPar.toLowerCase()) &&
          x.length < 6
        ) {
          x.push(hero);
        }
      });
      renderingSugstedHeroes(x);
      const sughero = document.querySelectorAll(".sugested-hero");

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

const renderingSugstedHeroes = function (sugestions) {
  sugestedHeroContainer.innerHTML = "";
  sugestions.forEach((hero) => {
    sugestedHeroContainer.insertAdjacentHTML(
      "afterbegin",
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
