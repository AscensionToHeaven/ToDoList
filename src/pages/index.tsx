import React from 'react';
import { connect, DispatchProp } from 'dva';

import styles from './index.less';
import { ToDoListModelState } from '@/models/todolist';
import ToDoList, { ToDoListItem } from '@/components/ToDoList';

interface IndexProps extends DispatchProp {
  list: Array<ToDoListItem>;
}

const Index: React.FC<IndexProps> = ({ list, dispatch }) => (
  <div className={styles.container}>
    <h1>待办事项</h1>
    <ToDoList
      className={styles.todo}
      value={list}
      onChange={(todolist) => dispatch({
        type: 'todolist/update',
        payload: todolist
      })}
    />
  </div>
);

export default connect((state: { todolist: ToDoListModelState }) => ({
  list: state.todolist.list
}))(Index)

