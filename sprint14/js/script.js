document.addEventListener("DOMContentLoaded", () => {

  const content = document.getElementById("content");
  const navButtons = document.querySelectorAll(".nav-btn");
  const hamburger = document.getElementById("hamburger");
  const navList = document.getElementById("nav-list");

  let data = null;

  async function loadData() {
    try {
      const response = await fetch("data/data.json");
      if (!response.ok) {
        throw new Error("Nu s-au putut încărca datele din JSON!");
      }

      data = await response.json();
      renderSection("home");

    } catch (error) {
      console.error("Eroare:", error);
      content.innerHTML = "<p>Nu s-au putut încărca datele. Verifică fișierul JSON.</p>";
    }
  }

  function renderSection(section) {
    content.innerHTML = "";
    content.classList.add("fade");
    document.body.className = section;

    navButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-section='${section}']`);
    if (activeBtn) activeBtn.classList.add("active");

    if (section === "home") {
      renderHome();
    } else if (section === "destination") {
      renderDestination();
    } else {
      renderInProgress(section);
    }

    navList.classList.remove("show");
  }

  function renderHome() {
    const title = document.createElement("h1");
    title.innerHTML = `So, you want to travel to<br><span style="font-size:5rem;">SPACE</span>`;

    const desc = document.createElement("p");
    desc.textContent = "Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not just hover kind of on the edge of it.";

    const btn = document.createElement("button");
    btn.textContent = "Explore";
    btn.className = "explore-btn";
    btn.addEventListener("click", () => renderSection("destination"));

    content.append(title, desc, btn);
  }

  function renderDestination() {
    if (!data || !data.destinations) {
      content.innerHTML = "<p>Nu s-au găsit informațiile despre destinații.</p>";
      return;
    }

    const title = document.createElement("h3");
    title.textContent = "01 PICK YOUR DESTINATION";
    title.style.marginBottom = "2rem";
    content.appendChild(title);

    const container = document.createElement("div");
    container.classList.add("destination-container");

    const left = document.createElement("div");
    left.classList.add("destination-left");
    const planetImage = document.createElement("img");
    left.appendChild(planetImage);

    const right = document.createElement("div");
    right.classList.add("destination-right");

    const tabs = document.createElement("div");
    tabs.classList.add("destination-tabs");

    const planetName = document.createElement("h1");
    const planetDesc = document.createElement("p");
    const line = document.createElement("hr");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("destination-info");

    const distance = document.createElement("p");
    const travel = document.createElement("p");
    infoDiv.append(distance, travel);

    right.append(tabs, planetName, planetDesc, line, infoDiv);
    container.append(left, right);
    content.append(container);

    function updatePlanet(planet) {
      planetImage.src = planet.images.png;
      planetImage.alt = planet.name;
      planetName.textContent = planet.name;
      planetDesc.textContent = planet.description;
      distance.innerHTML = `<strong>AVG. DISTANCE</strong><br>${planet.distance}`;
      travel.innerHTML = `<strong>EST. TRAVEL TIME</strong><br>${planet.travel}`;
    }

    data.destinations.forEach((planet, index) => {
      const btn = document.createElement("button");
      btn.textContent = planet.name.toUpperCase();
      if (index === 0) btn.classList.add("active");
      tabs.appendChild(btn);

      btn.addEventListener("click", () => {
        document.querySelectorAll(".destination-tabs button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updatePlanet(planet);
      });
    });

    updatePlanet(data.destinations[0]);
  }

  function renderInProgress(section) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${section.toUpperCase()} PAGE IN PROGRESS</h2>
      <p>This section is not ready yet. Please go back to Home or Destination.</p>
    `;
    content.appendChild(div);
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      renderSection(section);
    });
  });

  hamburger.addEventListener("click", () => {
    navList.classList.toggle("show");
  });

  loadData();
});
