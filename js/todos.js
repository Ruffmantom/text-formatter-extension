// goal of this file is to render the todo lists
// create actions and listeners for the todo list

// when user firsts gets on or has no list items they need to create a list
// once a list has been created, the todo list shows up and can start adding todo's

// think about todo obj
let todo = {
    id: createId(),
    todo: '',
    createdDate: '',
    dueDate: null,
    checked: false,
    hidden: false
}

// functionality of a todo
/* 
- create todo
- mark it as complete
- add due date
- delete
- edit by clicking on the text

*/
// list
let list = {
    id: createId(),
    name: '',
    todos: [],
    active: false
}

// functionality for a list
/*
- create list
- choose list and loads in todos
- delete list
- edit list name by clicking on the text
*/



// todoMenuListItemCont
// todoItemCont
// elements
const todoMenu = $(".todo_list_menu");
const addTodoInputElm = $("#add_new_todo_item_input")
const todoMenuListItemCont = $(".todo_list_item_cont")
const addFirstListInputElm = $("#add_first_list_input")
const startTodoListCont = $(".todo_start_cont")
const todoAreaCont = $(".main_todo_cont")
const todoListTitle = $("#todo_menu_title")
const changeListTitleInput = $('#change_list_name_input')
const todoListCompletionText = $(".todo_completion_percentage")
const progressBarElm = $('.todo_progress_bar')
const todoItemCont = $('.todo_cont')
const addNewListInputElm = $("#add_new_list")
const addNewTodoListForm = $(".create_new_todo_list_form")
const todoListItemCompletionTextElm = $(".todo_list_item_completion")
const todoListNumberTextElm = $(".todo_list_number")

// btns
const todoListMenuBtn = $(".todo_list_nav_button")
const addNewTodoBtn = $("#add_new_todo_btn")
const hideCompleteTodosBtn = $("#hide_complete_todos")
const showCompleteTodosBtn = $("#show_complete_todos")
const addNewTodoListBtn = $("#add_todo_list_btn")
const deleteTodoListBtn = $(".todo_list_delete_btn")
const addFirstListBtn = $("#add_first_list_btn")
const showAddNewTodoListFormBtn = $("#show_add_todo_list_btn")
const cancelAddNewTodoListBtn = $("#cancel_add_new_todo_list")
const todoListButton = $(".todo_list_item")
// global values
let todoMenuIsOpen = false;
// let usersTodos = []

// close menu
const closeTodoMenu = () => {
    if (todoMenuIsOpen) {
        $(".todo_list_menu").removeClass("todo_list_menu_active")
        todoMenuIsOpen = false
    }
}

// returns the current list helper
const returnCurrentList = () => {
    return usersTodos.find(l => l.active === true)
}
// on load function
const setTodoListData = () => {
    let currentList = returnCurrentList()
    updateListUiInfo(currentList)
    // update local storage with usersTodos
    saveToLocalStorage(TF_TODOS, usersTodos)
}

// get the completion percentage
const getCompletionPercentage = (currentList) => {
    if (currentList.todos.length >= 1) {
        let numberOfTodos = currentList.todos.length;
        let completeTodos = currentList.todos.filter(t => t.checked);
        let numberOfCompleteTodos = completeTodos.length;
        return `${Math.floor((numberOfCompleteTodos / numberOfTodos) * 100)}%`;
    } else {
        return '0%';
    }
};
// update the todo list UI information
const updateListUiInfo = (currentList) => {
    // this is for any list actions
    // completion bar
    todoListTitle.text(currentList.name)
    let completion = `${getCompletionPercentage(currentList)}`
    $(progressBarElm).css('width', completion)
    $(todoListCompletionText).text(`${completion} Complete`)
    if (completion === "100%") {
        $(progressBarElm).css('background-color', "var(--complete)")
    }
}


// update the usersTodos global value
const updateGlobalusersTodos = (updatedList) => {
    const index = usersTodos.findIndex(item => item.id === updatedList.id);
    // Update the corresponding item in usersTodos
    usersTodos[index] = updatedList;

    saveToLocalStorage(TF_TODOS, usersTodos)
}

