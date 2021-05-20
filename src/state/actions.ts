import { Operation } from "../application";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "commands",
	initialState: { op1: 0, op2: 0, operation: "+", result: 0 },
	reducers: {
		setOp1: (state, action: PayloadAction<number>) => {
			state.op1 = action.payload;
		},
		setOp2: (state, action: PayloadAction<number>) => {
			state.op2 = action.payload;
		},
		setOperation: (state, action: PayloadAction<Operation>) => {
			state.operation = action.payload;
		},
		calculate: (state, action: PayloadAction<null>) => {
			state.result = doThecalculation(
				state.op1,
				state.op2,
				state.operation as Operation
			);
		},
	},
});

export const { setOp1, setOp2, setOperation, calculate } = slice.actions;
export const reducer = slice.reducer;

function doThecalculation(
	op1: number,
	op2: number,
	operation: Operation
): number {
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
