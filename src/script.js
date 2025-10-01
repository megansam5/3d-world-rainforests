import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.set(0, 0, 4);

// Renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 3, 5);
scene.add(ambientLight, directionalLight);

// Earth sphere
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("assets/earth.jpg");
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// Example markers
const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x006800 });
const markers = [
  {
    name: "Amazon Rainforest",
    lat: -3,
    lon: -60,
    extent: "628 million ha tree cover (526 million ha primary forest, 2020)",
    countries: [
      "Brazil (60%)",
      "Peru (13%)",
      "Colombia (8%)",
      "Venezuela (6%)",
      "Bolivia (6%)",
      "Guyana (3%)",
      "Ecuador (2%)",
      "Suriname (2%)",
      "French Guiana (1%)",
    ],
    species:
      "Jaguar, tapir, capybara, river dolphins, monkeys, parrots; 40,000+ plants; 3,000 fish; 1,300 birds; 1,000 amphibians; 430 mammals; 400 reptiles",
    fact: "World’s largest rainforest, generating rainfall that sustains 70% of South America’s GDP; home to uncontacted tribes.",
    deforestationTrend:
      "Rising; over 30 million ha primary forest lost 2002–2019 (5.5% of 2001 extent).",
  },
  {
    name: "Congo Rainforest",
    lat: -1,
    lon: 15,
    extent: "288 million ha tree cover (168 million ha primary forest, 2020)",
    countries: [
      "DRC (60%)",
      "Gabon (13%)",
      "Republic of the Congo (12%)",
      "Cameroon (10%)",
      "Central African Republic (3%)",
      "Equatorial Guinea (1%)",
    ],
    species: "Forest elephants, okapi, gorillas, bonobos, chimpanzees",
    fact: "Second-largest rainforest; covers most of the Congo Basin, which drains 3.7 million km².",
    deforestationTrend:
      "Rising sharply; lost over 6 million ha primary forest 2002–2019 (3.5% of 2001 extent).",
  },
  {
    name: "Australasia Rainforest",
    lat: -5,
    lon: 145,
    extent: "89 million ha tree cover (64 million ha primary forest, 2020)",
    countries: [
      "Indonesia (Papua & West Papua, 51%)",
      "Papua New Guinea (49%)",
      "Australia (<1%)",
    ],
    species:
      "Tree kangaroos, cassowaries, giant ground pigeons, saltwater crocodiles; rich in marsupials",
    fact: "New Guinea hosts the world’s greatest linguistic diversity (~800 languages) and a few uncontacted groups.",
    deforestationTrend:
      "Rising due to logging and plantations; Indonesian New Guinea lost 605,000 ha since 2002, PNG 732,000 ha.",
  },
  {
    name: "Sundaland Rainforest",
    lat: 0.5,
    lon: 113,
    extent: "103 million ha tree cover (51 million ha primary forest, 2020)",
    countries: [
      "Indonesia (73%)",
      "Malaysia (26%)",
      "Brunei (<1%)",
      "Singapore (<1%)",
    ],
    species:
      "Elephants, orangutans, two rhino species, tigers, hornbills, monkeys",
    fact: "Includes Borneo, Sumatra, Java, and Peninsular Malaysia; most remaining forest is on Borneo.",
    deforestationTrend:
      "Highest deforestation of any major rainforest region, but slowing since mid-2010s. Borneo lost 15%, Sumatra 25% of primary forest 2002–2019.",
  },
  {
    name: "Indo-Burma Rainforest",
    lat: 18,
    lon: 96,
    extent: "139 million ha tree cover (40 million ha primary forest, 2020)",
    countries: [
      "Myanmar (34%)",
      "Laos (19%)",
      "Vietnam (15%)",
      "Thailand (14%)",
      "Cambodia (8%)",
      "India (6%)",
      "China (4%)",
    ],
    species: "Elephants, rhinos, tigers, gibbons, leopards",
    fact: "Highly fragmented forests under heavy population pressure; includes mangroves, seasonal forests, and lowland rainforest.",
    deforestationTrend:
      "Flat rate of primary forest loss but accelerating tree cover loss; Cambodia lost 28% of 2001 primary forest by 2019.",
  },
  {
    name: "Mesoamerican Rainforest",
    lat: 10,
    lon: -85,
    extent: "51 million ha tree cover (16 million ha primary forest, 2020)",
    countries: [
      "Mexico (39%)",
      "Guatemala (13%)",
      "Honduras (11%)",
      "Panama (11%)",
      "Nicaragua (10%)",
      "Costa Rica (9%)",
    ],
    species: "Jaguar, puma, tapir, peccary",
    fact: "Extends from southern Mexico to Panama; Costa Rica’s rainforests are best known due to ecotourism.",
    deforestationTrend:
      "Accelerating due to fire, cattle pasture, plantations, and smallholder agriculture. Nicaragua lost nearly 30% of its 2001 primary forest.",
  },
  {
    name: "Wallacea Rainforest",
    lat: -2,
    lon: 122,
    extent: "24.4 million ha tree cover (14.6 million ha primary forest, 2020)",
    countries: ["Indonesia (Sulawesi >60%, Maluku Islands 34%)"],
    species: "Babirusa, tarsiers, monkeys, hornbills, cuscuses",
    fact: "Biogeographic transition zone between Asia and Australasia with very high endemism.",
    deforestationTrend:
      "Sharp increases in 2015–2016 due to fire; plantations (oil palm, coconut) drove losses in the 2010s.",
  },
  {
    name: "Guinean Forests of West Africa",
    lat: 6,
    lon: -9,
    extent: "42 million ha tree cover (10.2 million ha primary forest, 2020)",
    countries: [
      "Liberia (41%)",
      "Cameroon (17%)",
      "Nigeria (17%)",
      "Côte d’Ivoire (10%)",
      "Ghana (10%)",
    ],
    species: "Gorillas, chimps, pygmy hippo, monkeys",
    fact: "Stretches from Liberia and Sierra Leone to the Nigeria-Cameroon border; heavily diminished by agriculture and plantations.",
    deforestationTrend:
      "Rising since mid-2000s, sharply accelerating in 2010s; Côte d’Ivoire lost about one-third of its primary forests in less than 20 years.",
  },
  {
    name: "Atlantic Forest (Mata Atlântica)",
    lat: -20,
    lon: -45,
    extent: "89 million ha tree cover (9.3 million ha primary forest, 2020)",
    countries: ["Brazil (86%)", "Argentina (9.5%)", "Paraguay (4%)"],
    species: "Jaguar, puma, golden lion tamarin, howler monkeys",
    fact: "Once extended along Brazil’s Atlantic coast into Argentina and Paraguay; today mostly plantations or secondary forests.",
    deforestationTrend:
      "Primary forest loss slowed since the 20th century; annual deforestation relatively flat.",
  },
  {
    name: "Chocó-Darién Rainforest",
    lat: 4,
    lon: -77,
    extent: "15.6 million ha tree cover (8.4 million ha primary forest, 2020)",
    countries: ["Colombia (79%)", "Panama (13%)", "Ecuador (8%)"],
    species: "Jaguar, puma, monkeys",
    fact: "World’s wettest rainforest, home to Amerindian and Afroindigenous (maroon) communities.",
    deforestationTrend:
      "Lowest deforestation rate of major rainforest regions; only 1.4% of 2001 primary forest lost between 2002–2019.",
  },
];

