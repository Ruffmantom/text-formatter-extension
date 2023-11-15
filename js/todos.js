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
// elements
const todoMenu = $(".todo_list_menu");
const addTodoInputElm = $("#add_new_todo_item_input")
const todoListContElm = $(".todo_list_item_cont")
const addFirstListInputElm = $("#add_first_list_input")
const startTodoListCont = $(".todo_start_cont")
const todoAreaCont = $(".main_todo_cont")
const todoListTitle = $("#todo_menu_title")
const changeListTitleInput = $('#change_list_name_input')
const todoListCompletionText = $(".todo_completion_percentage")
const progressBarElm = $('.todo_progress_bar')
const todosContainer = $('.todo_cont')
const addNewListInputElm = $("#add_new_list")
const addNewTodoListForm = $(".create_new_todo_list_form")

// btns
const todoListMenuBtn = $(".todo_list_nav_button")
const addNewTodoBtn = $("#add_new_todo_btn")
const hideCompleteTodosBtn = $("#hide_complete_todos")
const addNewTodoListBtn = $("#add_todo_list_btn")
const deleteTodoListBtn = $(".todo_list_delete_btn")
const addFirstListBtn = $("#add_first_list_btn")
const showAddNewTodoListFormBtn = $("#show_add_todo_list_btn")
const cancelAddNewTodoListBtn = $("#cancel_add_new_todo_list")

// global values
let todoMenuIsOpen = false;
let todoData = []

// close menu
const closeTodoMenu = () => {
    if (todoMenuIsOpen) {
        $(".todo_list_menu").removeClass("todo_list_menu_active")
        todoMenuIsOpen = false
    }
}

// returns the current list
const returnCurrentList = () => {
    return todoData.find(l => l.active === true)

}
// on load function
const setTodoListData = () => {
    let currentList = returnCurrentList()
    updateListData(currentList)
}

// get the completion percentage
const getCompletionPercentage = (currentList) => {
    // return the percentage of complete todos
    if (currentList.todos.length >= 1) {
        let numberOfTodos = currentList.todos.length
        let completeTodos = currentList.todos.find(t => t.checked)
        let numberOfCompleteTodos = completeTodos.length
        return `${Math.floor((numberOfCompleteTodos / numberOfTodos) * 100)}%`
    } else {
        return '0%'
    }
}


const updateListData = (currentList) => {
    // this is for any list actions
    /*
    - checking a todo
    - adding a todo
    - changing the list name
    etc..
    */
    // completion bar
    todoListTitle.text(currentList.name)
    let completion = `${getCompletionPercentage(currentList)}`
    $(progressBarElm).css('width', completion)
    $(todoListCompletionText).text(`${completion} Complete`)
    if (completion === "100%") {
        $(progressBarElm).css('background-color', "var(--complete)")
    }
}

// hide completed todos
const hideCompletedTodos = () => {
    // look at the active list and filter the completed todos
    // render the ones that are not completed
    // will need to update when a new todo gets clicked
}
// update the todoData global value
const updateGlobalTodoData = (updatedList) => {
    console.log("Current todoData", todoData)
    console.log("New Updated List", updatedList)
}


const createTodoList = (listInfo) => {
    // console.log(listInfo)
    return `
    <div class="todo_list_item active_todo_list" data-listid=${listInfo.id}>
        <div class="todo_list_info">
            <p class="todo_list_item_name">${listInfo.name}</p>
            <p class="todo_list_item_completion">${getCompletionPercentage(listInfo)} Complete</p>
        </div>
        <button data-todolistid=${listInfo.id} type="button" class="setting_btn delete_btn todo_list_delete_btn">
            <svg xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="10.213" height="12"
                viewBox="0 0 10.213 12">
                <defs>
                    <clipPath id="a">
                        <rect width="10.213" height="12" />
                    </clipPath>
                </defs>
                <g clip-path="url(#a)">
                    <path
                        d="M.511,10.851A1.293,1.293,0,0,0,1.889,12H8.323A1.293,1.293,0,0,0,9.7,10.851V4.34H.511ZM2.247,5.617H2.86a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H2.247a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H4.8a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H7.353a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46M1.021,2.043A1.021,1.021,0,0,0,0,3.064V3.83H10.213V3.064A1.021,1.021,0,0,0,9.191,2.043H7.66V.919A.918.918,0,0,0,6.74,0H3.472a.918.918,0,0,0-.919.919V2.043Zm5.617,0H3.574V1.481a.461.461,0,0,1,.46-.46H6.179a.461.461,0,0,1,.46.46Z"
                        fill-rule="evenodd" />
                </g>
            </svg>
        </button>
    </div>
    
    `
}