// create a new todo list
// create list
const createTodoListAction = (first, listName) => {
    let list = {}
    list.id = createId()
    list.name = listName
    list.todos = []
    list.active = false
    list.hideComplete = false

    if (first) {
        list.active = true
    }
    // push new list into usersTodos
    usersTodos.unshift(list)
    // add list to list menu
    $(todoMenuListItemCont).prepend(createTodoList(list))
    // clear first input
    $(addFirstListInputElm).val("")
    // Clear menu input
    $(addNewListInputElm).val("")
    // re render the UI
    updateFullTodoUi()
}
// show or hide create list form
const showOrHideAddNewTodoListForm = (show) => {
    if (show) {
        $(addNewTodoListForm).css("display", "flex")
        $(showAddNewTodoListFormBtn).hide()
    } else {
        $(addNewTodoListForm).css("display", "none")
        $(showAddNewTodoListFormBtn).show()
    }
}


const showTodoListArea = (show) => {
    if (show) {
        $(startTodoListCont).css('display', 'none');
        // show todo area
        $(todoAreaCont).css('display', "block");
    } else {
        $(startTodoListCont).css('display', 'flex');
        // show todo area
        $(todoAreaCont).css('display', "none");
    }
}

// update the 
const updateUsersTodos = (updatedList) => {
    const index = usersTodos.findIndex(item => item.id === updatedList.id);

    let updatedUI = false;

    if (index !== -1) {
        // Update the corresponding item in usersTodos
        usersTodos[index] = updatedList;
        // update local storage with usersTodos
        saveToLocalStorage(TF_TODOS, usersTodos);
        updatedUI = true
    } else {
        console.error(`Item with id ${updatedList.id} not found in usersTodos.`);
        updatedUI = false
    }
    // console.log("Updated updateUsersTodos: " + updated)
}

// handle checking the todo on the UI
const updateTodoCheckedStateUI = (todoId, checked) => {
    // console.log('about to update UI');
    const todoItemArr = Array.from($(".todo_item")); // Re-query todo items

    todoItemArr.forEach(t => {
        // console.log('Inside foreach');
        if ($(t).data("todoid") === todoId) {
            if (checked) {
                $(t).addClass('todo_checked');
            } else {
                $(t).removeClass('todo_checked');
            }
        }
    });
};


// this is more for if the show button gets clicked, not a load
// handle displaying the completed tasks
const handleDisplayCompletedTasks = (showHideButtonClicked) => {
    const todoItemArr = Array.from($(".todo_item"));
    // hide completed tasks from dom
    let currentList = returnCurrentList()
    // toggle the hideComplete
    if (showHideButtonClicked) {
        if (currentList.hideComplete) {
            currentList.hideComplete = false;
        } else {
            currentList.hideComplete = true;
        }
    }

    if (currentList.hideComplete) {
        $("#show_complete_todos").show()
        $("#hide_complete_todos").hide()
        // render all todos that are complete
        todoItemArr.forEach(t => {
            if ($(t).hasClass("todo_checked")) {
                $(t).hide()
            }
        })
    } else {
        $("#show_complete_todos").hide()
        $("#hide_complete_todos").show()

        todoItemArr.forEach(t => {
            if ($(t).hasClass("todo_checked")) {
                $(t).show()
            }
        })
    }

    updateUsersTodos(currentList);
}

