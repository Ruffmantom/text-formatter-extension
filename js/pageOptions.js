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

// global values
let addPagePartMenuIsOpen = true; // by default
let addProductOptionsMenuIsOpen = false;

// this is the default data that will be saved to local storage
let defaultPageOptionData = {
    customPagePartId: 8,
    pageParts: [
        {
            pagePartName: "Materials",
            rename: "",
            _id: 1,
        },
        {
            pagePartName: "Format",
            rename: "",
            _id: 2,
        },
        {
            pagePartName: "Pages",
            rename: "",
            _id: 3,
        },
        {
            pagePartName: "Colors",
            rename: "",
            _id: 4,
        },
        {
            pagePartName: "Book Binding",
            rename: "",
            _id: 5,
        },
        {
            pagePartName: "Refinement",
            rename: "",
            _id: 6,
        },
        {
            pagePartName: "Finishing",
            rename: "",
            _id: 7,
        },
    ],
    customProductOptionId: 6,
    productOptions: [
        {
            productOptionName: "Options",
            rename: "",
            _id: 1,
        },
        {
            productOptionName: "File Type",
            rename: "",
            _id: 2,
        },
        {
            productOptionName: "Production",
            rename: "",
            _id: 3,
        },
        {
            productOptionName: "Quantity",
            rename: "",
            _id: 4,
        },
        {
            productOptionName: "Proof Group",
            rename: "",
            _id: 5,
        },
    ]
}


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


// on ready
$(() => {
    $(inner_tab_page_part_btn).on("click", (e) => {
        e.preventDefault()
        switchPageOptionTabs('page')
    })
    $(inner_tab_product_part_btn).on("click", (e) => {
        e.preventDefault()
        switchPageOptionTabs('product')
    })

    $(add_new_page_part_btn).on("click", (e) => {
        e.preventDefault()
        $(add_page_part_menu).addClass("active")
        addPagePartMenuIsOpen = true
    })

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
})