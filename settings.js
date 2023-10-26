// default settings always on
// settings checkbox's
const settingsDoubleQuotesCheck = $("#settings_double_quotes")
const settingsSingleQuotesCheck = $("#settings_single_quotes")
const settingsCustomCheck = $("#settings_custom")
const settingsDecimalCheck = $("#settings_decimal")
const settingsFractionToDec = $("#settings_frac_to_dec")

let settings = {
    fractionToDecimal: true,
    decimalToLetter: true,
    dubQuotesToIn: true,
    sQuoteToFt: true,
    customToCust: true,
}

// on load
$(() => {
    // settings are established when the user changes them
    // need to load in settings on load.
    if (localStorage.getItem(TF_SETTINGS)) {
        // if present then load
        let loadedSettings = JSON.parse(localStorage.getItem(TF_SETTINGS))
        // set current settings
        settings.fractionToDecimal = loadedSettings.fractionToDecimal
        settings.decimalToLetter = loadedSettings.decimalToLetter
        settings.dubQuotesToIn = loadedSettings.dubQuotesToIn
        settings.sQuoteToFt = loadedSettings.sQuoteToFt
        settings.customToCust = loadedSettings.customToCust
        // set checkboxes
        if (loadedSettings.fractionToDecimal) {
            $(settingsFractionToDec).prop("checked", true)

        } else {
            $(settingsFractionToDec).prop("checked", false)

        }
        if (loadedSettings.decimalToLetter) {
            $(settingsDecimalCheck).prop("checked", true)

        } else {
            $(settingsDecimalCheck).prop("checked", false)

        }
        if (loadedSettings.dubQuotesToIn) {
            $(settingsDoubleQuotesCheck).prop("checked", true)

        } else {
            $(settingsDoubleQuotesCheck).prop("checked", false)

        }
        if (loadedSettings.sQuoteToFt) {
            $(settingsSingleQuotesCheck).prop("checked", true)

        } else {
            $(settingsSingleQuotesCheck).prop("checked", false)

        }
        if (loadedSettings.customToCust) {
            $(settingsCustomCheck).prop("checked", true)

        } else {
            $(settingsCustomCheck).prop("checked", false)

        }
    }

})