// update the list ui with every action
const updateFullTodoUi = () => {
    // check and hide todos if needed
    handleDisplayCompletedTasks(false)
    // update the list complete status
    let currentList = returnCurrentList()
    let completePercentage = getCompletionPercentage(currentList)
    let listItemsArr = Array.from($(".todo_list_item_completion"))
    // update the list percentage in menu
    listItemsArr.forEach(l => {
        if ($(l).data("listid") === currentList.id) {
            $(l).text(`${completePercentage} complete`)
        }
    })
    // empty menu first
    $(todoMenuListItemCont).empty()
    // Render todo menu lists in the menu
    usersTodos.forEach(l => {
        $(todoMenuListItemCont).prepend(createTodoList(l));
    });
    // set UI
    // set list title
    $(todoListTitle).text(currentList.name)
    // se the number of todos
    $(todoListNumberTextElm).text(currentList.todos.length + " Todo's")
    // set width of progress bar
    $(progressBarElm).css({
        "width": completePercentage,
        "transition": "width 200ms ease"
    })
    // update the completion text
    $(todoListCompletionText).text(`${completePercentage} complete`)
    // update the progress bar color if 100%
    if (completePercentage === "100%") {

        $(progressBarElm).addClass('todo_progress_bar_complete')
    } else {
        $(progressBarElm).removeClass('todo_progress_bar_complete')

    }
    // update local storage with usersTodos
    saveToLocalStorage(TF_TODOS, usersTodos)
}

// when a todo gets checked or unchecked
const todoCheckHandler = (todoId) => {
    let currentList = returnCurrentList();
    let todoToUpdate = currentList.todos.find(t => t.id === todoId);

    if (todoToUpdate) {
        // Toggle the checked status
        todoToUpdate.checked = !todoToUpdate.checked;

        // Update UI
        updateTodoCheckedStateUI(todoId, todoToUpdate.checked);
        //update the list as well if the hide complete is active
        updateFullTodoUi()
        // Save updated current list to usersTodos
        updateUsersTodos(currentList);
    }
};

// load in the usersTodos
const loadUsersTodos = () => {

    if (usersTodos.length >= 1) {
        // hide the start of todo list if none
        showTodoListArea(true)

        // Load the current list todos and sort them
        let currentList = returnCurrentList();
        let sortedList = currentList.todos.sort((a, b) => {
            // First, sort by checked state (unchecked first)
            if (a.checked !== b.checked) {
                return a.checked ? -1 : 1;
            }

            // If the checked state is the same, then sort by createdDate
            return new Date(a.createdDate) - new Date(b.createdDate);
        });

        // empty the todo container before rendering them.
        $(todoItemCont).empty()
        // Render sorted todos
        sortedList.forEach(todo => {
            $(todoItemCont).prepend(createTodo(todo));
        });
        // check and hide todos if needed
        handleDisplayCompletedTasks(false)
    } else {
        showTodoListArea(false)
    }
};

const deleteTodo = (todoId) => {
    // delete from usersTodos
    let currentList = returnCurrentList();
    let updatedList = currentList.todos.filter(t => t.id !== todoId);

    currentList.todos = updatedList
    // update data
    updateUsersTodos(currentList);
    // console.log(updatedList)
    // transition out from UI
    const todoItemToDelete = $(`.todo_item[data-todoid="${todoId}"]`);

    todoItemToDelete.addClass('deleted_todo');

    // After the transition is complete, remove the todo item from the DOM
    todoItemToDelete.on('transitionend', function () {
        $(this).remove();
    });
    updateFullTodoUi()
};
// update active list styles
const setActiveStylesToList = () => {
    let listItemArr = Array.from($('.todo_list_item'))
    listItemArr.forEach(i => {
        let c = returnCurrentList()
        // console.log('List item id: ', $(i).data("listid"))
        // console.log('Current List Item: ', c)
        if (c.id !== $(i).data("listid")) {
            // remove active class
            $(i).removeClass('active_todo_list')
        } else {
            $(i).addClass('active_todo_list')
        }
    })
}
const saveLastActiveList = () => {
    let lastActiveList = ''
    let currentList = returnCurrentList()
    lastActiveList = currentList.id
    // save that to local storage
    saveToLocalStorage("TF_TODOS_LAL", lastActiveList)
}
const getLastActiveList = () => {
    return JSON.parse(localStorage.getItem("TF_TODOS_LAL"))
}

