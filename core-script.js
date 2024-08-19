// Search Function
document.getElementById('searchInput').addEventListener('input', function()
{
    const filter = this.value.toLowerCase();
    const texturerow = document.getElementById('textureContainer');
    const items = texturerow.getElementsByClassName('texture-item');

    Array.from(items).forEach(function(item)
    {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(filter))
        {
            item.style.display = '';
        }
        else
        {
            item.style.display = 'none';
        }
    });
});

// Get modal elements
const modal = document.getElementById("modal");
const pbrIframe = document.getElementById("pbrIframe");
const jpgImg = document.getElementById("jpgImg");
const downloadButton = document.getElementById("downloadButton");
const closeBtn = document.querySelector(".modal .close");

// Base URL for the PBR.one viewer
const githubBaseURL = "https://raw.githubusercontent.com/DaZCDude/ZCs-Spectacular-Textures/main/textures/";

// Add event listener to each texture item
document.querySelectorAll(".texture-item").forEach(item =>
{
    item.addEventListener("click", () =>
    {
        const selectedimage = item.getAttribute("data-selectedimage");
        const isJpeg = item.getAttribute("data-jpeg");

        if(isJpeg == "true")
        {
            downloadButton.innerHTML = "Download (JPG)";
            downloadButton.href = `textures/${selectedimage}/${selectedimage}_albedo.jpg`;

            jpgImg.src = `textures/${selectedimage}/${selectedimage}_albedo.jpg`;

            jpgImg.style.display = "block";
        }
        else
        {
            //Set download button text
            downloadButton.innerHTML = "Download (ZIP)";
            //Set download link
            downloadButton.href = `textures/${selectedimage}_zip.zip`;

            //Set whats shown in the iframe (PBR.ONE render)
            const iframeSrc = `https://cdn.pbr.one/main/material-shading.html#color_url=${githubBaseURL}${selectedimage}/${selectedimage}_albedo.jpg&normal_url=${githubBaseURL}${selectedimage}/${selectedimage}_normal_opengl.jpg&normal_type=opengl&geometry_type=sphere&watermark_enable=0&gui_enable=-1`;
            pbrIframe.src = iframeSrc;

            pbrIframe.style.display = "block";
        }
        

        modal.style.display = "flex";
    });
});

// Close modal on close button click
closeBtn.addEventListener("click", () =>
{
    modal.style.display = "none";
    jpgImg.style.display = "none";
    pbrIframe.style.display = "none";
});

// Close modal on outside click
window.addEventListener("click", (event) =>
{
    if (event.target === modal)
    {
        modal.style.display = "none";
        jpgImg.style.display = "none";
        pbrIframe.style.display = "none";
    }
});

window.addEventListener('keydown', (event) =>
{
    if (event.key === 'Escape' && modal.style.display === 'flex')
    {
        modal.style.display = 'none';
        jpgImg.style.display = "none";
        pbrIframe.style.display = "none";
    }
});
