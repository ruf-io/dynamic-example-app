import { WizardControlModel } from "../../../utils/model-interfaces";

export type WizardControlValue = string | number | string[] | null;
export interface WizardControlState {
    valid: boolean;
    value: WizardControlValue;
    errorMessage?: string;
}

export type ControlValueInitializer = (control: WizardControlModel) => WizardControlValue;
export let controlValueInitializers: Record<string, ControlValueInitializer> = {}

export type ControlStateBuilder = (control: WizardControlModel, newValue: WizardControlValue) => WizardControlState;
export let controlStateBuilders: Record<string, ControlStateBuilder> = {}

export function buildInitialState(control: WizardControlModel): WizardControlState {
    console.log(control); // TODO remove
    console.log(contro)
    const initialValue = controlValueInitializers[control.type](control);
    const initialStatus = controlStateBuilders[control.type](control, initialValue);
    return initialStatus;
}

export type OnControlValueChange = (control: WizardControlModel, index: number, newValue: WizardControlValue) => void;

export interface WizardControlProps extends WizardControlModel {
    index: number;
    controlState: WizardControlState;
    onValueChange: OnControlValueChange;
}
