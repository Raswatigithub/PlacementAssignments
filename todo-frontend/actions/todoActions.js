import axios from 'axios';

export const fetchTodos = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/todos');
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TODOS_FAILURE', error });
  }
};

export const createTodo = (todo) => async (dispatch) => {
  try {
    const res = await axios.post('/api/todos', todo);
    dispatch({ type: 'CREATE_TODO_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'CREATE_TODO_FAILURE', error });
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/todos/${id}`, todo);
    dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'UPDATE_TODO_FAILURE', error });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/todos/${id}`);
    dispatch({ type: 'DELETE_TODO_SUCCESS', id });
  } catch (error) {
    dispatch({ type: 'DELETE_TODO_FAILURE', error });
  }
};
