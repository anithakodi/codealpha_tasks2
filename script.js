const images = [

    {
        title: "Mountain Escape",
        category: "nature",
        url: "https://picsum.photos/id/1018/900/650"
    },

    {
        title: "Forest Road",
        category: "nature",
        url: "https://picsum.photos/id/1040/900/650"
    },

    {
        title: "Urban Lines",
        category: "city",
        url: "https://picsum.photos/id/1031/900/650"
    },

    {
        title: "City Lights",
        category: "city",
        url: "https://picsum.photos/id/1011/900/650"
    },

    {
        title: "Travel Memories",
        category: "travel",
        url: "https://picsum.photos/id/1015/900/650"
    },

    {
        title: "Ocean Journey",
        category: "travel",
        url: "https://picsum.photos/id/1016/900/650"
    }

];

let currentCategory = "all";

let displayedImages = images;

let currentIndex = 0;

const gallery =
    document.getElementById("gallery");

const search =
    document.getElementById("search");


function displayImages() {

    const text =
        search.value.toLowerCase();

    displayedImages =
        images.filter(image => {

            return (
                (currentCategory === "all" ||
                 image.category === currentCategory)
                &&
                image.title.toLowerCase()
                    .includes(text)
            );

        });

    gallery.innerHTML = "";

    displayedImages.forEach((image, index) => {

        gallery.innerHTML += `

        <div class="card"
             onclick="openLightbox(${index})">

            <img src="${image.url}">

            <div class="info">

                <b>${image.title}</b>

                <br>

                <small>
                    ${image.category.toUpperCase()}
                </small>

            </div>

        </div>

        `;

    });

}


function filterImages(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".filters button")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");

    displayImages();

}


search.addEventListener(
    "input",
    displayImages
);


function openLightbox(index) {

    currentIndex = index;

    document
        .getElementById("lightbox")
        .classList.add("show");

    updateLightbox();

}


function updateLightbox() {

    const image =
        displayedImages[currentIndex];

    document.getElementById(
        "lightboxImage"
    ).src = image.url;

    document.getElementById(
        "caption"
    ).textContent =
        image.title;

}


function closeLightbox() {

    document
        .getElementById("lightbox")
        .classList.remove("show");

}


function changeImage(direction) {

    currentIndex += direction;

    if(currentIndex < 0)
        currentIndex =
            displayedImages.length - 1;

    if(currentIndex >= displayedImages.length)
        currentIndex = 0;

    updateLightbox();

}


document.getElementById("themeBtn")
    .onclick = function() {

        document.body
            .classList.toggle("dark");

    };


document.addEventListener(
    "keydown",
    function(event) {

        if(event.key === "Escape")
            closeLightbox();

        if(event.key === "ArrowRight")
            changeImage(1);

        if(event.key === "ArrowLeft")
            changeImage(-1);

    }
);


displayImages();