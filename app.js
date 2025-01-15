// Define global variable
let globalValues;
let usersNotes = [];
let usersTodos = [];
let globalPageOptionData = null;

let defaultValues = {
    conversionFrom: 'Millimeters',
    conversionTo: 'Centimeters',
    conversionInputValue: '',
    separator: ' ',
    outputCase: 'No Format',
    prefix: '',
    suffix: '',
    textVal: '',
    passLength: 10,
    currentTab: 'one',
    outputValueText: '',
    outputValuePassword: '',
    outputValueConversion: '',
    hexInputVal: '',
    rgbOutput: '',
    cmykOutput: '',
}
let defaultPageOptionData = {
    customPagePartId: 8,
    pageParts: [
        {
            optionName: "Paper",
            isDeleteAble: false,
            rename: "",
            _id: 1,
            type: "pp",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Format",
            isDeleteAble: false,
            rename: "",
            _id: 2,
            type: "pp",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Pages",
            isDeleteAble: false,
            rename: "",
            _id: 3,
            type: "pp",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Colors",
            isDeleteAble: false,
            rename: "",
            _id: 4,
            type: "pp",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Book Binding",
            isDeleteAble: false,
            rename: "",
            _id: 5,
            type: "pp",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Refinement",
            isDeleteAble: false,
            rename: "",
            _id: 6,
            type: "pp",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Finishing",
            isDeleteAble: false,
            rename: "",
            _id: 7,
            type: "pp",
            key: null,
            newSortId: null,
        },
    ],
    customProductOptionId: 6,
    productOptions: [
        {
            optionName: "Options",
            isDeleteAble: false,
            rename: "",
            _id: 1,
            type: "po",
            key: null,
            newSortId: null,
        },
        {
            optionName: "File Type",
            isDeleteAble: false,
            rename: "",
            _id: 2,
            type: "po",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Production",
            isDeleteAble: false,
            rename: "",
            _id: 3,
            type: "po",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Quantity",
            isDeleteAble: false,
            rename: "",
            _id: 4,
            type: "po",
            key: null,
            newSortId: null,
        },
        {
            optionName: "Proof Group",
            isDeleteAble: false,
            rename: "",
            _id: 5,
            type: "po",
            key: null,
            newSortId: null,
        },
    ],
    customOptionId: 1,
    customOptions:[
    ],
    pp_sort_output:"",
    pp_name_output:"",
    po_sort_output:"",
    po_name_output:"",
    cu_sort_output:"",
    cu_name_output:"",
    po_tab_open:"pp",
}
let globalStaging;
let stagingDefault = {
    editing: false,
    text: ''
}
const DATA_NAME = 'TF_DATA';
const TF_SETTINGS = 'TF_SETTINGS';
const TF_NOTES = 'TF_NOTES';
const TF_N_S = 'TF_N_S';
const TF_TODOS = 'TF_TODOS';
const TF_PO_DATA = 'TF_PO_DATA';
// loading function for notes
let isLoading = false;

// create ID

var idChars = "3QKXV0F8IYCA7S5T4ZGJDWB9L1N26UHOMRPVE";

const createId = () => {
    let newId = "";
    for (var i = 0; i < 6; i++) {
        newId += idChars[Math.floor(Math.random() * idChars.length)];
    }
    newId += "-"
    for (var i = 0; i < 6; i++) {
        newId += idChars[Math.floor(Math.random() * idChars.length)];
    }
    newId += "-"
    for (var i = 0; i < 6; i++) {
        newId += idChars[Math.floor(Math.random() * idChars.length)];
    }
    return newId;
};
// format date from date picker
function formatDate(inputDate) {
    // Parse the input date string into a Date object
    const dateObject = new Date(inputDate);

    // Extract year, month, and day
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = dateObject.getDate().toString().padStart(2, '0');

    // Format the date as "month/day/year"
    const formattedDate = `${month}/${parseInt(day) + 1}/${year}`;

    return formattedDate;
}

