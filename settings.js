// default settings always on
// no actions in this file

let settings = {
    fractionToDecimal: true,
    decimalToLetter: true,
    dubQuotesToIn: true,
    sQuoteToFt: true,
    customToCust: true,
}

// on load
$(() => {
    saveToLocalStorage(TF_SETTINGS, settings)

})
