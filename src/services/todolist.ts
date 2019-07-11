import { ToDoListItem } from "@/components/ToDoList";

class ToDoListSercice {
  private readonly storageKey = '_todolist_storage_';

  constructor(private storage: Storage) {}

  getList = (): Array<ToDoListItem> => {
    const list = this.storage.getItem(this.storageKey)
    return list ? JSON.parse(list) : [];
  }

  updateList = (list: Array<ToDoListItem>) => {
    this.storage.setItem(this.storageKey, JSON.stringify(list));
  }
}

export default new ToDoListSercice(localStorage);