const createTodo = (todoInfo) => {
    return `
            <div class="todo_item" data-todoid=${todoInfo.id}>
                <!-- if there is a due date -->
                ${todoInfo.dueDate ? `<p class="todo_due_date">Due: 10/15/23</p>` : ''}

                <div class="todo_item_cont">
                    
                    <div class="todo_item_col todo_item_left">
                        <input type="checkbox" data-todoid=${todoInfo.id} name="doublequotes" class="checkbox_input complete_todo" ${todoInfo.checked ? "checked" : ''}>
                        <div class="todo_text_cont">
                            <p class="todo_item_text ${todoInfo.checked ? "todo_checked" : ''}" data-todoid=${todoInfo.id}>${todoInfo.todo}</p>
                            <form class="change_todo_form" type="submit">
                                <textarea type="text" name="todo" data-todoid=${todoInfo.id} class="todo_change_text_input">${todoInfo.todo}</textarea>
                                <button type="button" class="cancel_change_todo_btn" data-todoid=${todoInfo.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" width="12"
                                        height="12" viewBox="0 0 12 12">
                                        <defs>
                                            <clipPath id="a">
                                                <rect width="12" height="12" />
                                            </clipPath>
                                        </defs>
                                        <g clip-path="url(#a)">
                                            <path
                                                d="M11.693,9.572,8.121,6l3.572-3.572a1.051,1.051,0,0,0,0-1.485L11.057.307a1.052,1.052,0,0,0-1.485,0L6,3.879,2.429.307a1.052,1.052,0,0,0-1.485,0L.307.943a1.051,1.051,0,0,0,0,1.485L3.879,6,.307,9.572a1.051,1.051,0,0,0,0,1.485l.636.636a1.051,1.051,0,0,0,1.485,0L6,8.121l3.572,3.571a1.051,1.051,0,0,0,1.485,0l.636-.636a1.051,1.051,0,0,0,0-1.485"
                                                transform="translate(0 0)" fill-rule="evenodd" />
                                        </g>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="todo_item_col todo_item_right">
                        <button data-todoid=${todoInfo.id} type="button"
                            class=" main_icon_button todo_set_due_date_btn">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="11.182"
                                height="12" viewBox="0 0 11.182 12">
                                <defs>
                                    <clipPath id="a">
                                        <rect width="11.182" height="12" />
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)">
                                    <path
                                        d="M1.909.265v.818h.818V.265A.266.266,0,0,0,2.463,0H2.174a.266.266,0,0,0-.265.265m4.364,0v.818h.818V.265A.266.266,0,0,0,6.826,0H6.537a.266.266,0,0,0-.265.265m2.182,0v.818h.818V.265A.266.266,0,0,0,9.008,0H8.719a.266.266,0,0,0-.265.265m-4.364.818.818.008V.265A.266.266,0,0,0,4.645,0H4.355a.266.266,0,0,0-.265.265Zm2.182.008H4.909V2.182a.244.244,0,0,1-.265.273H4.355a.244.244,0,0,1-.265-.273V1.091H2.727V2.182a.244.244,0,0,1-.265.273H2.174a.244.244,0,0,1-.265-.273V1.091H1.677A1.673,1.673,0,0,0,0,2.727v7.636A1.673,1.673,0,0,0,1.677,12H9.5a1.673,1.673,0,0,0,1.677-1.636V2.727A1.673,1.673,0,0,0,9.5,1.091H9.273V2.182a.244.244,0,0,1-.265.273H8.719a.244.244,0,0,1-.265-.273V1.091H7.091v1.1a.238.238,0,0,1-.265.265H6.537a.244.244,0,0,1-.265-.273ZM2.182,8.455H9a.26.26,0,0,1,.273.256v.562A.274.274,0,0,1,9,9.545H2.182a.274.274,0,0,1-.273-.273V8.711a.26.26,0,0,1,.273-.256m0-1.909H9a.252.252,0,0,1,.273.248v.57A.274.274,0,0,1,9,7.636H2.182a.274.274,0,0,1-.273-.273V6.81a.267.267,0,0,1,.273-.265m0-1.909H9a.252.252,0,0,1,.273.248v.57A.274.274,0,0,1,9,5.727H2.182a.274.274,0,0,1-.273-.273V4.892a.26.26,0,0,1,.273-.256"
                                        transform="translate(0)" fill-rule="evenodd" />
                                </g>
                            </svg>
                        </button>
                        <button data-todoid=${todoInfo.id} type="button"
                            class=" main_icon_button todo_delete_btn danger_btn">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="10.213"
                                height="12" viewBox="0 0 10.213 12">
                                <defs>
                                    <clipPath id="a">
                                        <rect width="10.213" height="12" />
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)">
                                    <path
                                        d="M.511,10.851A1.293,1.293,0,0,0,1.889,12H8.323A1.293,1.293,0,0,0,9.7,10.851V4.34H.511ZM2.247,5.617H2.86a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H2.247a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H4.8a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H7.353a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46M1.021,2.043A1.021,1.021,0,0,0,0,3.064V3.83H10.213V3.064A1.021,1.021,0,0,0,9.191,2.043H7.66V.919A.918.918,0,0,0,6.74,0H3.472a.918.918,0,0,0-.919.919V2.043Zm5.617,0H3.574V1.481a.461.461,0,0,1,.46-.46H6.179a.461.461,0,0,1,.46.46Z"
                                        fill-rule="evenodd" />
                                </g>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
    
    `
}


