import { Component, ElementRef, inject, OnInit, viewChild, viewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NameValidate } from './customNameValidation';
import { asynEmailValidation } from './asyncEmailValidation';
import { ApiService } from '../../services/api';
import { count } from 'rxjs';
@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration implements OnInit {

validationMessages: Record<string, string> = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minlength: 'The value is too short',
  maxlength: 'The value is too long',
  emailExists: 'This email already exists',
  nameValidation: 'Name must contain only letters',
};

getValidationMessage(control: AbstractControl | null): string {
  if (!control?.errors) {
    return '';
  }

  const errorKey = Object.keys(control.errors)[0];
  const error = control.errors[errorKey];

  return this.validationMessages[errorKey] || 'Invalid value';
}

  registrationForm!: FormGroup;

  private emailInputRef = viewChild<ElementRef<HTMLInputElement>>('emailInput');  
  private nameInputref = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  private apiService = inject(ApiService);
  private itemRef = viewChildren<ElementRef<HTMLInputElement>>('item');
  ngOnInit(): void {
    
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), NameValidate]),
      email: new FormControl('', [Validators.required, Validators.email], [asynEmailValidation(this.apiService)]),
      country: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, {
      validators: this.passMatch('password', 'cpass')
    });

    this.registrationForm.controls['username'].valueChanges.subscribe((s)=> {
      console.log(s);
      const nameInputEl = this.nameInputref()?.nativeElement;

      if(nameInputEl && nameInputEl?.value != ""){ 
        console.log("Name input has a value, hiding the input field.");
        // nameInputEl.style.display = 'none'; // Hide the input field if it has a value
      }
    });

    const itemElements = this.itemRef();
    itemElements.forEach((itemE) => {
      itemE.nativeElement.style.backgroundColor = 'lightblue'; // Change background color to light blue
    });

    setTimeout(() => {
      this.registrationForm.patchValue({ username: 'JohnDoe'}); 
    }, 5000);
    /*
    if we use setValue() method, we need to provide values for all the controls in the form group. If any control is missing, it will throw an error.
    If we use patchValue() method, we can provide values for only the controls we want to update. It will not throw an error if any control is missing.
    */

  }
  countryChanged(event: Event) {
    const selectElement = this.registrationForm.get('country')?.value;
    if(!selectElement || selectElement.trim() === '') {
      console.log('Country selection is empty or invalid.');
      this.registrationForm.controls['country'].setErrors({ required: true }); // Set an error on the country control
      return; // Exit if the selection is empty or invalid
    }
    if(selectElement === 'USA') {
      this.registrationForm.addControl('state', new FormControl('', Validators.required));
    }else if(selectElement === 'India') {
      this.registrationForm.removeControl('state');
    }
    this.registrationForm.updateValueAndValidity(); // Update the form's validity after adding/removing controls
  }
  focusAndClearInput() {
    const inputEl = this.emailInputRef()?.nativeElement;
    if (inputEl) {
      inputEl.value = ''; // Clears the input text field
      inputEl.focus();    // Moves the browser cursor focus back to it
    }
  }

   submit(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value)
    }
  }
    passMatch(pass:any,cpass:any):ValidatorFn{
    return (control:AbstractControl)=>{
      const passwordControl = control.get(pass);
      const confirmPasswordControl = control.get(cpass);

      if(!passwordControl || !confirmPasswordControl){
        return null;
      }
      const valueR = passwordControl.value === confirmPasswordControl.value;
      return !valueR ? { passwordMismatch: true } : null;
    }
  }
}
