export const initState = {
    todoList: [],
    editIndex: null,
    count: 0,
};

function TodoReducer(state = initState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            state = {
                ...state,
                todoList: [
                    ...state.todoList,
                    {
                        id: state.count,
                        name: action.payload.name,
                        completed: action.payload.completed,
                        priority: action.payload.priority,
                    },
                ],
                count: state.count + 1,
            };
            return state;

        case 'UPDATE_STATUS':
            state.todoList.map((item) => {
                if (item.id === action.payload) {
                    return (item.completed = !item.completed);
                }
                return item;
            });

            return state;

        case 'DEL_TODO':
            console.log(action);
            state.todoList.splice(action.payload, 1);
            state.count = state.count - 1;

            return state;

        case 'EDIT_TODO':
            state.editIndex = action.payload.index;

            state.todoList.map((todo) => {
                if (todo.id === state.editIndex) {
                    todo.name = action.payload.text;
                }
                return todo;
            });

            return state;

        case 'CANCEL_EDIT':
            state.editIndex = null;
            return state;

        default:
            return state;
    }
}

export default TodoReducer;
