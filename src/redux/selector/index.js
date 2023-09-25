import { createSelector } from 'reselect';

export const todoListSelector = (state) => state.todoList;
export const filtersSelector = (state) => state.filters;

export const todoListRemainSelector = createSelector(todoListSelector, filtersSelector, (todoList, filters) => {
    return todoList.todoList.filter((item) => {
        if (filters.status === 'All') {
            return filters.priority.length
                ? filters.priority.includes(item.priority) &&
                      item.name.toLowerCase().includes(filters.search.toLowerCase())
                : item.name.toLowerCase().includes(filters.search.toLowerCase());
        }
        return (
            (filters.status === 'Completed' ? item.completed : !item.completed) &&
            item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            (filters.priority.length ? filters.priority.includes(item.priority) : true)
        );
    });
});
