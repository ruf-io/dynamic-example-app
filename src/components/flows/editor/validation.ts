import { isDev } from '../../../utils/common/page-utils';
import { WizardFlowModel } from '../../../utils/model-types';

export function validateFlowDefinition(flow: WizardFlowModel): string[] {
    let errors: string[] = [];
    
    if (!isDev) {
        errors.push('Editing flows is not available in production mode. Please edit this page in Stackbit :-)');
        return errors;
    }
    
    if (!flow.steps) {
        errors.push('Flow should have at least one step');
        return errors;
    }

    let variableNames: string[] = [];
    flow.steps.forEach((step, index) => {
        if (!step.controls) {
            errors.push(`Step no. ${index + 1} should have at least one control`);
        } else {
            step.controls.forEach((control) => {
                const varName = control.variableName;
                if (variableNames.includes(varName)) {
                    errors.push(
                        `Variable name ${varName} is used for more than one control in this flow`
                    );
                } else {
                    variableNames.push(varName);
                }
            });
        }
    });
    return errors;
}