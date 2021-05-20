import { Operation } from "../application";

export const SET_OP1 = "setOp1";
export const SET_OP2 = "setOp2";
export const SET_OPERATION = "setOperation";
export const CALCULATE = "calculate";

export const setOp1 = (payload: number) => ({
	type: SET_OP1,
	payload,
});
export const setOp2 = (payload: number) => ({
	type: SET_OP2,
	payload,
});
export const setOperation = (payload: Operation) => ({
	type: SET_OPERATION,
	payload,
});
export const calculate = (payload: number) => ({
	type: CALCULATE,
	payload,
});
