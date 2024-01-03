// default settings always on
// settings checkbox's
const settingsDoubleQuotesCheck = $("#settings_double_quotes")
const settingsSingleQuotesCheck = $("#settings_single_quotes")
const settingsCustomCheck = $("#settings_custom")
const settingsSortIdWithNamePpCheck = $("#settings_sort_id_with_name_pp")
const settingsSortIdWithNamePoCheck = $("#settings_sort_id_with_name_po")
const settingsDecimalCheck = $("#settings_decimal")
const settingsFractionToDec = $("#settings_frac_to_dec")
const clearAllSettingsBtn = $("#settings_clear_all_data")

let settings = {
    fractionToDecimal: true,
    decimalToLetter: true,
    dubQuotesToIn: true,
    sQuoteToFt: true,
    customToCust: true,
    useSortIdWithNamePp: false,
    useSortIdWithNamePo: false,
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
        settings.useSortIdWithNamePp = loadedSettings.useSortIdWithNamePp
        settings.useSortIdWithNamePo = loadedSettings.useSortIdWithNamePo
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
        if (loadedSettings.useSortIdWithNamePp) {
            $(settingsSortIdWithNamePpCheck).prop("checked", true)

        } else {
            $(settingsSortIdWithNamePpCheck).prop("checked", false)

        }
        if (loadedSettings.useSortIdWithNamePo) {
            $(settingsSortIdWithNamePoCheck).prop("checked", true)

        } else {
            $(settingsSortIdWithNamePoCheck).prop("checked", false)

        }
    }

    $(clearAllSettingsBtn).on('click', (e) => {
        e.preventDefault()
        localStorage.removeItem("DATA_NAME")
        localStorage.removeItem("TF_SETTINGS")
        localStorage.removeItem("TF_NOTES")
        localStorage.removeItem("TF_N_S")
        localStorage.removeItem("TF_TODOS")
        localStorage.removeItem("TF_DATA")
        localStorage.removeItem("TF_PO_DATA")
        location.reload();
    })

    
})


