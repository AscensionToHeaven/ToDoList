import React from 'react';
import classnames from 'classnames';
import uuid from 'uuid/v4';

import './index.less';
import { ToDoListItem } from './types';
import ToDoListInput from './Input';
import ToDoListItemComponent from './Item'
import ToDoListTab from './Tab';

export interface IToDoListProps {
  value?: Array<ToDoListItem>;
  onChange?: (value: Array<ToDoListItem>) => void;
  classPrefix?: string;
  className?: string;
}

export interface IToDoListState {
  value: Array<ToDoListItem>;
  tabList: string[];
  activeTab: string;
}

export default class ToDoList extends React.Component<IToDoListProps, IToDoListState> {
  static getDerivedStateFromProps: React.GetDerivedStateFromProps<IToDoListProps, IToDoListState> = (nextProps) => (
    'value' in nextProps ? {
      value: nextProps.value
    } : null
  )

  static defaultProps: Partial<IToDoListProps> = {
    classPrefix: 'todolist'
  }

  state: IToDoListState = {
    value: [],
    tabList: ['全部', '已完成', '未完成'],
    activeTab: '全部',
  }

  createItem(input: string): ToDoListItem {
    return {
      id: uuid(),
      text: input,
      completed: false
    };
  }

  dispatchChange(value: Array<ToDoListItem>) {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  filterList(list: Array<ToDoListItem>, activeTab: string) {
    switch (activeTab) {
      case '全部': return list;
      case '已完成': return list.filter(item => item.completed === true);
      case '未完成': return list.filter(item => item.completed === false);
      default: return list; 
    }
  }

  handleAdd =  (input: string) => this.dispatchChange([
    this.createItem(input),
    ...this.state.value,
  ])

  handleCheck = (completed: boolean, item: ToDoListItem) => this.dispatchChange(
    this.state.value.map(stateItem => stateItem.id === item.id ? {
      ...stateItem,
      completed
    } : stateItem)
  )

  handleDelete = (deleteItem: ToDoListItem) => this.dispatchChange(
    this.state.value.filter(stateItem => stateItem.id !== deleteItem.id)
  )

  handleTabChange = (activeTab: string) => this.setState({ activeTab })

  render() {
    const { className, classPrefix } = this.props;
    const { value, tabList, activeTab } = this.state;
    const filteredList = this.filterList(value, activeTab);
    return (
      <div className={classnames(classPrefix, className)}>
        <ToDoListInput classPrefix={classPrefix} onAdd={this.handleAdd} />
        <ul className={`${classPrefix}-container`}>
          {
            filteredList.length ?  filteredList.map(item => (
              <ToDoListItemComponent
                key={item.id}
                text={item.text}
                completed={item.completed}
                classPrefix={classPrefix}
                onCheck={(completed) => this.handleCheck(completed, item)}
                onDelete={() => this.handleDelete(item)}
              />
            )) : <li className={`${classPrefix}-container--empty`}>空列表</li>
          }
        </ul>
        <ToDoListTab classPrefix={classPrefix} activeTab={activeTab} tabList={tabList} onChange={this.handleTabChange} />
      </div>
    )
  }
}
