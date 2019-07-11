import { AnyAction } from 'redux';

import service from '@/services/todolist';
import { ToDoListItem } from '@/components/ToDoList';
import { Model } from './model';

export type ToDoListModelState = {
  list: Array<ToDoListItem>;
}

const toDoListModel: Model<ToDoListModelState> = {
  namespace: 'todolist',
  state: {
    list: []
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetch' });
    }
  },
  effects: {
    *fetch(_, { call, put }) {
      const result: Array<ToDoListItem> = yield call(service.getList);
      yield put({
        type: 'saveList',
        payload: result
      })
    },
    *update({ payload }, { call, put }) {
      yield call(service.updateList, payload);
      yield put({ type: 'fetch' });
    }
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload
      }
    }
  }
};

export default toDoListModel;