// change active list
const changeList = (listId) => {
    // usersTodos data change the current active list to false
    saveLastActiveList()
    // assign new todo list active to true
    usersTodos.forEach(l => {
        if (l.id === listId) {
            // set active
            l.active = true
        } else {
            l.active = false
        }
    })
    // save to local storage
    saveToLocalStorage(TF_TODOS, usersTodos)
    // usersTodos.
    setActiveStylesToList()
    // update UI
    updateFullTodoUi()
    // load todos
    loadUsersTodos()
}

// delete todo lists
const deleteTodoList = (listId) => {
    // remove list from usersTodos
    // set new active list if deleting current active one
    console.log("Before delete: ", usersTodos)
    let deletingActiveList = false;
    usersTodos.forEach(l => {
        // console.log(l)
        if (l.id === listId && l.active) {
            l.active = false
            deletingActiveList = true
        }
    })
    console.log('Deleting active list? ' + deletingActiveList)



    let updatedUserTodos = usersTodos.filter(l => l.id !== listId);
    usersTodos = updatedUserTodos

    if (deletingActiveList) {
        let lastActiveList = getLastActiveList()
        console.log("Deleting currently active so we need to set list to last active: " + lastActiveList)
        usersTodos.forEach(l => {
            if (l.id === lastActiveList) {
                console.log("Yes found last active list")
                l.active = true
            }
        })
    }

    console.log("After delete: ", usersTodos)
    // save to local storage
    saveToLocalStorage(TF_TODOS, updatedUserTodos)
    if (usersTodos.length >= 1) {

        // // update UI
        // // usersTodos.
        setActiveStylesToList()
        // // update UI
        updateFullTodoUi()
        // // load todos
        loadUsersTodos()
    } else {
        // hide container and show start of new list
        // hide the start of todo list if none
        showTodoListArea(false)
    }
}


