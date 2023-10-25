// Define global variable
let globalValues;
let usersNotes;
let usersTodos;
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
const DATA_NAME = 'TF_DATA';
const TF_SETTINGS = 'TF_SETTINGS';
const TF_NOTES = 'TF_NOTES';
const TF_TODOS = 'TF_TODOS';
// Save values to local storage
const saveToLocalStorage = (name, values) => {
    // console.log(values);
    localStorage.setItem(name, JSON.stringify(values));
};

// Load values from local storage
const loadFromLocalStorage = () => {
    // console.log("Loaded!");

    let localObj = localStorage.getItem(DATA_NAME);

    if (localObj) {
        // console.log("Object found in local storage!");
        // Object exists, parse and use it
        let values = JSON.parse(localObj);
        // console.log("Loaded!", values);

        // You can assign the loaded values to the global variable if needed
        globalValues = values;
    } else {
        // console.log("Object not found in local storage. Creating new value...");
        // Object doesn't exist, create a new value and save it to local storage
        // default values loaded in
        /* Create your new values here */;

        // Save the new values to local storage
        saveToLocalStorage(DATA_NAME, defaultValues);

        // console.log("New DEFAULT values created and saved to local storage:", defaultValues);

        // You can assign the new values to the global variable if needed
        globalValues = defaultValues;
    }

};


let isLoading = false;
const loader = $(".loader_container");

const loadNotesFromLocalStorage = async () => {
    isLoading = true;
    $(loader).addClass('loader_active'); // Show the loader

    try {
        let localObj = await localStorage.getItem(TF_NOTES);

        if (localObj) {
            let values = JSON.parse(localObj);
            usersNotes = values;
        } else {
            usersNotes = [];
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
