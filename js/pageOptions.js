// elements and containers
const page_parts_tab = $("#page_parts_tab")
const product_parts_tab = $("#product_parts_tab")
const add_page_part_menu = $("#add_page_part_menu")
const add_product_option_menu = $("#add_product_option_menu")

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


// close the Add Product Option Menu
const closeAddProductOptionMenu = () => {
    if (addProductOptionsMenuIsOpen) {
        $(add_product_option_menu).removeClass("active");
        addProductOptionsMenuIsOpen = false
    }
}

// switch tabs
const switchPageOptionTabs = (value) => {
    $(".inner_tab_item").removeClass("active");
    $(`.inner_tab_item[data-pagetabid='${value}']`).addClass("active");

    if (value === "page") {
        closeAddProductOptionMenu()
        $(product_parts_tab).removeClass("active");
        $(page_parts_tab).addClass("active");
    } else {
        closeAddPagePartMenu()
        $(page_parts_tab).removeClass("active");
        $(product_parts_tab).addClass("active");
    }
};

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
            let nameFormat = `${p.optionName}:${p.rename ? p.rename : p.optionName};`
            ppNameOutput.push(nameFormat)
        })
    } else{
        // default 
    }

    if (productOptionOutputArr.length > 0) { // Check if there are elements in the array
        // sort First
        productOptionOutputArr.sort((a, b) => a.newSortId - b.newSortId)
        // create outputs
        productOptionOutputArr.forEach(p => {
            poSortOutput.push(p._id)
            let nameFormat = `${p.optionName}:${p.rename ? p.rename : p.optionName};`
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
    globalPageOptionData.pp_sort_output !== "" ? $(page_part_order_output).val(globalPageOptionData.pp_sort_output) : ""
    globalPageOptionData.pp_name_output !== "" ? $(page_part_name_output).val(globalPageOptionData.pp_name_output) : ""
    globalPageOptionData.po_sort_output !== "" ? $(product_option_order_output).val(globalPageOptionData.po_sort_output) : ""
    globalPageOptionData.po_name_output !== "" ? $(product_option_name_output).val( globalPageOptionData.po_name_output ) : ""
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

    sendNotification('fast', 3000, `Added ${page ? `Page Part: ${value}` : `Product Option: ${value}`}`)
    // save to local storage
    saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
    loadPagePartOptionsHTML()
    loadProductOptionsHTML()
}


// on ready
$(() => {
    if (globalPageOptionData !== null) {
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


    $(".page_options_cont").on("click", (e) => {
        if (e.target.className.includes("delete_page_option_btn") && !e.target.className.includes("disabled")) {
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
        }
        // save to local storage
        saveToLocalStorage(TF_PO_DATA, globalPageOptionData)
        // load outputs
        loadOutputs()
    })


    // Event delegation for dynamically generated inputs
    $(document).on('keyup change', '.tf_input[data-inputtype]', function () {
        var poid = $(this).data('poid');
        var poType = $(this).data('potype');
        var inputType = $(this).data('inputtype');
        var inputValue = $(this).val();
        console.log(poid, poType, inputType, inputValue)

        if (inputType === "sortId") {
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


})