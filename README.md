# dva decorate
This library fully depends on [dva](https://github.com/dvajs/dva.git).

# License
MIT License

# Install
 npm i --save-dev dva-decorate

 or

 yarn add -dev dva-decorate

# Usage

There are 4 decorators:
* `@Model`
* `@State`
* `@Effect`
* `@Reducer`
* `@Subscriptions`

```typescript
 import { State, Model, Reducer, Effect, Subscription } from 'dva-decorate';

 /**
  * @deprecated namespace is class name, this namespace is Demo
  */
 @Model
 export class Demo {
   /**
    * @deprecated create a state
    * default: state init value
    * set: add a reducer, reducer name is setTodo
    */
   @State({ default: '', set: true })
   public todo: string;

   /**
    * @deprecated create a reducer
    * @param state
    * @param action
    * @return {}
    */
   @Reducer
   public reducerDemo(state, action) {
     /**
      * reducer content
      */
     return { ...state };
   }

   /**
    * @deprecated create a effect
    * @param action
    * @param {any} put
    * @param {any} all
    */
   @Effect
   public * effectDemo(action, { put, all }) {
     yield put('reducerDemo');
   }

   /**
    * @deprecated create a subscription
    * @param {any} history
    * @return {any}
    */
   @Subscription
   public setup({ history }) {
     return history.listen(({ pathname, search }) => {
       if (typeof (window as any).ga !== 'undefined') {
         (window as any).ga('send', 'pageview', pathname + search);
       }
     });
   }
 }
```