// create date helper
const createDate = () => {
    return new Date().toLocaleString();
}

//notification
const sendNotification = (slideSpeed, time, text) => {
    // console.log("Clicked " + element + " and about to copy: " + copyElm)
    $(".notification").text('');
    $(".notification").text(text);
    $(".notification").slideDown(slideSpeed);
    let timer = setTimeout(() => {
        $(".notification").slideUp(slideSpeed);
        clearTimeout(timer)
    }, time);
}
// Save values to local storage
const saveToLocalStorage = (name, values) => {
    // console.log(values);
    localStorage.setItem(name, JSON.stringify(values));
};

// Load values from local storage
const loadFromLocalStorage = () => {

    let localObj = localStorage.getItem(DATA_NAME);

    if (localObj) {
        let values = JSON.parse(localObj);

        // You can assign the loaded values to the global variable if needed
        globalValues = values;
    } else {

        // Save the new values to local storage
        saveToLocalStorage(DATA_NAME, defaultValues);

        // You can assign the new values to the global variable if needed
        globalValues = defaultValues;
    }

};

const loader = $(".loader_container");

const loadNotesFromLocalStorage = async () => {
    isLoading = true;
    $(loader).addClass('loader_active'); // Show the loader
    // console.log('about to load from local storage')
    try {
        let localStaging = await localStorage.getItem(TF_N_S);
        let localObj = await localStorage.getItem(TF_NOTES);
        // console.log('notes? ', JSON.parse(localObj))

        if (localObj) {
            usersNotes = JSON.parse(localObj);
        } else {
            usersNotes = [];
        }
        if (localStaging) {
            globalStaging = JSON.parse(localStaging);
        } else {
            globalStaging = {};
        }
    } catch (error) {
        // Handle errors, e.g., by showing an error message
        console.error('Error loading data:', error);
    } finally {
        // Regardless of success or failure, hide the loader
        isLoading = false;
        $(loader).removeClass('loader_active');
    }
};


const loadTodosFromLocalStorage = async () => {
    isLoading = true;
    $(loader).addClass('loader_active'); // Show the loader
    try {
        let localObj = await localStorage.getItem(TF_TODOS);

        if (localObj) {
            usersTodos = JSON.parse(localObj);
        } else {
            usersTodos = [];
        }

    } catch (error) {
        // Handle errors, e.g., by showing an error message
        console.error('Error loading data:', error);
    } finally {
        // Regardless of success or failure, hide the loader
        isLoading = false;
        $(loader).removeClass('loader_active');
    }
};

const loadPageOptionDataFromLocalStorage = async () => {
    isLoading = true;
    $(loader).addClass('loader_active'); // Show the loader
    try {
        let localObj = await localStorage.getItem(TF_PO_DATA);

        if (localObj) {
            globalPageOptionData = JSON.parse(localObj);
        } else {
            globalPageOptionData = defaultPageOptionData;
            saveToLocalStorage(TF_PO_DATA, defaultPageOptionData)
        }

    } catch (error) {
        // Handle errors, e.g., by showing an error message
        console.error('Error loading Page Option data:', error);
    } finally {
        // Regardless of success or failure, hide the loader
        isLoading = false;
        $(loader).removeClass('loader_active');
    }
};

// Clear data from local storage
const resetLocalStorage = () => {
    // console.log("Cleared Data!");
    // Save the default values to local storage
    saveToLocalStorage(DATA_NAME, defaultValues);
    // reset global values
    globalValues = defaultValues
};

//clear suffix
const clearStoragePrefix = (currentValues) => {
    currentValues.prefix = ''
    // save to local
    saveToLocalStorage(DATA_NAME, currentValues)
}
//clear suffix
const clearStorageSuffix = (currentValues) => {
    // get current values
    currentValues.suffix = ''
    // save to local
    saveToLocalStorage(DATA_NAME, currentValues)
}
