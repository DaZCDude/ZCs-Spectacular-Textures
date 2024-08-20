// Search Function
document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const texturerow = document.getElementById('textureContainer');
    const items = texturerow.getElementsByClassName('texture-item');

    Array.from(items).forEach(function(item) {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

let selectedimage = ''; // Declare selectedimage globally

// Get modal elements
const modal = document.getElementById("modal");
const pbrIframe = document.getElementById("pbrIframe");
const jpgImg = document.getElementById("jpgImg");
const downloadButton = document.getElementById("downloadButton");
const seamlessButton = document.getElementById("seamless-previewButton");
const shaderButton = document.getElementById("shader-previewButton");
const closeBtn = document.querySelector(".modal .close");

// Base URL for the PBR.one viewer
const githubBaseURL = "https://raw.githubusercontent.com/DaZCDude/ZCs-Spectacular-Textures/main/textures/";

// Add event listener to each texture item
document.querySelectorAll(".texture-item").forEach(item => {
    item.addEventListener("click", () => {
        selectedimage = item.getAttribute("data-selectedimage"); // Set selectedimage correctly
        const imagetype = item.getAttribute("data-imagetype");

        switch (imagetype) {
            case "basic":
                downloadButton.innerHTML = "Download (JPG)";
                downloadButton.href = `textures/${selectedimage}/${selectedimage}_albedo.jpg`;

                jpgImg.src = `textures/${selectedimage}/${selectedimage}_albedo.jpg`;
                jpgImg.style.display = "block";

                seamlessButton.style.display = "none";
                shaderButton.style.display = "none";
                break;

            case "pbr":
                // Set download button text
                downloadButton.innerHTML = "Download (ZIP)";
                // Set download link
                downloadButton.href = `textures/${selectedimage}_zip.zip`;

                // Set what's shown in the iframe (PBR.ONE render)
                const iframeSrc = `preview/texture-tiling.html#texture_url=${githubBaseURL}${selectedimage}/${selectedimage}_albedo.jpg`;
                pbrIframe.src = iframeSrc;
                pbrIframe.style.display = "block";

                seamlessButton.style.display = "none";
                shaderButton.style.display = "block";
                break;

            case "hdri":
                downloadButton.innerHTML = "Download (JPG)";
                downloadButton.href = `textures/HDRIs/${selectedimage}.jpg`;

                jpgImg.src = `textures/HDRIs/${selectedimage}.jpg`;

                jpgImg.style.display = "block";
                break;
        }

        modal.style.display = "flex";
    });
});

// Shader button click event listener
shaderButton.addEventListener("click", () => {
    // Use the globally defined selectedimage
    pbrIframe.src = `preview/material-shading.html#color_url=${githubBaseURL}${selectedimage}/${selectedimage}_albedo.jpg&normal_url=${githubBaseURL}${selectedimage}/${selectedimage}_normal_opengl.jpg`;
    pbrIframe.style.display = "block";

    seamlessButton.style.display = "block";
    shaderButton.style.display = "none";
});
// Shader button click event listener
seamlessButton.addEventListener("click", () => {
    // Use the globally defined selectedimage
    pbrIframe.src = `preview/texture-tiling.html#texture_url=${githubBaseURL}${selectedimage}/${selectedimage}_albedo.jpg`;
    pbrIframe.style.display = "block";

    seamlessButton.style.display = "none";
    shaderButton.style.display = "block";
});

// Close modal on close button click
closeBtn.addEventListener("click", () => {
    closeModal();
});

// Close modal on outside click
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key press
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

function closeModal()
{
    modal.style.display = 'none';
    jpgImg.style.display = "none";
    pbrIframe.style.display = "none";
}
