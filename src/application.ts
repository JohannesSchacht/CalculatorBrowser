import { fromEvent } from "rxjs";
import { state } from "./state/state";
import * as actions from "./state/actions";

export class MyCalculator {
	private document: Document | undefined;
	private viewModel: ViewModel | undefined;

	private op1: HTMLInputElement | undefined;
	private op2: HTMLInputElement | undefined;
	private operation: HTMLSelectElement | undefined;
	private result: HTMLElement | undefined;

	public initialize(document: Document) {
		this.document = document;
		this.viewModel = new ViewModel(document);

		// Get input elements (upper half)
		this.op1 = this.getInputElement("field1");
		this.op2 = this.getInputElement("field2");
		this.operation = this.getSelectElement("operation");
		this.result = this.getElement("result"); // just for testing

		// Add event handlers to input elements -> store in state
		fromEvent(this.op1, "input").subscribe(() =>
			state.dispatch(actions.setOp1(parseInt(this.op1!.value, 10)))
		);
		fromEvent(this.op2, "input").subscribe(() =>
			state.dispatch(actions.setOp2(parseInt(this.op2!.value, 10)))
		);
		fromEvent(this.operation, "input").subscribe(() => {
			const op: Operation = this.operation!.options[
				this.operation!.selectedIndex
			].text as Operation;
			state.dispatch(actions.setOperation(op));
		});
		fromEvent(this.getElement("calculate"), "click").subscribe(() =>
			state.dispatch(actions.calculate(0))
		);

		// Initialize input elements with values
		this.result.innerHTML = "See result below";

		this.op1.value = "0";
		this.op2.value = "0";
		this.operation.value = "plus";

		const event = new Event("input", {
			bubbles: true,
			cancelable: true,
		});
		this.op1.dispatchEvent(event);
		this.op2.dispatchEvent(event);
		this.operation.dispatchEvent(event);

		// Start watching state and initialize it
		state.subscribe(() => {
			this.viewModel?.updateView();
		});
		state.dispatch(actions.setOp1(0));
		state.dispatch(actions.setOp2(0));
		state.dispatch(actions.setOperation("+"));
		state.dispatch(actions.calculate(0));
	}

	public getElement(id: string): HTMLElement {
		const elem = document.getElementById(id);
		if (elem === null) throw new Error(`Not found: ${id}`);
		return elem;
	}

	public getInputElement(id: string): HTMLInputElement {
		const elem = document.querySelector(`input[id="${id}"]`);
		if (elem instanceof HTMLInputElement) {
			return elem as HTMLInputElement;
		}
		throw new Error(`Not found: ${id}`);
	}

	public getSelectElement(id: string): HTMLSelectElement {
		const elem = document.querySelector(`select[id="${id}"]`);
		if (elem instanceof HTMLSelectElement) {
			return elem as HTMLSelectElement;
		}
		throw new Error(`Not found: ${id}`);
	}
}

export type Operation = "+" | "-" | "*" | "/";

class ViewModel {
	private document: Document | undefined;
	private _op1: number = 0;
	private _op2: number = 0;
	private _operation: Operation = "+";
	private _result: number = 0;

	private op1Elem: HTMLElement | undefined;
	private op2Elem: HTMLElement | undefined;
	private operationElem: HTMLElement | undefined;
	private resultElem: HTMLElement | undefined;

	constructor(document: Document) {
		this.document = document;
		this.op1Elem = this.getElement("op1");
		this.op2Elem = this.getElement("op2");
		this.operationElem = this.getElement("operation1");
		this.resultElem = this.getElement("result1");
	}

	public updateView() {
		const curr = state.getState();

		this.op1Elem!.innerHTML = state.getState().op1.toString();
		this.op2Elem!.innerHTML = state.getState().op2.toString();
		this.operationElem!.innerHTML = state.getState().operation;
		this.resultElem!.innerHTML = state.getState().result.toString();
	}

	private getElement(id: string): HTMLElement {
		const elem = document.getElementById(id);
		if (elem === null) throw new Error(`Not found: ${id}`);
		return elem;
	}
}

export let myCalculator: MyCalculator = new MyCalculator();
