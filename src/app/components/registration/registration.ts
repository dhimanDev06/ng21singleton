import { Component, ElementRef, OnInit, viewChild, viewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration implements OnInit {
  registrationForm!: FormGroup;

  private emailInputRef = viewChild<ElementRef<HTMLInputElement>>('emailInput');  
  private nameInputref = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  private itemRef = viewChildren<ElementRef<HTMLInputElement>>('item');
  ngOnInit(): void {
    
    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
        nameInputEl.style.display = 'none'; // Hide the input field if it has a value
      }
    });

    const itemElements = this.itemRef();
    itemElements.forEach((itemE) => {
      itemE.nativeElement.style.backgroundColor = 'lightblue'; // Change background color to light blue
    });

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
