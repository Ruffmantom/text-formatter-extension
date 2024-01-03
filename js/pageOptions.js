// elements and containers
const page_parts_tab = $("#page_parts_tab")
const product_parts_tab = $("#product_parts_tab")
const add_page_part_menu = $("#add_page_part_menu")
const add_product_option_menu = $("#add_product_option_menu")
const page_part_options_cont = $("#page_part_options_cont")

// btn
const inner_tab_page_part_btn = $("#inner_tab_page_part_btn")
const inner_tab_product_part_btn = $("#inner_tab_product_part_btn")
const add_new_page_part_btn = $("#add_new_page_part_btn")
const add_new_product_option_btn = $("#add_new_product_option_btn")
const add_page_part_btn = $("#add_page_part_btn")
const add_product_option_btn = $("#add_product_option_btn")
// outputs
const page_part_order_output = $("#page_part_order_output")
const page_part_name_output = $("#page_part_name_output")
const product_option_order_output = $("#product_option_order_output")
const product_option_name_output = $("#product_option_name_output")
// clear buttons
const clear_sorting_pp_btn = $("#clear_sorting_pp_btn")
const clear_renames_pp_btn = $("#clear_renames_pp_btn")
const clear_all_pp_btn = $("#clear_all_pp_btn")

const clear_sorting_po_btn = $("#clear_sorting_po_btn")
const clear_renames_po_btn = $("#clear_renames_po_btn")
const clear_all_po_btn = $("#clear_all_po_btn")


// global values
let addPagePartMenuIsOpen = true; // by default
let addProductOptionsMenuIsOpen = false;

// helpers
// close add menu
const closeAddPagePartMenu = () => {
    if (addPagePartMenuIsOpen) {
        $(add_page_part_menu).removeClass("active");
        addPagePartMenuIsOpen = false
    }
}

const copyOutputFunction = (e, copyElm) => {
    if (e && $(copyElm).val() !== "") {
        $(copyElm).select();
        document.execCommand("copy");
        sendNotification('fast', 5000, 'Copied!')
    }
}

// close the Add Product Option Menu
const closeAddProductOptionMenu = () => {
    if (addProductOptionsMenuIsOpen) {
        $(add_product_option_menu).removeClass("active");
        addProductOptionsMenuIsOpen = false
    }
}

const clearSortAndRenameInputs = (inputType, tab) => {
    // variables
    let renameInputsArr = Array.from($(".page_option_rename_input"))
    let sortInputsArr = Array.from($(".po_sort_input"))

    if (inputType === "sort") {
        sortInputsArr.forEach(elm => {
            if ($(elm).data("potype") === tab && $(elm).data("inputtype") === "sort") {
                $(elm).val("")
            }
        })

    }
    if (inputType === "rename") {
        renameInputsArr.forEach(elm => {
            if ($(elm).data("potype") === tab && $(elm).data("inputtype") === "rename") {
                $(elm).val("")
            }
        })
    }
    if (inputType === "all") {
        renameInputsArr.concat(sortInputsArr).forEach(elm => {
            $(elm).val("")
        })
    }

    if (tab === "pp") {
        globalPageOptionData.pageParts.forEach(item => {
            if (inputType === "rename") {
                item.rename = ""
            }
            if (inputType === "sort") {
                item.newSortId = null
            }
            if (inputType === "all") {
                item.rename = ""
                item.newSortId = null
            }
        })
    } else {
        globalPageOptionData.productOptions.forEach(item => {
            if (inputType === "rename") {
                item.rename = ""
            }
            if (inputType === "sort") {
                item.newSortId = null
            }
            if (inputType === "all") {
                item.rename = ""
                item.newSortId = null
            }
        })
    }

    // // save to local
    // // save to local storage
    saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
    // load html
    loadOutputs()
}

// switch tabs
const switchPageOptionTabs = (value) => {
    $(".inner_tab_item").removeClass("active");
    $(`.inner_tab_item[data-pagetabid='${value}']`).addClass("active");

    if (value === "page") {
        closeAddProductOptionMenu()
        $(product_parts_tab).removeClass("active");
        $(page_parts_tab).addClass("active");
        globalPageOptionData.po_tab_open = "pp"
        saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
    } else {
        closeAddPagePartMenu()
        $(page_parts_tab).removeClass("active");
        $(product_parts_tab).addClass("active");
        globalPageOptionData.po_tab_open = "po"
        saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
    }
};
// load oaen tab
const loadTab = () => {
    $(".inner_tab_item").removeClass("active");
    if (globalPageOptionData.po_tab_open === "pp") {
        $(`.inner_tab_item[data-pagetabid='page']`).addClass("active");
        $(product_parts_tab).removeClass("active");
        $(page_parts_tab).addClass("active");
    } else {
        $(`.inner_tab_item[data-pagetabid='product']`).addClass("active");
        $(page_parts_tab).removeClass("active");
        $(product_parts_tab).addClass("active");
    }
}

