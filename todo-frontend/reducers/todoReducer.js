const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  
  export default function todoReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return { ...state, todos: action.payload };
      case 'CREATE_TODO_SUCCESS':
        return { ...state, todos: [...state.todos, action.payload] };
      case 'UPDATE_TODO_SUCCESS':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo._id === action.payload._id ? action.payload : todo
          ),
        };
      case 'DELETE_TODO_SUCCESS':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo._id !== action.id),
        };
      default:
        return state;
    }
  }
  