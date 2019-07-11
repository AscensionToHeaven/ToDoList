import React from 'react';
import classnames from 'classnames';

interface IToDoListTabProps {
  activeTab: string;
  tabList: string[];
  classPrefix?: string;
  onChange: (activeKey: string) => void;
}

const ToDoListTab: React.FC<IToDoListTabProps> = ({
  classPrefix,
  tabList,
  activeTab,
  onChange,
}) => (
  <ul className={`${classPrefix}-tab`}>
    {tabList.map(key => (
      <li
        key={key}
        className={classnames(`${classPrefix}-tab--item`, {
          [`${classPrefix}-tab--item-active`]: activeTab === key
        })}
        onClick={() => onChange(key)}
      >
        {key}
      </li>
    ))}
  </ul>
)

export default ToDoListTab;
