import React from 'react';
import classnames from 'classnames';

import { ToDoListItem } from './types';

interface IToDoListItemProps extends Omit<ToDoListItem, 'id'> {
  classPrefix?: string;
  onCheck?: (checked: boolean) => void;
  onDelete?: () => void;
}

const ToDoListItem: React.FC<IToDoListItemProps> = ({
  text,
  completed,
  classPrefix,
  onCheck,
  onDelete,
}) => (
  <li title={text} className={classnames(`${classPrefix}-item`, { [`${classPrefix}-item--completed`]: completed })}>
    <div className={`${classPrefix}-item--checkbox`} title={completed ? '取消完成待办' : '完成待办'}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(ev) => onCheck && onCheck(ev.target.checked)}
      />
    </div>
    <div className={`${classPrefix}-item--title`}>{text}</div>
    <div className={`${classPrefix}-item--action`} title="删除待办">
      <button type="button" onClick={onDelete}>×</button>
    </div>
  </li>
);

export default ToDoListItem;
