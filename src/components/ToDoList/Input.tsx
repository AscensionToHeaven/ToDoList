import React, { ChangeEvent, FormEvent } from 'react';

interface ITodoListInputProps {
  classPrefix?: string;
  onAdd?: (input: string) => void;
}

interface ITodoListInputState {
  input: string;
}

export default class TodoListInput extends React.Component<ITodoListInputProps, ITodoListInputState> {
  state: ITodoListInputState = {
    input: '',
  }

  handleAdd: React.EventHandler<FormEvent> = (ev) => {
    ev.preventDefault();
    if (!this.state.input) return;
    this.props.onAdd && this.props.onAdd(this.state.input);
    this.setState({ input: '' });
  }

  handleChange: React.EventHandler<ChangeEvent<HTMLInputElement>> = (ev) => this.setState({ input: ev.target.value })

  render() {
    const { classPrefix } = this.props;
    const { input } = this.state;
    return (
      <form onSubmit={this.handleAdd} className={`${classPrefix}-input`}>
        <input placeholder="记录你的待办事项..." value={input} onChange={this.handleChange} />
        <button type="button" onClick={this.handleAdd}>添加</button>
      </form>
    )
  }
}
