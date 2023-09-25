import { combineReducers } from 'redux';
import filtersReducer from '../../components/Filters/FilterSlice';
import TodoReducer from '../../components/TodoList/TodoSlice';

const reducer = combineReducers({
    filters: filtersReducer,
    todoList: TodoReducer,
});

export default reducer;
