"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createNote = function (type) {
    return function (object, key, content) {
        object[type] = __assign({}, object[type], (_a = {}, _a[key] = content.value, _a));
        var _a;
    };
};
exports.State = function (options) {
    return function (object, key) {
        object.state = __assign({}, object.state || {}, (_a = {}, _a[key] = options.default || null, _a));
        if (options.set) {
            // 新增设置该属性的 reducers
            var setFun = function (state, action) {
                state[key] = action.payload;
                return __assign({}, state);
            };
            var name_1 = key.replace(/\b(\w)/g, function (val) { return val.toUpperCase(); });
            object.reducers = __assign({}, object.reducers || {}, (_b = {}, _b["set" + name_1] = setFun, _b));
        }
        var _a, _b;
    };
};
exports.Model = function (obj) {
    var object = new obj();
    var newObj = __assign({}, object, { namespace: obj.name, state: object.state || {}, reducers: object.reducers || {}, effects: object.effects || {}, subscriptions: object.subscription || {} });
    return newObj;
};
exports.Reducer = createNote('reducers');
exports.Effect = createNote('effects');
exports.Subscription = createNote('subscriptions');
