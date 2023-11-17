// icons
const sunIcon = $("#sun_icon")
const moonIcon = $("#moon_icon")
// button
const themeBtn = $(".theme_button")
// radio buttons
const lightRadio = $("#light_mode")
const darkRadio = $("#dark_mode")


// set local storage the theme
// true = light
// false = dark

// set items for dark mode
const setItemsToDark = () => {
    // if checked then turn to dark mode
    // set icon
    $(moonIcon).addClass('theme_set')
    $(darkRadio).attr({ "checked": true })
    // false = dark theme
    localStorage.setItem('labcloudTheme', false)

    // reset Light mode
    $(sunIcon).removeClass('theme_set')
    $(lightRadio).attr({ "checked": false })
}

// set items for light mode
const setItemsToLight = () => {
    // set to light mode
    $(sunIcon).addClass('theme_set')
    $(lightRadio).attr({ "checked": true })
    // true = light theme
    localStorage.setItem('labcloudTheme', true)
    // remove moon
    $(moonIcon).removeClass('theme_set')
    $(darkRadio).attr({ "checked": false })
}


// load theme
const loadTheme = () => {
    // set local Storage
    let gotTheme = JSON.parse(localStorage.getItem('labcloudTheme'))

    if (gotTheme) {
        setItemsToLight()
    } else {
        setItemsToDark()
    }
}


$(function () {

    // this file is specifically for controlling the theme
    themeBtn.on('click', (e) => {
        // check to see if is already active
        if (lightRadio.attr('checked')) {
            setItemsToDark()
        } else {
            setItemsToLight()
        }
    })


    // load theme on load
    loadTheme()

    // end of doc ready
})