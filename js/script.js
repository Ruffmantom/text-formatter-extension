const textInput = $("#text_input");
const textOutput = $("#text_output");
const prefixText = $("#prefix_input");
const suffixText = $("#suffix_input");
const generatePassBtn = $("#generate_password");
const passwordLength = $("#char-num");
const clearOutPutBtn = $("#clear_output");
const separatorSelector = $("#separator_selector");
const caseSelector = $("#case_selector");
const tabElm = $(".tab")
const tabNavBtnElm = $(".tab_nav_button")
const fromField = $("#from_selector")
const toField = $("#to_selector")
const conversionField = $("#conversion_input")
const hexInputElm = $("#hex-input")
const rgbInputElm = $("#rgb-ouput")
const cmykInputElm = $("#cmyk-output")
const copyUpperTextBtn = $("#copy_upper_txt_btn")
const prefixClearBtn = $("#prefix_clear")
const suffixClearBtn = $("#suffix_clear")
const settingsBtn = $("#settings_button")
const closeBtn = $('#close_settings_btn')
const settingsModalCont = $('#settings_modal_cont')
const menuBtnElm = $('.menu_btn')
let menuIsOpen = false;


var chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$)(-_";
const makePassword = (len) => {
    let pass = "";
    for (var i = 0; i < len; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
};


function findAndReplaceLinks(text) {
    // Regular expression to find URLs
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*\b/g;
    // Replace URLs with anchor tags
    const textWithLinks = text.replace(urlRegex, (url) => {
        let a = url.split("//")[1]
        let name = a.split('/')[0]

        return `<a class="note_text_link" href="${url}" target="_blank">
        ${name} 
        
        </a>`;
    });

    return textWithLinks;
}

// Converts an RGB color to CMYK color representation.
function rgbToCmyk(red, green, blue) {
    if (red === 0 && green === 0 && blue === 0)
        return [0, 0, 0, 1];

    const normalizedRed = 1 - red / 255;
    const normalizedGreen = 1 - green / 255;
    const normalizedBlue = 1 - blue / 255;

    const minChannel = Math.min(normalizedRed, Math.min(normalizedGreen, normalizedBlue));
    const cyan = (normalizedRed - minChannel) / (1 - minChannel);
    const magenta = (normalizedGreen - minChannel) / (1 - minChannel);
    const yellow = (normalizedBlue - minChannel) / (1 - minChannel);
    const black = minChannel;

    return [cyan.toFixed(4), magenta.toFixed(4), yellow.toFixed(4), black.toFixed(4)];
}

// Converts a hex color code to an RGB color string.
function hexToRgb(hex, decimal) {
    hex = hex.replace("#", "").trim();
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    let decimalOutput = `${(red / 255).toPrecision(4)} ${(green / 255).toPrecision(4)} ${(blue / 255).toPrecision(4)}`
    if (decimal) {
        return decimalOutput;
    } else {
        return `${red},${green},${blue}`;
    }
}

// Calculates and prints the CMYK color representation of a given hex color.
const getCMYK = (hex) => {
    const rgb = hexToRgb(hex, false);
    const cmykValues = rgbToCmyk(...rgb.split(","));
    return cmykValues.join(' ')
};



$(function () {
    let isSuccess = false;
    // load in values from Local Storage
    const startApp = async () => {
        try {
            await loadFromLocalStorage()
            await loadNotesFromLocalStorage()
            await loadTodosFromLocalStorage()

            isSuccess = true
        } catch (error) {
            // console.log(error)
        }
    }
    startApp()
    // variables start here so we can see if Global Values are loaded in
    let textVal = globalValues.textVal || "";
    let suffix = globalValues.suffix || "";
    let prefix = globalValues.prefix || "";
    let hex = globalValues.hexInputVal || "";
    let rgb = globalValues.rgbOutput || "";
    let cmyk = globalValues.cmykOutput || "";
    let passLength = globalValues.passLength || 10;
    let separator = globalValues.separator || "_";
    let outputCase = globalValues.outputCase || "Lower Case";
    // Load data into the DOM
    const loadDataIntoElements = () => {
        $(textInput).val(globalValues.textVal || textVal);
        $(suffixText).val(globalValues.suffix || suffix);
        $(prefixText).val(globalValues.prefix || prefix);
        $(separatorSelector).val(globalValues.separator || separator).change();
        $(caseSelector).val(globalValues.outputCase || outputCase).change();
        $(hexInputElm).val(hex)
        $(rgbInputElm).val(rgb)
        $(cmykInputElm).val(cmyk)
        // Check current tab to display the value in the output box
        if (globalValues.currentTab === 'one') {
            $(textOutput).val(globalValues.outputValueText || "");
        } else if (globalValues.currentTab === "two") {
            $(textOutput).val(globalValues.outputValuePassword || "");
        } else {
            $(textOutput).val(globalValues.outputValueConversion || "");
        }


        // Password tab
        $(passwordLength).val(globalValues.passLength || "");
        // Conversion tab
        $(fromField).val(globalValues.conversionFrom || "").change();
        $(toField).val(globalValues.conversionTo || "").change();
        $(conversionField).val(globalValues.conversionInputValue || "").change();

    };

    loadDataIntoElements()


    //init tab array
    const tabElmArr = Array.from(tabElm);
    const tabBtnArr = Array.from(tabNavBtnElm);
    // click tab functionality
    const removeClass = (elmArr, className) => {
        elmArr.forEach(elm => {
            $(elm).removeClass(className)
        })
    }

    // load current tab
    const loadTab = () => {
        // remove class from all btns
        removeClass(tabBtnArr, 'nav_tab_active')
        // loop though buttons and activate one that matches local data
        tabBtnArr.forEach((btn) => {
            $(btn).data('tab') === globalValues.currentTab ? $(btn).addClass('nav_tab_active') : ''
        })
        if (globalValues.currentTab === "two" || globalValues.currentTab === "four" || globalValues.currentTab === "five" || globalValues.currentTab === "six") {
            $("#lower_copy_textarea_cont").hide()
        } else {
            $("#lower_copy_textarea_cont").show()
        }
        // loop through the tab elements and display
        // the one that matches local data
        tabElmArr.forEach(tab => {
            // remove active from tab
            // add class to clicked id
            $(tab).data('tab') !== globalValues.currentTab ? $(tab).removeClass('tab_active') : $(tab).addClass('tab_active')
        })
    }
    // load tabs
    loadTab()
    // hiding or showing tabs
    tabBtnArr.forEach((btn) => {
        $(btn).click((e) => {
            let tabId = $(e.target).data('tab')
            // save current tab to local storage
            globalValues.currentTab = tabId
            saveToLocalStorage(DATA_NAME, globalValues)
            // remove class from all btns
            removeClass(tabBtnArr, 'nav_tab_active')
            // add active from nav Btn
            $(e.target).addClass('nav_tab_active')
            // hide large copy box if tab is on 2
            if (tabId === "two" || tabId === "four" || tabId === "five") {
                $("#lower_copy_textarea_cont").hide()
            } else {
                $("#lower_copy_textarea_cont").show()
            }

            // handle menu if open
            closeMenu()

            tabElmArr.forEach(tab => {
                // remove active from tab
                // add class to clicked id
                $(tab).data('tab') !== tabId ? $(tab).removeClass('tab_active') : $(tab).addClass('tab_active')
            })
            // set output val to corresponding tab
            if (tabId === 'one') {
                $(textOutput).val(globalValues.outputValueText || "");
            } else if (tabId === "two") {
                $(textOutput).val(globalValues.outputValuePassword || "");
            } else {
                $(textOutput).val(globalValues.outputValueConversion || "");
            }
        })
    })
    // conversion setup
    // Event listener for the 'from' select element
    $('#from_selector').change(function () {
        // Get the selected option
        var selectedOption = $(this).find('option:selected').text();

        // Check if the same option is selected in the 'to' select element
        if ($('#to_selector option:selected').text() === selectedOption) {
            // Change the selection in the 'to' select element to the first option
            $('#to_selector option:first').prop('selected', true);
        }
    });

    // Event listener for the 'to' select element
    $('#to_selector').change(function () {
        // Get the selected option
        var selectedOption = $(this).find('option:selected').text();

        // Check if the same option is selected in the 'from' select element
        if ($('#from_selector option:selected').text() === selectedOption) {
            // Change the selection in the 'from' select element to the first option
            $('#from_selector option:first').prop('selected', true);
        }
    });

    // Event listener for the 'from' select element
    $('#from_selector').change(function () {
        convertUnits();
    });

    // Event listener for the 'to' select element
    $('#to_selector').change(function () {
        convertUnits();
    });

    // Event listener for the input field
    $('#conversion_input').on('input', function () {
        convertUnits();
    });

    function convertUnits() {
        // Get the selected options
        var fromOption = $('#from_selector').find('option:selected').text();
        var toOption = $('#to_selector').find('option:selected').text();
        // Get the value from the input field
        var inputValue = parseFloat($('#conversion_input').val());
        // save selected options to local storage
        globalValues.conversionFrom = fromOption
        globalValues.conversionTo = toOption
        globalValues.conversionInputValue = inputValue
        saveToLocalStorage(DATA_NAME, globalValues)

        // Perform the conversion calculation based on the selected options and input value
        var result = performConversion(fromOption, toOption, inputValue);

        // Update the result on the page or do something with it
        // // console.log(result);
        $(textOutput).val("");
        // // return value
        result.toString() === "NaN" ? $(textOutput).val('') : $(textOutput).val(result);
    }

    function performConversion(fromUnit, toUnit, value) {
        // lookup table for conversions
        var conversionRates = {
            'Millimeters': {
                'Centimeters': 1 / 10,
                'Inches': 1 / 25.4,
                'Feet': 1 / 304.8,
                'Points': 2.835,
                'Yards': 1 / 914.4  // Millimeters to Yards
            },
            'Centimeters': {
                'Millimeters': 10,
                'Inches': 1 / 2.54,
                'Feet': 1 / 30.48,
                'Points': 28.346,
                'Yards': 1 / 91.44   // Centimeters to Yards
            },
            'Inches': {
                'Centimeters': 2.54,
                'Millimeters': 25.4,
                'Feet': 1 / 12,
                'Points': 72,
                'Yards': 1 / 36      // Inches to Yards
            },
            'Feet': {
                'Centimeters': 30.48,
                'Millimeters': 304.8,
                'Inches': 12,
                'Points': 864,
                'Yards': 1 / 3       // Feet to Yards
            },
            'Points': {
                'Centimeters': 1 / 28.346,
                'Millimeters': 1 / 2.835,
                'Inches': 1 / 72,
                'Feet': 1 / 864,
                'Yards': 1 / 1296    // Points to Yards
            },
            'Yards': {
                'Millimeters': 914.4, // Yards to Millimeters
                'Centimeters': 91.44, // Yards to Centimeters
                'Inches': 36,         // Yards to Inches
                'Feet': 3,            // Yards to Feet
                'Points': 1296        // Yards to Points
            }
        };

        var conversionRate = conversionRates[fromUnit][toUnit];
        var result = value * conversionRate;
        // save result to the Local Storage
        globalValues.outputValueConversion = result
        saveToLocalStorage(DATA_NAME, globalValues)
        // return result
        return result;
    }
    // ---------------------
    // format text function

    // ***** helper functions *****
    // function will take in a string from example: "Wood 3/4" 
    // -- finds any forward slashes then takes the numbers in 
    // -- front and after the forward slash, divides the numbers 
    // -- and returns the result back into the string
    function divideNumbersInString(inputString) {
        const regex = /(\d+)\/(\d+)/g; // Regular expression with the global flag to match all fractions
        const matches = inputString.match(regex);

        if (!matches) {
            return inputString;
        }

        let resultString = inputString;

        for (const match of matches) {
            const [numerator, denominator] = match.split('/').map(Number);

            if (denominator === 0) {
                return "Division by zero is not allowed.";
            }

            const result = numerator / denominator;
            resultString = resultString.replace(match, result);
        }

        return resultString;
    }


    const returnInch = (t) => {
        return t.replace(/"/g, 'in')
    }

    const returnFoot = (t) => {
        return t.replace(/'/g, 'ft')
    }

    const returnCust = (t) => {
        return t.replace(/custom/gi, 'cust')
    }
    const returnLetterP = (t) => {
        return t.replace(/\./g, "p")
    }

    const checkSettings = (text) => {
        let output = text;


        if (settings.customToCust) {
            // console.log(settings.customToCust)
            let a = returnCust(output)
            output = a
            // console.log("settings.customToCust: " + output)
        }

        if (settings.fractionToDecimal) {
            let a = divideNumbersInString(output)
            output = a
            // console.log("settings.fractionToDecimal: " + output)
        }

        if (settings.dubQuotesToIn) {
            let a = returnInch(output)
            output = a
            // console.log("settings.dubQuotesToIn: " + output)
        }

        if (settings.sQuoteToFt) {
            let a = returnFoot(output)
            output = a
            // console.log("settings.sQuoteToFt: " + output)
        }

        if (settings.decimalToLetter) {
            let a = returnLetterP(output)
            output = a
            // console.log("settings.decimalToLetter: " + output)
        }

        return output
    }

    // format text function

    const formatText = (text, sep, preSuf) => {
        if (preSuf === true) {
            // text coming in from prefix or suffix
            let textA = text.split(" ");

            let textB = textA.map(item => {
                let textC = checkSettings(item);

                textC = textC.replace(/[^\w\s]/gi, " ").replace(/\s+/g, " ").trim(" ");
                textC = textC.split(" ").join(sep);

                return textC
            });

            return textB.join(sep);
        } else {
            // This is if text is coming in from textbox
            let textA = text.split("\n");

            let textB = textA.map(item => {
                let textC = checkSettings(item);

                textC = textC.replace(/[^\w\s]/gi, " ").replace(/\s+/g, " ").trim(" ");
                textC = textC.split(" ").join(sep);
                textC = `${formatText(prefix, sep, true) ? formatText(prefix, sep, true) + sep : ""}${textC ? textC : ""}${formatText(suffix, sep, true) ? sep + formatText(suffix, sep, true) : ""}`

                return textC
            });

            return textB.join("\n");
        }
    }



    // clear output on click
    const clearValues = () => {
        // clear variables
        textVal = defaultValues.textVal;
        prefix = defaultValues.prefix;
        suffix = defaultValues.suffix;
        passLength = defaultValues.passLength;
        separator = defaultValues.separator;
        // clear inputs
        $(textOutput).val(defaultValues.outputValueText); //sets to empty string
        $(prefixText).val(defaultValues.prefix);
        $(suffixText).val(defaultValues.suffix);
        $(textInput).val(defaultValues.textVal);
        $(passwordLength).val(defaultValues.passLength);
        $(conversionField).val(defaultValues.conversionInputValue);
        $(hexInputElm).val(defaultValues.hexInputVal)
        $(rgbInputElm).val(defaultValues.rgbOutput)
        $(cmykInputElm).val(defaultValues.cmykOutput)
        // reset selections
        $(separatorSelector).val(defaultValues.separator).change();
        $(caseSelector).val(defaultValues.outputCase).change();
        $(fromField).val(defaultValues.conversionFrom).change();
        $(toField).val(defaultValues.conversionTo).change();
        // clear local state
        resetLocalStorage()
    };


    // generate text formatter function
    const generateTextOutput = () => {
        // first clear input
        $(textOutput).val("");
        let outputVal = formatText(textVal ? textVal : "", separator, false)
        // console.log("generateTextOutput: " + outputVal)
        // case type output and save to local storage
        if (outputCase === "Lower Case") {
            $(textOutput).val(outputVal.toLowerCase())
            // save to local storage
            globalValues.outputValueText = outputVal.toLowerCase()
            saveToLocalStorage(DATA_NAME, globalValues)
        } else if (outputCase === 'Upper Case') {
            $(textOutput).val(outputVal.toUpperCase())
            // save to local storage
            globalValues.outputValueText = outputVal.toUpperCase()
            saveToLocalStorage(DATA_NAME, globalValues)
        } else {
            // else if selected no format then output text normal
            $(textOutput).val(outputVal)
            // save to local storage
            globalValues.outputValueText = outputVal
            saveToLocalStorage(DATA_NAME, globalValues)
        }
    };
    // generate password function
    const generatePasswordOutput = () => {

        let currPass = makePassword(passLength)
        $(textOutput).val(currPass);
        // save to local storage to access later
        globalValues.outputValuePassword = currPass
        saveToLocalStorage(DATA_NAME, globalValues)
    };
    // copy function
    $(".textarea_cont").on("click", (e) => {
        copyFunction(e, ".textarea_cont", "#text_output")
    });


    // **** Actions ****
    // copy button for upper text box.
    $(copyUpperTextBtn).on('click', (e) => {
        copyFunction(e, "copy_upper_txt_btn", "#text_input")
    })
    // when click on or when text_input is active select all
    $(textInput).on('click', () => {
        $(textInput).select();
    })
    // set separator
    separatorSelector.on('change', (e) => {
        separator = e.target.value;
        // save to local storage to access later
        globalValues.separator = e.target.value
        saveToLocalStorage(DATA_NAME, globalValues)
        // generate output
        generateTextOutput();
    });
    // set output case
    caseSelector.on('change', (e) => {
        outputCase = e.target.value;
        // save to local storage to access later
        globalValues.outputCase = e.target.value
        saveToLocalStorage(DATA_NAME, globalValues)
        // generate output
        generateTextOutput();
    });
    // prefix setup
    prefixText.on("keyup change", (e) => {
        let a = e.target.value;
        prefix = a
        // save to local storage to access later
        globalValues.prefix = a
        saveToLocalStorage(DATA_NAME, globalValues)
        // generate output
        generateTextOutput();
    });
    // prefix setup
    suffixText.on("keyup change", (e) => {
        let a = e.target.value;
        suffix = a
        // save to local storage to access later
        globalValues.suffix = a
        saveToLocalStorage(DATA_NAME, globalValues)
        // generate output
        generateTextOutput();
    });

    // main input setup
    textInput.on("keyup change", (e) => {
        // might need to make a function for converting string
        // to update when changing the separator
        let a = e.target.value;
        textVal = a
        // save to local storage to access later
        globalValues.textVal = a
        saveToLocalStorage(DATA_NAME, globalValues)
        // generate output
        generateTextOutput();
    });
    // password length input
    passwordLength.on("keyup change", (e) => {
        let a = e.target.value;
        passLength = a;
        // save to local storage to access later
        globalValues.passLength = a
        saveToLocalStorage(DATA_NAME, globalValues)
    });
    // generate on click
    generatePassBtn.on("click", (e) => {
        generatePasswordOutput();
    });
    // copy function
    const copyFunction = (e, element, copyElm) => {
        // console.log("Clicked " + element + " and about to copy: " + copyElm)
        if (e && $(copyElm).val() !== "") {
            $(copyElm).select();
            document.execCommand("copy");
            sendNotification('', 5000, 'Copied!')
        }
    }

    // ----------------
    // Color Creator
    // listener for color hex input
    $("#hex-input").on('input', function () {
        let hexCode = hexInputElm.val()
        if (!hexCode || hexCode === "") {
            hexInputElm.val('')
            return
        }
        let rgb = hexToRgb(hexCode, true)
        let cmyk = getCMYK(hexCode)
        $(rgbInputElm).val(rgb)
        $(cmykInputElm).val(cmyk)
        // local Storage saving
        globalValues.hexInputVal = hexCode
        globalValues.rgbOutput = rgb
        globalValues.cmykOutput = cmyk
        saveToLocalStorage(DATA_NAME, globalValues)
    })
    // output listener for on clicks
    $(rgbInputElm).on('click', (e) => {
        copyFunction(e, "#color_copy_rgb", "#rgb-ouput")
    })

    $(cmykInputElm).on('click', (e) => {
        copyFunction(e, "#color_copy_cmyk", "#cmyk-output")
    })



    // Suffix and prefix clears
    $(prefixClearBtn).on('click', () => {
        prefix = defaultValues.prefix;
        $(prefixText).val(defaultValues.prefix);
        clearStoragePrefix(globalValues)
        // recreate output
        generateTextOutput()
    })

    $(suffixClearBtn).on('click', () => {
        suffix = defaultValues.suffix;
        $(suffixText).val(defaultValues.suffix);
        clearStorageSuffix(globalValues)
        // recreate output
        generateTextOutput()
    })

    // setting button actions
    $(settingsBtn).on('click', () => {
        if ($(settingsModalCont).hasClass("modal_active")) {
            $(settingsModalCont).removeClass('modal_active')
        } else {
            $(settingsModalCont).addClass('modal_active')
            // handle menu
            closeMenu()
        }
    })
    $(closeBtn).on('click', () => {
        if ($(settingsModalCont).hasClass("modal_active")) {
            $(settingsModalCont).removeClass('modal_active')

        }
    })



    // custom to cust
    $(settingsCustomCheck).on('change', (e) => {
        settings.customToCust = $(e.target).is(':checked')
        // recreate output
        generateTextOutput()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })

    // double quotes to inches
    $(settingsDoubleQuotesCheck).on('change', (e) => {
        settings.dubQuotesToIn = $(e.target).is(':checked')
        // recreate output
        generateTextOutput()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })

    // single quotes to inches
    $(settingsSingleQuotesCheck).on('change', (e) => {
        settings.sQuoteToFt = $(e.target).is(':checked')
        // recreate output
        generateTextOutput()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })

    // decimal to letter "P"
    $(settingsDecimalCheck).on('change', (e) => {
        settings.decimalToLetter = $(e.target).is(':checked')
        // recreate output
        generateTextOutput()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })

    // fractions to decimals
    $(settingsFractionToDec).on('change', (e) => {
        settings.fractionToDecimal = $(e.target).is(':checked')
        // recreate output
        generateTextOutput()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })


    // clear data
    clearOutPutBtn.on("click", (e) => {
        e.preventDefault()
        // console.log('CLEARING VALUES')
        clearValues()
    });

    menuBtnElm.on('click', () => {
        if (menuIsOpen) {
            // close menu
            // close menu
            closeMenu()
        } else {
            // open menu
            $(".menu_sidebar").addClass("menu_open")
            // add class to menu button
            $(menuBtnElm).parent().addClass('menu_btn_active')
            menuIsOpen = true
        }

        // close todo list menu
        $(document).on("click", function (event) {
            // Check if the click event target is not within the menu
            if (!$(".menu_sidebar").is(event.target) && menuIsOpen && !menuBtnElm.is(event.target) && $(".menu_sidebar").has(event.target).length === 0) {
                // close menu
                closeMenu()
            }
        });
    })

    const closeMenu = () => {
        if (menuIsOpen) {
            $(".menu_sidebar").removeClass("menu_open")
            // remove class to menu button
            $(menuBtnElm).parent().removeClass('menu_btn_active')
            menuIsOpen = false
        }
    }
    // open the todo list menu


    // end of Doc Ready
});
