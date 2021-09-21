const fullImg = document.querySelector(".full-img");
const smallImg = document.querySelectorAll(".gallery img");
const modal = document.querySelector(".modal");


smallImg.forEach(function (img) {
    img.addEventListener("click", function () {
        modal.classList.add("open");
        fullImg.classList.add("open");

        // Changin' the images dynamically
        const imgNum = img.getAttribute("alt");
        fullImg.src = `img/full/${imgNum}.jpg`;
    });
});

// to remove modal
modal.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        fullImg.classList.remove("open");
    }
});