const createTodoListAction = (first, listName) => {
    let list = {}
    list.id = createId()
    list.name = listName
    list.todos = []
    list.active = false

    if (first) {
        list.active = true
    }
    // push new list into todoData
    todoData.unshift(list)
    // add list to list menu
    $(todoListContElm).prepend(createTodoList(list))
    // clear first input
    $(addFirstListInputElm).val("")
    // Clear menu input
    $(addNewListInputElm).val("")
}

const showOrHideAddNewTodoListForm = (show) => {
    if (show) {
        $(addNewTodoListForm).css("display", "flex")
        $(showAddNewTodoListFormBtn).hide()
    } else {
        $(addNewTodoListForm).css("display", "none")
        $(showAddNewTodoListFormBtn).show()
    }
}
const setActiveStylesToList = () => {
    let listItem = $('.todo_list_item')
    let listItemArr = Array.from(listItem)
    listItemArr.forEach(i => {
        let c = returnCurrentList()
        console.log('List item id: ', $(i).data("listid"))
        console.log('Current List Item: ', c)
        if (c !== $(i).data("listid")) {
            // remove active class
            $(i).removeClass('active_todo_list')
        }
    })
}
const markComplete = (id) => {
    // filter through usersTodos
    // find todo that matches ID
    // change necessary keys
    console.log("All Todo Data: ", todoData)
    console.log("Current List: ", returnCurrentList())
    console.log("Clicked todo ID: " + id)
}

$(function () {
    // first time creating todo list
    addFirstListBtn.on("click", (e) => {
        e.preventDefault()
        if ($(addFirstListInputElm).val() !== "") {
            let listValue = $(addFirstListInputElm).val()
            createTodoListAction(true, listValue)
            // eventually add a load function that hides this if theres already a list item
            $(startTodoListCont).css('display', 'none')
            // show todo area
            $(todoAreaCont).css('display', "block")
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
            todo.hidden = false
            // save to todoData
            let updateList = returnCurrentList()
            updateList.todos.unshift(todo)
            // update todoData
            updateGlobalTodoData(updateList)
            $(todosContainer).prepend(createTodo(todo))
            // reset
            $(addTodoInputElm).val("")

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
            console.log(todoData)
        } else {
            sendNotification('fast', 3000, 'Please enter a list name')
        }

    })

    let clickedTodoTextId = ''
    // edit todo
    // Use event delegation to handle clicks on dynamically created elements
    $(".todo_cont").on("click", ".todo_item_text", function () {
        // Find the parent container of the clicked element
        var todoItem = $(this).closest(".todo_item");

        // Get the value of the data-todoid attribute
        clickedTodoTextId = todoItem.data("todoid");

        // Now, you have the todo item's unique identifier, and you can do whatever you need with it.
        console.log("Clicked todo item with todoid: " + clickedTodoTextId);

        // Hide the <p> tag and show the <textarea> input field
        todoItem.find(".todo_item_text").hide();
        todoItem.find(".change_todo_form").css("display", "block");
    });


    // cancel changing the todo text
    $(".todo_cont").on("click", ".cancel_change_todo_btn", function () {
        var todoItem = $(this).closest(".todo_item");

        todoItem.find(".change_todo_form").hide();
        todoItem.find(".todo_item_text").show();
    });

    $(".todo_cont").on('click', (e) => {
        if ($(e.target).hasClass("complete_todo")) {
            let todoId = $(e.target).data("todoid")
            markComplete(todoId)
        } else {
            return null
        }
    })

    // end of doc ready
})





/*
list info for reference
{
    "id": "R3RQSM-35G3D1-X6FMNC",
    "name": "New List one",
    "todos": [
        {
            "id": "OWVK3F-SOESY4-QFIK1P",
            "createdDate": "10/28/2023",
            "dueDate": "",
            "checked": false,
            "hidden": false
        }
    ],
    "active": true
}

*/