let $gallery = document.getElementById('gallery')
let $imgViewer = document.getElementById('imgViewer')

$gallery.addEventListener('click', (event) => {
    if (event.target.tagName == "IMG") {
        $imgViewer.classList.remove('hidden')
        event.target.dataset.caption
        event.target.alt


        let file = event.target.dataset.full_image
        $imgViewer.innerHTML = `<img src='images/${file}'>    
        <div class =ivText>
        <h2>${event.target.alt}</h2>
        <p>${event.target.dataset.caption}</p>
        </div>
        
        
        
        
        `

    }
})

$imgViewer.addEventListener('click', (event) => {
    $imgViewer.classList.add('hidden')
})