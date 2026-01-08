//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
button.id = "download-images-button";
button.textContent = "Download Images";

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const loading = document.createElement("div");
loading.id = "loading";
loading.textContent = "Loading...";

const errorDiv = document.createElement("div");
errorDiv.id = "error";

document.body.insertBefore(button, output);
document.body.appendChild(loading);
document.body.appendChild(errorDiv);

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}
function downloadImages() {
  output.innerHTML = "";
  loading.style.display = "block";
  errorDiv.textContent = "";

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      loading.style.display = "none";

      loadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loading.style.display = "none";
      errorDiv.textContent = error;
    });
}
downloadImages();