// These will eventually be loaded by the globalPageOptionData 
const loadPagePartOptionsHTML = () => {
    $("#page_part_options_cont").empty()
    globalPageOptionData.pageParts.map((pp) => {
        $("#page_part_options_cont").append(createPageOptionRow(pp))
    })
}
// These will eventually be loaded by the globalPageOptionData 
const loadProductOptionsHTML = () => {
    $("#product_options_cont").empty()
    globalPageOptionData.productOptions.map((po) => {
        $("#product_options_cont").append(createPageOptionRow(po))
    })
}


// load sort order Output
const loadOutputs = () => {
    let pagePartOutputArr = [] // Initialize as an empty array
    let productOptionOutputArr = [] // Initialize as an empty array
    let ppSortOutput = []
    let ppNameOutput = []
    let poSortOutput = []
    let poNameOutput = []

    globalPageOptionData.pageParts.forEach(p => {
        if (parseInt(p.newSortId) > 0) {
            // move to pagePartOutputArr
            pagePartOutputArr.push(p);
        }
    })
    globalPageOptionData.productOptions.forEach(p => {
        if (parseInt(p.newSortId) > 0) {
            // move to productOptionOutputArr
            productOptionOutputArr.push(p);
        }
    })

    // now sort the outputs
    if (pagePartOutputArr.length > 0) { // Check if there are elements in the array
        // sort First
        pagePartOutputArr.sort((a, b) => a.newSortId - b.newSortId)
        // create outputs
        pagePartOutputArr.forEach(p => {
            ppSortOutput.push(p._id)
            let nameFormat = `${p.optionName}:${settings.useSortIdWithNamePp ? `${p.newSortId}. ${p.rename ? p.rename : p.optionName}` : `${p.rename ? p.rename : p.optionName}`};`
            ppNameOutput.push(nameFormat)
        })
    } else {
        // default 
    }

    if (productOptionOutputArr.length > 0) { // Check if there are elements in the array
        // sort First
        productOptionOutputArr.sort((a, b) => a.newSortId - b.newSortId)
        // create outputs
        productOptionOutputArr.forEach(p => {
            poSortOutput.push(p._id)
            let nameFormat = `${p.optionName}:${settings.useSortIdWithNamePo ? `${p.newSortId}. ${p.rename ? p.rename : p.optionName}` : `${p.rename ? p.rename : p.optionName}`};`
            poNameOutput.push(nameFormat)
        })
    }

    // now join the arrays to strings and save to global
    // save to local storage
    globalPageOptionData.pp_sort_output = ppSortOutput.join(',')
    globalPageOptionData.pp_name_output = ppNameOutput.join('')
    globalPageOptionData.po_sort_output = poSortOutput.join(',')
    globalPageOptionData.po_name_output = poNameOutput.join('')

    // set to the outputs
    globalPageOptionData.pp_sort_output !== "" ? $(page_part_order_output).val(globalPageOptionData.pp_sort_output) : $(page_part_order_output).val("Order Output...")
    globalPageOptionData.pp_name_output !== "" ? $(page_part_name_output).val(globalPageOptionData.pp_name_output) : $(page_part_name_output).val("Name Output...")
    globalPageOptionData.po_sort_output !== "" ? $(product_option_order_output).val(globalPageOptionData.po_sort_output) : $(product_option_order_output).val("Order Output...")
    globalPageOptionData.po_name_output !== "" ? $(product_option_name_output).val(globalPageOptionData.po_name_output) : $(product_option_name_output).val("Name Output...")
}


// create New page option
// Left off here
const addNewPagePartOption = (page, value) => {
    let newOptionObj = {
        optionName: value,
        isDeleteAble: true,
        rename: "",
        type: page ? "pp" : "po",
        key: createId(),
        _id: page ? globalPageOptionData.customPagePartId : globalPageOptionData.customProductOptionId,
        newSortId: null,
    }
    if (page) {
        globalPageOptionData.customPagePartId = newOptionObj._id + 1
        // save to global data
        globalPageOptionData.pageParts.push(newOptionObj)
    } else {
        globalPageOptionData.customProductOptionId = newOptionObj._id + 1
        // save to global data
        globalPageOptionData.productOptions.push(newOptionObj)

    }
    $(page_part_options_cont).animate({
        scrollTop: $(page_part_options_cont)[0].scrollHeight
    }, 150);
    // post a notification
    sendNotification('fast', 3000, `Added ${page ? `Page Part: ${value}` : `Product Option: ${value}`}`)
    // save to local storage
    saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
    loadPagePartOptionsHTML()
    loadProductOptionsHTML()
}