const markerMeshes = [];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

markers.forEach((marker) => {
  const mesh = new THREE.Mesh(markerGeometry, markerMaterial);
  const pos = latLonToVector3(marker.lat, marker.lon, 1.01);
  mesh.position.copy(pos);
  mesh.userData = marker;
  earthMesh.add(mesh);
  markerMeshes.push(mesh);
});

// --- Fixed info panel for marker facts ---
const factBox = document.createElement("div");
factBox.style.position = "absolute";
factBox.style.top = "10px";
factBox.style.left = "10px";
factBox.style.maxWidth = "250px";
factBox.style.padding = "10px";
factBox.style.background = "rgba(0,0,0,0.6)";
factBox.style.color = "white";
factBox.style.fontSize = "14px";
factBox.style.borderRadius = "8px";
factBox.style.display = "none";
document.body.appendChild(factBox);

// --- Stars background ---
function addStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 2000;
  const positions = [];
  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    positions.push(x, y, z);
  }
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
addStars();

// --- Title + Info credit ---
let infoMesh;
let introMesh;
const loader = new FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry("Rainforests", {
      font: font,
      size: 0.18,
      height: 0.05,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x006800 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.7, 1.2, 0);
    scene.add(textMesh);

    // Info credit
    const infoGeometry = new TextGeometry(
      "All this info was found at:\nearth.org\n(double click to read more)",
      {
        font: font,
        size: 0.07,
        height: 0.02,
      }
    );
    const infoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    infoMesh = new THREE.Mesh(infoGeometry, infoMaterial);
    infoMesh.position.set(-2.5, -0.5, 0);
    infoMesh.userData.isBillboard = true;
    infoMesh.userData.isClickable = true;
    scene.add(infoMesh);

    // Intro Info
    const introGeometry = new TextGeometry(
      "Rainforests are vital ecosystems that\nregulate climate, host immense biodiversity,\nand support human life.\nHover over the rainforests around\nthe world to see more information.",
      {
        font: font,
        size: 0.07,
        height: 0.02,
      }
    );
    const introMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    introMesh = new THREE.Mesh(introGeometry, introMaterial);
    introMesh.position.set(1.2, 1, 0);
    scene.add(introMesh);
  }
);

