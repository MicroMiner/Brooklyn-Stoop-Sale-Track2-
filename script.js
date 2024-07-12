let index = 0,
  interval = 3700;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
  star.style.setProperty("--scale", `${rand(75, 125) / 100}`);
  star.style.setProperty("--rotation", `${rand(0, 360)}deg`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};

for (const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3));
}

document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
  const mapToggle = document.querySelector(".map-toggle");
  const mapContainer = document.getElementById("map");
  let mapInitialized = false;

  const shareButtons = document.querySelectorAll(".share-btn");
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Join us for Lil and Chelsea's Stoop Sale! @ "
  );

  mapToggle.addEventListener("click", function () {
    if (
      mapContainer.style.height === "0px" ||
      mapContainer.style.height === ""
    ) {
      mapContainer.style.height = "200px";
      if (!mapInitialized) {
        initMap();
        mapInitialized = true;
      }
    } else {
      mapContainer.style.height = "0px";
    }
  });

  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let shareUrl;
      switch (this.classList[1]) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
          break;
        case "whatsapp":
          shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
          break;
        case "copy-link":
          navigator.clipboard
            .writeText(
              "Join us for Lil and Chelsea's Stoop Sale! @ " +
                decodeURIComponent(url)
            )
            .then(() => {
              alert("Link copied to clipboard!");
            })
            .catch((err) => {
              console.error("Failed to copy link: ", err);
            });
          return;
      }
      window.open(shareUrl, "_blank");
    });
  });

  window.addEventListener("load", function () {
    const backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch((error) => {
      console.log(
        "Autoplay prevented. User interaction required to play music."
      );
    });
  });
});

function initMap() {
  const map = L.map("map", {
    center: [40.6794555, -73.9987379],
    zoom: 15,
    zoomControl: false,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }
  ).addTo(map);

  const customIcon = L.icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.marker([40.6795, -73.99729], { icon: customIcon })
    .addTo(map)
    .bindPopup(
      "<b>Lil and Chelseas Stoop Sale 💫</b><br>2nd Pl and Court St, Brooklyn"
    )
    .openPopup();

  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);
}
