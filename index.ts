const createNote = (type: string) => {
  return (object: any, key: any, content: any) => {
    object[type] = { ...object[type], [key]: content.value };
  };
};

export const State = (options) => {
  return (object: any, key: string) => {
    object.state = { ...object.state || {}, [key]: options.default || null };
    if (options.set) {
      // 新增设置该属性的 reducers
      const setFun: any  = (state: any, action: any) => {
        state[key] = action.payload;
        return { ...state };
      };
      const name: string = key.replace(/\b(\w)/g, (val: string) => val.toUpperCase());
      object.reducers = { ...object.reducers || {}, [`set${name}`]: setFun };
    }
  };
};

export const Model = (obj: any) => {
  const object = new obj();
  const newObj = {
    ...object, // 防止TS报错  其实原型连浅拷贝原因 这个加上去什么都没有
    namespace: obj.name,
    state: object.state || {},
    reducers: object.reducers || {},
    effects: object.effects || {},
    subscriptions: object.subscription || {},
  };
  return newObj;
};

export const Reducer = createNote('reducers');
export const Effect = createNote('effects');
export const Subscription = createNote('subscriptions');
