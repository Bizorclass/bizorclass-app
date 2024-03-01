import { AbstractControl, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let _value = control.value;

        // let flag = true;
        // let helperText = "";
        // if (!inputText || inputText==="") {
        //   flag = false;
        //   helperText = `Please enter ${fieldName}.`;
        // } else if(inputText.length < 10 || inputText.length > 10){
        //   flag = false;
        //   helperText = `Please enter valid ${fieldName}.`;
        // }
        // return {flag,helperText}

        let flag = true;
        let helperText = "";

        if (!_value || _value === "") {
            flag = false;
            helperText = `Please enter ${field_name}.`;
        } else if (_value.length < 10 || _value.length > 10) {
            flag = false;
            helperText = `Please enter valid ${field_name}.`;
        } else {
            helperText = "";
            flag = true;
        }

        return flag ? null : { 'phoneNumberValidator': helperText };
    };
}
