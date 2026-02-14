const audio = document.getElementById("bg-audio");
const gasAudio = document.getElementById("gas-audio");
const toggleButton = document.getElementById("toggle-audio");
const statusLabel = document.getElementById("audio-status");
const trackButtons = document.querySelectorAll(".track");
const albumButtons = document.querySelectorAll(".ghost");
const modal = document.getElementById("album-modal");
const modalCover = document.getElementById("modal-cover");
const modalTag = document.getElementById("modal-tag");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalGallery = document.getElementById("modal-gallery");
const modalClose = document.querySelector(".modal-close");
const musicPlayer = document.getElementById("msc-player");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

let isPlaying = false;

const updateAudioLabel = () => {
    toggleButton.textContent = isPlaying ? "Pause background music" : "Play background music";
    statusLabel.textContent = isPlaying ? "Now playing" : "Muted by default";
};

const setTheme = (theme) => {
    if (!theme) {
        return;
    }
    document.body.dataset.theme = theme;
    document.documentElement.dataset.theme = theme;
    trackButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.theme === theme);
    });
};

const pauseOtherAudio = (keep) => {
    [audio, gasAudio].forEach((track) => {
        if (track && track !== keep) {
            track.pause();
        }
    });
};

const albumGallery = {
    moonlit: [
        {
            src: "images/tagaytay/1.jpg",
            alt: "tagaytay"
        },
        {
            src: "images/tagaytay/2.jpg",
            alt: "tagaytay"
        },
        {
            src: "images/tagaytay/3.jpg",
            alt: "tagaytay"
        },
        {
            src: "images/tagaytay/4.jpg",
            alt: "tagaytay"
        },
        {
            src: "images/tagaytay/5.jpg",
            alt: "tagaytay"
        },
        {
            src: "images/tagaytay/6.jpg",
            alt: "tagaytay"
        },
        {
            src: "images/tagaytay/7.jpg",
            alt: "tagaytay"
        },
    ],
    petal: [
        {
            src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
            alt: "Closeup of pink flowers in bloom"
        },
        {
            src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
            alt: "Open notebook with soft light"
        },
        {
            src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
            alt: "Sunlit petals on a table"
        },
        {
            src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
            alt: "Vintage letters and roses"
        }
    ],
    coastal: [
        {
            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            alt: "Ocean waves at golden hour"
        },
        {
            src: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=800&q=80",
            alt: "Coastal cliffs with warm light"
        },
        {
            src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
            alt: "Warm sunlight over a beach"
        },
        {
            src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
            alt: "Sand and sea with soft hues"
        }
    ],
    planets: [
        {
            src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
            alt: "Star field and nebula"
        },
        {
            src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80",
            alt: "Purple night sky with stars"
        },
        {
            src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=80",
            alt: "Cosmic cloud in deep space"
        },
        {
            src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80",
            alt: "Milky Way over mountains"
        }
    ]
};

const renderGallery = (items) => {
    modalGallery.innerHTML = "";
    if (!items || items.length === 0) {
        modalGallery.textContent = "No photos yet.";
        modalGallery.classList.add("empty");
        return;
    }

    modalGallery.classList.remove("empty");
    items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        img.loading = "lazy";
        modalGallery.appendChild(img);
    });
};

const openModal = (card) => {
    const cover = card.querySelector(".album-cover");
    const tag = card.querySelector(".tag");
    const title = card.querySelector("h3");
    const desc = card.querySelector("p");
    const coverClass = Array.from(cover.classList).find((name) => name.startsWith("cover-"));
    const albumId = card.dataset.album;

    modalCover.className = "album-cover";
    if (coverClass) {
        modalCover.classList.add(coverClass);
    }
    modalTag.textContent = tag ? tag.textContent : "Album";
    modalTitle.textContent = title ? title.textContent : "Album";
    modalDesc.textContent = desc ? desc.textContent : "";
    renderGallery(albumGallery[albumId]);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
};

const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
};

const openLightbox = (src, alt) => {
    if (!src) {
        return;
    }
    lightboxImage.src = src;
    lightboxImage.alt = alt || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
};

toggleButton.addEventListener("click", async () => {
    try {
        if (!isPlaying) {
            pauseOtherAudio(audio);
            await audio.play();
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
        updateAudioLabel();
    } catch (error) {
        statusLabel.textContent = "Tap again to allow audio";
    }
});

musicPlayer.addEventListener("click", async () => {
    try {
        pauseOtherAudio(gasAudio);
        await gasAudio.play();
        if (isPlaying) {
            isPlaying = false;
            updateAudioLabel();
        }
    } catch (error) {
        statusLabel.textContent = "Tap again to allow audio";
    }
});

trackButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setTheme(button.dataset.theme);
    });
});

albumButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".album-card");
        if (card) {
            openModal(card);
        }
    });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

modalGallery.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.tagName === "IMG") {
        openLightbox(target.src, target.alt);
    }
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (lightbox.classList.contains("open")) {
            closeLightbox();
            return;
        }
        if (modal.classList.contains("open")) {
            closeModal();
        }
    }
});

setTheme("aurora");
updateAudioLabel();
