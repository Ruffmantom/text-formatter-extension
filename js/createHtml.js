// Create Todo List HTML
const createTodoList = (listInfo) => {
    return `
    <div class="todo_list_item ${listInfo.active ? "active_todo_list" : ""}" data-listid=${listInfo.id}>
    <div class="todo_list_btn" data-listid=${listInfo.id}></div>
        <div class="todo_list_info">
            <p class="todo_list_item_name">${listInfo.name}</p>
            <p class="todo_list_item_completion" data-listid=${listInfo.id}>${getCompletionPercentage(listInfo)} Complete</p>
        </div>
        <button data-listid=${listInfo.id} type="button" class="setting_btn delete_btn todo_list_delete_btn">
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
// create Todo HTML
const createTodo = (todoInfo) => {
    const todoWithLinks = findAndReplaceLinks(todoInfo.todo);

    const checkDueDateIsPastDue = (dueDate) => {
        // if the todo has a dueDate, check to see if it is past due
        if (dueDate) {
            // Parse the input due date string into a Date object
            const dueDateObject = new Date(dueDate);

            // Get the current date
            const currentDate = new Date();

            // Compare the due date with the current date
            return dueDateObject < currentDate;
        }

        // If there's no due date, it's not past due
        return false;
    }
    return `
            <div class="todo_item ${todoInfo.checked ? "todo_checked" : ""}" data-todoid=${todoInfo.id}>
                <!-- if there is a due date -->
                ${todoInfo.dueDate ? `<p class="todo_due_date ${!todoInfo.checked && checkDueDateIsPastDue(todoInfo.dueDate) ? "overdue" : ""} ${todoInfo.checked ? "complete" : ""}">Due: ${formatDate(todoInfo.dueDate)}</p>` : ''}

                <div class="todo_item_cont">
                    <div class="todo_item_col todo_item_left">
                        <input type="checkbox" data-todoid=${todoInfo.id} name="doublequotes" class="checkbox_input complete_todo" ${todoInfo.checked ? "checked" : ''}>
                        <div class="todo_text_cont">
                            <p class="todo_item_text" data-todoid=${todoInfo.id}>${todoWithLinks}</p>
                            <div class="change_todo_form" type="submit">
                                <textarea type="text" name="todo" spellcheck="true" data-todoid=${todoInfo.id} class="todo_change_text_input">${todoInfo.todo}</textarea>
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
                            </div>
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
// create note HTML
const createNote = (noteData) => {
    const noteWithLinks = findAndReplaceLinks(noteData.note);

    return `
    <div class="user_note">
        <button data-noteid=${noteData.id} type="button" class="setting_btn close_btn delete_btn">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10.213" height="12" viewBox="0 0 10.213 12"><defs><clipPath id="a"><rect width="10.213" height="12"/></clipPath></defs><g clip-path="url(#a)"><path d="M.511,10.851A1.293,1.293,0,0,0,1.889,12H8.323A1.293,1.293,0,0,0,9.7,10.851V4.34H.511ZM2.247,5.617H2.86a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H2.247a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H4.8a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H7.353a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46M1.021,2.043A1.021,1.021,0,0,0,0,3.064V3.83H10.213V3.064A1.021,1.021,0,0,0,9.191,2.043H7.66V.919A.918.918,0,0,0,6.74,0H3.472a.918.918,0,0,0-.919.919V2.043Zm5.617,0H3.574V1.481a.461.461,0,0,1,.46-.46H6.179a.461.461,0,0,1,.46.46Z" fill-rule="evenodd"/></g></svg>
        </button>
       <p class="note_text">${noteWithLinks}</p>
       <p class="note_date">Noted: ${noteData.dateCreated}</p>
    </div>
    `;
}


// create html for page option page
const createPageOptionRow = (po) => {
    return `
    <div class="page_option_item_row" data-optionkey="${po.key}">

    <div class="page_option_col sml">
        <button type="button" data-poid="${po._id}" data-optionkey="${po.key}" data-potype="${po.type}" data-poname="${po.optionName}" class="delete_page_option_btn main_icon_button danger_btn ${!po.isDeleteAble ? "disabled" : ""}">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                width="10.213" height="12" viewBox="0 0 10.213 12">
                <defs>
                    <clipPath id="a">
                        <rect width="10.213" height="12"></rect>
                    </clipPath>
                </defs>
                <g clip-path="url(#a)">
                    <path
                        d="M.511,10.851A1.293,1.293,0,0,0,1.889,12H8.323A1.293,1.293,0,0,0,9.7,10.851V4.34H.511ZM2.247,5.617H2.86a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H2.247a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H4.8a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46m2.553,0h.613a.461.461,0,0,1,.46.46v4.187a.461.461,0,0,1-.46.46H7.353a.461.461,0,0,1-.46-.46V6.077a.461.461,0,0,1,.46-.46M1.021,2.043A1.021,1.021,0,0,0,0,3.064V3.83H10.213V3.064A1.021,1.021,0,0,0,9.191,2.043H7.66V.919A.918.918,0,0,0,6.74,0H3.472a.918.918,0,0,0-.919.919V2.043Zm5.617,0H3.574V1.481a.461.461,0,0,1,.46-.46H6.179a.461.461,0,0,1,.46.46Z"
                        fill-rule="evenodd"></path>
                </g>
            </svg>
        </button>


    </div>

    <div class="page_option_col med page_option_title_col">
        <p class="page_option_title">${po.optionName}</p>
    </div>

    <div class="page_option_col sml">
        <input class="tf_input top-inputs po_sort_input" name="input" type="number"
            data-poid="${po._id}" data-inputtype="sort" data-potype="${po.type}" value="${po.newSortId ? po.newSortId : ""}"  min="0" max="50" placeholder='0'>
    </div>

    <div class="page_option_col med">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" class="x_clear_btn po_rename_clear_btn" data-poid="${po._id}"
        data-potype="${po.type}" 
            viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
             d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
        <input class="tf_input top-inputs page_option_rename_input" name="input"
        data-poid="${po._id}" data-inputtype="rename" data-potype="${po.type}" value="${po.rename ? po.rename : ""}" type="text" placeholder='New Name...'>
    </div>
    `
}