// on ready
$(() => {
    if (globalPageOptionData !== null) {
        loadTab()
        loadPagePartOptionsHTML()
        loadProductOptionsHTML()
        loadOutputs()
    }
    // Tab nav btn
    $(inner_tab_page_part_btn).on("click", (e) => {
        e.preventDefault()
        switchPageOptionTabs('page')
    })
    // Tab nav btn
    $(inner_tab_product_part_btn).on("click", (e) => {
        e.preventDefault()
        switchPageOptionTabs('product')
    })
    // add new page option BTN
    $(add_new_page_part_btn).on("click", (e) => {
        e.preventDefault()
        $(add_page_part_menu).addClass("active")
        addPagePartMenuIsOpen = true
    })

    // add new page option BTN
    $(add_new_product_option_btn).on("click", (e) => {
        e.preventDefault()
        $(add_product_option_menu).addClass("active")
        addProductOptionsMenuIsOpen = true
    })

    // close add page part menu
    $(document).on("click", function (event) {
        // Check if the click event target is not within the menu
        if (!add_page_part_menu.is(event.target) && addPagePartMenuIsOpen && !add_new_page_part_btn.is(event.target) && add_page_part_menu.has(event.target).length === 0) {
            closeAddPagePartMenu()
        }
    });

    // close product option menu
    $(document).on("click", function (event) {
        // Check if the click event target is not within the menu
        if (!add_product_option_menu.is(event.target) && addProductOptionsMenuIsOpen && !add_new_product_option_btn.is(event.target) && add_product_option_menu.has(event.target).length === 0) {
            closeAddProductOptionMenu()
        }
    });

    // create new page part
    $(add_page_part_btn).on('click', (e) => {
        e.preventDefault()
        let newOptionName = $("#add_page_part_input").val()
        addNewPagePartOption(true, newOptionName)
        //clear value
        $("#add_page_part_input").val("")
        // close menu
        closeAddPagePartMenu()
    })
    // create new product option part
    $(add_product_option_btn).on('click', (e) => {
        e.preventDefault()
        let newOptionName = $("#add_product_option_input").val()
        addNewPagePartOption(false, newOptionName)
        //clear value
        $("#add_product_option_input").val("")
        // close menu
        closeAddProductOptionMenu()
    })

    // delete a page option
    $(".delete_page_option_btn").on("click", (e) => {
        let optionType = $(e.target).data('potype')
        let optionId = $(e.target).data('poid')
        let optionText = $(e.target).data('poname')
        let optionKey = $(e.target).data('optionkey')

        if (optionType === "pp") {
            globalPageOptionData.pageParts = globalPageOptionData.pageParts.filter(p => p._id !== optionId)
        } else {
            globalPageOptionData.productOptions = globalPageOptionData.productOptions.filter(p => p._id !== optionId)
        }
        sendNotification('fast', 5000, `Deleted ${optionType === "pp" ? `Page Part: ${optionText}` : `Page Option: ${optionText}`}`)
        let optionRowArr = Array.from($(".page_option_item_row"))
        optionRowArr.forEach(r => {
            if ($(r).data("optionkey") === optionKey) {
                $(r).fadeOut()
            }
        })

        // save to local storage
        saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
        // load outputs
        loadOutputs()
    })

    // clear specific rename input
    $(".po_rename_clear_btn").on("click", (e) => {
        let poType = $(e.target).data("potype");
        let poId = $(e.target).data("poid");
        let renameInputsArr = Array.from($(".page_option_rename_input"))
        // clear the input
        renameInputsArr.forEach(i => {
            if ($(i).data('potype') === poType && $(i).data('poid') === poId) {
                $(i).val('')
            }
        })
        // clear value in global
        if (poType === "pp") {
            globalPageOptionData.pageParts.forEach(p => {
                if (p._id === poId) {
                    p.rename = ""
                }
            })
        } else {
            globalPageOptionData.productOptions.forEach(p => {
                if (p._id === poId) {
                    p.rename = ""
                }
            })
        }
        // save to local storage
        saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
        // reload inputs
        loadOutputs()
    })

    // clear all page part renames
    clear_sorting_pp_btn.on('click', (e) => {

        e.preventDefault()
        let tab = $(e.target).data('potype')
        clearSortAndRenameInputs('sort', tab)
    })
    // clear all page part sorting
    clear_renames_pp_btn.on('click', (e) => {
        e.preventDefault()
        let tab = $(e.target).data('potype')
        clearSortAndRenameInputs('rename', tab)
    })
    // clear all page part values
    clear_all_pp_btn.on('click', (e) => {
        e.preventDefault()
        let tab = $(e.target).data('potype')
        clearSortAndRenameInputs('all', tab)
    })

    // clear all product option renames
    clear_sorting_po_btn.on('click', (e) => {
        e.preventDefault()
        let tab = $(e.target).data('potype')
        clearSortAndRenameInputs('sort', tab)
    })
    // clear all product option sorting
    clear_renames_po_btn.on('click', (e) => {
        e.preventDefault()
        let tab = $(e.target).data('potype')
        clearSortAndRenameInputs('rename', tab)
    })
    // clear all product option values
    clear_all_po_btn.on('click', (e) => {
        e.preventDefault()
        let tab = $(e.target).data('potype')
        clearSortAndRenameInputs('all', tab)
    })


    // Event delegation for dynamically generated inputs
    $(document).on('keyup change', '.tf_input[data-inputtype]', function () {
        var poid = $(this).data('poid');
        var poType = $(this).data('potype');
        var inputType = $(this).data('inputtype');
        var inputValue = $(this).val();

        if (inputType === "sort") {
            // sort id for po has changed from original _id
            // save to global
            if (poType === "pp") {
                globalPageOptionData.pageParts.forEach(p => {
                    if (p._id === poid) {
                        p.newSortId = inputValue
                    }
                })
            } else {
                globalPageOptionData.productOptions.forEach(p => {
                    if (p._id === poid) {
                        p.newSortId = inputValue
                    }
                })
            }
        } else {
            // new name for page option
            // save to global
            if (poType === "pp") {
                globalPageOptionData.pageParts.forEach(p => {
                    if (p._id === poid) {
                        p.rename = inputValue
                    }
                })
            } else {
                globalPageOptionData.productOptions.forEach(p => {
                    if (p._id === poid) {
                        p.rename = inputValue
                    }
                })
            }
        }

        // save to local storage
        saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
        // load outputs
        loadOutputs()
    });


    $(page_part_order_output).on("click", (e) => {
        copyOutputFunction(e, page_part_order_output)
    })
    $(page_part_name_output).on("click", (e) => {
        copyOutputFunction(e, page_part_name_output)

    })
    $(product_option_order_output).on("click", (e) => {
        copyOutputFunction(e, product_option_order_output)

    })
    $(product_option_name_output).on("click", (e) => {
        copyOutputFunction(e, product_option_name_output)

    })
    // change the name of the page options
    // when list name gets clicked
    $(".page_options_cont").on("click", ".page_option_title", function () {
        // Find the parent container of the clicked element
        var poRowItem = $(this).closest(".page_option_item_row");

        // Get the value of the data-todoid attribute
        clickedPoTextType = poRowItem.data("potype");
        clickedPoTextId = poRowItem.data("poid");

        // let poEditTextInput = $(`.change_page_option_name_input[data-todoid="${clickedPoTextId}"][data-poid="${clickedPoTextType}"]`);
        var poEditTextInput = poRowItem.find(".change_page_option_name_input");


        poEditTextInput.keydown(function (event) {
            var keycode = event.keyCode ? event.keyCode : event.which;

            if (keycode == 13 && !event.shiftKey) {
                // Prevent default behavior if Enter is pressed without Shift
                event.preventDefault();
                let enteredName = $(this).val()
                console.log(clickedPoTextType)
                // Now save the value to the current po
                if (clickedPoTextType === "po") {
                    globalPageOptionData.productOptions.forEach(p => {
                        if (p._id === clickedPoTextId) {
                            p.optionName = enteredName;
                        }
                    });
                } else {
                    globalPageOptionData.pageParts.forEach(p => {
                        if (p._id === clickedPoTextId) {
                            p.optionName = enteredName;
                        }
                    });
                }

                loadPagePartOptionsHTML()
                loadProductOptionsHTML()
                console.log(globalPageOptionData)

                // Hide the input field and show the <p> tag
                poRowItem.find(".change_page_option_name_input").hide();
                poRowItem.find(".page_option_title").show();
                // save to local storage
                saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
            }
        });

        // Hide the <p> tag and show the <input> input field
        poRowItem.find(".page_option_title").hide();
        poRowItem.find(".change_page_option_name_input").css("display", "block").focus().select();

        $(document).on("click", function (event) {
            // Check if the click event target is not within the menu
            if (!poRowItem.is(event.target) && poRowItem.has(event.target).length === 0) {
                poRowItem.find(".change_page_option_name_input").hide();
                poRowItem.find(".page_option_title").show();
            }
        });
    });

    // Settings Actions
    // set use sort ID with name pp
    $(settingsSortIdWithNamePpCheck).on('change', (e) => {
        settings.useSortIdWithNamePp = $(e.target).is(':checked')
        // render the output after adding setting
        loadOutputs()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })
    
    // set use sort ID with name po
    $(settingsSortIdWithNamePoCheck).on('change', (e) => {
        settings.useSortIdWithNamePo = $(e.target).is(':checked')
        // render the output after adding setting
        loadOutputs()
        // save to local
        saveToLocalStorage(TF_SETTINGS, settings)
    })
})