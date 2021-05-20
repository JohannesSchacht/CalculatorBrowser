import * as actions from "./actions";
import { produce } from "immer";

type Operation = "+" | "-" | "*" | "/";

type State = {
	op1: number;
	op2: number;
	operation: Operation;
	result: number;
};
const defaultState: State = { op1: 0, op2: 0, operation: "+", result: 0 };

export function reducer(
	// tslint:disable-next-line: no-shadowed-variable
	state: State = defaultState,
	action: { type: string; payload: any }
) {
	switch (action.type) {
		case actions.SET_OP1:
			return produce(state, (draft) => {
				draft.op1 = action.payload;
			});
		case actions.SET_OP2:
			return produce(state, (draft) => {
				draft.op2 = action.payload;
			});
		case actions.SET_OPERATION:
			return produce(state, (draft) => {
				draft.operation = action.payload;
			});
		case actions.CALCULATE:
			return produce(state, (draft) => {
				draft.result = calculate(
					state.op1,
					state.op2,
					state.operation as Operation
				);
			});
		default:
			return state;
	}
}

function calculate(op1: number, op2: number, operation: Operation): number {
	switch (operation) {
		case "+":
			return op1 + op2;
		case "-":
			return op1 - op2;
		case "*":
			return op1 * op2;
		case "/":
			return op1 / op2;
	}
}
