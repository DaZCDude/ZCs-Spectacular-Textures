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