// document on load
$(function () {
    // on load see if current list is hiding or showing completed
    let currentList = returnCurrentList()
    if (currentList) {
        // load in the todos on load
        loadUsersTodos()
        updateFullTodoUi()
    }
    // first time creating todo list
    addFirstListBtn.on("click", (e) => {
        e.preventDefault()
        if ($(addFirstListInputElm).val() !== "") {
            let listValue = $(addFirstListInputElm).val()
            createTodoListAction(true, listValue)
            // eventually add a load function that hides this if theres already a list item
            showTodoListArea(true)
            // render list data
            setTodoListData()
        } else {
            sendNotification('fast', 3000, 'Please enter a list name')
        }
    })

    // open the todo list menu
    todoListMenuBtn.on('click', () => {
        if (todoMenuIsOpen) {
            // close menu
            closeTodoMenu()
        } else {
            // open menu
            $(".todo_list_menu").addClass("todo_list_menu_active")
            todoMenuIsOpen = true
        }

        // close todo list menu
        $(document).on("click", function (event) {
            // Check if the click event target is not within the menu
            if (!todoMenu.is(event.target) && todoMenuIsOpen && !todoListMenuBtn.is(event.target) && todoMenu.has(event.target).length === 0) {
                closeTodoMenu()
            }
        });
    })

    // add todo
    addNewTodoBtn.on("click", (e) => {
        e.preventDefault()
        // create todo
        let todoVal = $(addTodoInputElm).val()

        if (todoVal !== "") {
            // create todo
            let todo = {}
            todo.todo = todoVal
            todo.id = createId()
            todo.createdDate = createDate()
            todo.dueDate = ''
            todo.checked = false
            // save to usersTodos
            let updateList = returnCurrentList()
            updateList.todos.unshift(todo)
            // update usersTodos
            updateGlobalusersTodos(updateList)
            $(todoItemCont).prepend(createTodo(todo))
            // reset
            $(addTodoInputElm).val("")
            //update UI
            updateFullTodoUi()

        } else {
            sendNotification('fast', 3000, 'Please enter a todo')
        }
    })

    // add new list
    // show form for new todo list
    $(showAddNewTodoListFormBtn).on("click", (e) => {
        e.preventDefault()
        showOrHideAddNewTodoListForm(true)
    })
    // hide from for new todo list
    $(cancelAddNewTodoListBtn).on("click", () => {
        showOrHideAddNewTodoListForm(false)
    })

    // create new list
    $(addNewTodoListBtn).on("click", (e) => {
        e.preventDefault()

        let newListVal = $(addNewListInputElm).val()
        if (newListVal !== "") {
            // make new list and set current id
            createTodoListAction(false, newListVal)
            // reset
            $(addNewListInputElm).val('')
            showOrHideAddNewTodoListForm(false)
            // setActiveStylesToList()
            // console.log(usersTodos)
        } else {
            sendNotification('fast', 3000, 'Please enter a list name')
        }

    })

    // handle edit todo
    // Use event delegation to handle clicks on dynamically created elements
    $(".todo_cont").on("click", ".todo_item_text", function () {
        // Find the parent container of the clicked element
        var todoItem = $(this).closest(".todo_item");

        // Get the value of the data-todoid attribute
        clickedTodoTextId = todoItem.data("todoid");

        let todoEditTextInput = $(`.todo_change_text_input[data-todoid="${clickedTodoTextId}"]`);

        todoEditTextInput.keydown(function (event) {
            var keycode = event.keyCode ? event.keyCode : event.which;

            if (keycode == 13 && !event.shiftKey) {
                // Prevent default behavior if Enter is pressed without Shift
                event.preventDefault();
                console.log($(this).val());

                // Now save the value to the current todo
                let currentList = returnCurrentList();

                currentList.todos.forEach(t => {
                    if (t.id === clickedTodoTextId) {
                        t.todo = $(this).val();
                    }
                });

                updateUsersTodos(currentList);
                loadUsersTodos()
                // Perform any other action you need with the entered value

                // Hide the input field and show the <p> tag
                todoItem.find(".change_todo_form").hide();
                todoItem.find(".todo_item_text").show();
            }
        });

        // Hide the <p> tag and show the <textarea> input field
        todoItem.find(".todo_item_text").hide();
        todoItem.find(".change_todo_form").css("display", "block");

        $(document).on("click", function (event) {
            // Check if the click event target is not within the menu
            if (!todoItem.is(event.target) && todoItem.has(event.target).length === 0) {
                todoItem.find(".change_todo_form").hide();
                todoItem.find(".todo_item_text").show();
            }
        });
    });



    // handle cancel changing the todo text
    $(".todo_cont").on("click", ".cancel_change_todo_btn", function () {
        var todoItem = $(this).closest(".todo_item");

        todoItem.find(".change_todo_form").hide();
        todoItem.find(".todo_item_text").show();
    });

    // handle check todo
    $(".todo_cont").on('click', '.complete_todo', function () {
        let todoId = $(this).data("todoid");
        todoCheckHandler(todoId);
    });

    // handle delete todo
    $(".todo_cont").on('click', '.todo_delete_btn', function () {
        let todoId = $(this).data("todoid");
        // console.log("Delete todo: " + todoId)
        deleteTodo(todoId)
    });


    // handle hide completed tasks button
    $(hideCompleteTodosBtn).on('click', (e) => {
        // console.log('hide complete!')
        let currentList = returnCurrentList()
        if (currentList.todos.length === 0) {
            sendNotification("fast", 3000, "There are no completed todo's")
        } else {
            let completedTodos = false
            currentList.todos.filter(t => {
                if (t.checked) {
                    completedTodos = true
                }
            })
            if (!completedTodos) {
                sendNotification("fast", 3000, "There are no completed todo's")
            } else {
                handleDisplayCompletedTasks(true)
            }

        }

    })
    // handle show the completed todos
    $(showCompleteTodosBtn).on('click', (e) => {
        // console.log('show complete!')
        handleDisplayCompletedTasks(true)

    })
    // handle list click
    $(".todo_list_item_cont").on('click', '.todo_list_btn ', function () {
        let listId = $(this).data("listid");
        changeList(listId)
    });
    // handle delete todo list
    $(".todo_list_item_cont").on('click', '.todo_list_delete_btn ', function () {
        let listId = $(this).data("listid");
        console.log("delete list: " + listId)
        deleteTodoList(listId)
    });
    // end of doc ready
})