// --- Raycaster ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(markerMeshes);

  if (intersects.length > 0) {
    const marker = intersects[0].object.userData;
    factBox.style.display = "block";
    factBox.innerHTML = `
  <div style="font-family: Arial, sans-serif; font-size: 13px; max-width: 250px; line-height: 1.4;">
    <b style="font-size: 14px;">${marker.name}</b><br>
    <em>${marker.fact}</em>
    <hr style="margin: 6px 0; border: 0; border-top: 1px solid #ccc;">
    <b>Extent:</b> ${marker.extent}<br>
    <b>Countries:</b> ${marker.countries.join(", ")}<br>
    <b>Key species:</b> ${marker.species}<br>
    <b>Deforestation:</b> ${marker.deforestationTrend}
  </div>
`;
  } else {
    factBox.style.display = "none";
  }
});

// --- Detect clicks (for info credit link) ---
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([infoMesh].filter(Boolean));

  if (intersects.length > 0 && intersects[0].object.userData.isClickable) {
    window.open(
      "https://earth.org/world-rainforest-day-worlds-great-rainforests/",
      "_blank"
    );
  }
});

// --- Rotation toggle button ---
let autoRotate = true;
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "Stop Rotation";
toggleBtn.style.position = "absolute";
toggleBtn.style.bottom = "20px";
toggleBtn.style.left = "20px";
toggleBtn.style.padding = "8px 12px";
toggleBtn.style.border = "none";
toggleBtn.style.borderRadius = "6px";
toggleBtn.style.background = "#00aa88";
toggleBtn.style.color = "white";
toggleBtn.style.cursor = "pointer";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  autoRotate = !autoRotate;
  toggleBtn.textContent = autoRotate ? "Stop Rotation" : "Start Rotation";
});

// --- Resize ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Animate ---
const clock = new THREE.Clock();
function animate() {
  const elapsed = clock.getElapsedTime();

  if (autoRotate) {
    earthMesh.rotation.y = elapsed * 0.1;
  }

  // Keep info billboard facing camera
  if (infoMesh) {
    infoMesh.lookAt(camera.position);
  }
  if (introMesh) {
    introMesh.lookAt(camera.position);
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
