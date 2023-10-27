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
    todos: []
}

// functionality for a list
/*
- create list
- choose list and loads in todos
- delete list
- edit list name by clicking on the text
*/