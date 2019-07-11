import { Model } from 'dva';
import { ReducersMapObject, AnyAction } from 'redux';

interface ActionWithPayload<T = any> extends AnyAction {
  payload: T;
}

export interface Model<T> extends Omit<Model, 'reducers' | 'state'> {
  state: T;
  reducers: ReducersMapObject<{[S in keyof any]: T}, ActionWithPayload>;
}

