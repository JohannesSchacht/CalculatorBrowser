import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { reducer } from "./actions";

export const state = createStore(reducer, devToolsEnhancer({ trace: true }));
