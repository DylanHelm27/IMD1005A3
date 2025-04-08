let darkmode = localStorage.getItem("darkmode") || 'false'
SetDarkMode()

function ToggleDarkMode() {
    if (darkmode == 'false') {
        darkmode = 'true' 
    } else {
        darkmode = 'false'
    }
    SetDarkMode()
}

function SetDarkMode() {
    let $btn = document.getElementById('btn_darkmode')

    if (darkmode == 'true') {
        document.body.classList.remove('darkMode')
        $btn.innerText = 'dark_mode'
    } else {
        document.body.classList.add('darkMode')
        $btn.innerText = 'light_mode'
    }

    localStorage.setItem("darkmode", darkmode)
}
