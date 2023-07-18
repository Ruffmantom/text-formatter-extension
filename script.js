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


var chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!#$)(-_";
const makePassword = (len) => {
    let pass = "";
    for (var i = 0; i < len; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    // console.log(pass);
    return pass;
};


$(function () {
    let isSuccess = false;
    // load in values from Local Storage
    const startApp = async () => {
        try {
            await loadFromLocalStorage()
            isSuccess = true
        } catch (error) {
            console.log(error)
        }
    }
    startApp()
    // variables start here so we can see if Global Values are loaded in
    let textVal = globalValues.textVal || "";
    let suffix = globalValues.suffix || "";
    let prefix = globalValues.prefix || "";
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
            saveToLocalStorage(globalValues)
            // remove class from all btns
            removeClass(tabBtnArr, 'nav_tab_active')
            // add active from nav Btn
            $(e.target).addClass('nav_tab_active')

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
        saveToLocalStorage(globalValues)

        // Perform the conversion calculation based on the selected options and input value
        var result = performConversion(fromOption, toOption, inputValue);

        // Update the result on the page or do something with it
        // console.log(result);
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
                'Points': 2.835
            },
            'Centimeters': {
                'Millimeters': 10,
                'Inches': 1 / 2.54,
                'Feet': 1 / 30.48,
                'Points': 28.346
            },
            'Inches': {
                'Centimeters': 2.54,
                'Millimeters': 25.4,
                'Feet': 1 / 12,
                'Points': 72
            },
            'Feet': {
                'Centimeters': 30.48,
                'Millimeters': 304.8,
                'Inches': 12,
                'Points': 864
            },
            'Points': {
                'Centimeters': 1 / 28.346,
                'Millimeters': 1 / 2.835,
                'Inches': 1 / 72,
                'Feet': 1 / 864
            }
        };

        var conversionRate = conversionRates[fromUnit][toUnit];
        var result = value * conversionRate;
        // save result to the Local Storage
        globalValues.outputValueConversion = result
        saveToLocalStorage(globalValues)
        // return result
        return result;
    }
    // ---------------------
    // format text function
    const formatText = (text) => {
        // text could come in with line breaks
        // split the text into an array
        // then loop through array and remove special characters
        // add the separators
        // then join the array back into a string with the line breaks
        let a = text.split("\n");
        let b = a.map((item) => {
            let i = item.replace(/[^\w\s]/gi, " ").replace(/\s+/g, separator).trim();
            let o = `${prefix ? prefix + separator : ""}${i ? i : ""}${suffix ? separator + suffix : ""}`
            return o
        });
        let output = b.join("\n");
        return output;
    }
    // set separator
    separatorSelector.on('change', (e) => {
        separator = e.target.value;
        // generate output
        generateTextOutput();
        // save to local storage to access later
        globalValues.separator = e.target.value
        saveToLocalStorage(globalValues)
    });
    // set output case
    caseSelector.on('change', (e) => {
        outputCase = e.target.value;
        // generate output
        generateTextOutput();
        // save to local storage to access later
        globalValues.outputCase = e.target.value
        saveToLocalStorage(globalValues)
    });
    // prefix setup
    prefixText.on("keyup change", (e) => {
        let a = e.target.value;
        prefix = a
        // generate output
        generateTextOutput();
        // save to local storage to access later
        globalValues.prefix = a
        saveToLocalStorage(globalValues)
    });
    // prefix setup
    suffixText.on("keyup change", (e) => {
        let a = e.target.value;
        suffix = a
        // generate output
        generateTextOutput();
        // save to local storage to access later
        globalValues.suffix = a
        saveToLocalStorage(globalValues)
    });

    // main input setup
    textInput.on("keyup change", (e) => {
        // might need to make a function for converting string
        // to update when changing the separator
        let a = e.target.value;
        textVal = a
        // generate output
        generateTextOutput();
        // save to local storage to access later
        globalValues.textVal = a
        saveToLocalStorage(globalValues)
    });
    // password length input
    passwordLength.on("keyup change", (e) => {
        let a = e.target.value;
        passLength = a;
        // save to local storage to access later
        globalValues.passLength = a
        saveToLocalStorage(globalValues)
    });
    // generate on click
    generatePassBtn.on("click", (e) => {
        generatePasswordOutput();
    });

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
        // reset selections
        $(separatorSelector).val(defaultValues.separator).change();
        $(caseSelector).val(defaultValues.outputCase).change();
        $(fromField).val(defaultValues.conversionFrom).change();
        $(toField).val(defaultValues.conversionTo).change();
        // clear local state
        resetLocalStorage()
    };

    clearOutPutBtn.on("click", (e) => {
        clearValues()
    });
    // generate text formatter function
    const generateTextOutput = () => {
        // first clear input
        $(textOutput).val("");
        let outputVal = formatText(textVal ? textVal : "")
        // case type output and save to local storage
        if (outputCase === "Lower Case") {
            $(textOutput).val(outputVal.toLowerCase())
            // save to local storage
            globalValues.outputValueText = outputVal.toLowerCase()
            saveToLocalStorage(globalValues)
        } else if (outputCase === 'Upper Case') {
            $(textOutput).val(outputVal.toUpperCase())
            // save to local storage
            globalValues.outputValueText = outputVal.toUpperCase()
            saveToLocalStorage(globalValues)
        } else {
            // else if selected no format then output text normal
            $(textOutput).val(outputVal)
            // save to local storage
            globalValues.outputValueText = outputVal
            saveToLocalStorage(globalValues)
        }
    };
    // generate password function
    const generatePasswordOutput = () => {
        
        let currPass = makePassword(passLength)
        $(textOutput).val(currPass);
        // save to local storage to access later
        globalValues.outputValuePassword = currPass
        saveToLocalStorage(globalValues)
    };
    // copy function
    let timer;
    $(".textarea_cont").on("click", (e) => {
        if (e && $("#text_output").val() !== "") {
            $(textOutput).select();
            document.execCommand("copy");
            $(".notification").slideDown();
            timer = setTimeout(() => {
                $(".notification").slideUp();
                clearTimeout(timer)
            }, 5000);
        }
    });
});
