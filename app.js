// Define global variable
let globalValues;
let usersNotes = [];
let usersTodos = [];
let defaultValues = {
    conversionFrom: 'Millimeters',
    conversionTo: 'Centimeters',
    conversionInputValue: '',
    separator: '_',
    outputCase: 'Lower Case',
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
