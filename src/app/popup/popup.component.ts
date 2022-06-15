import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
qualificationList = ['Under graduate', 'Post graduate'];
genderList = ['Male', 'Female'];
userForm !: FormGroup;
actionButton: string = 'submit';
successMsg: string = '';
errorMsg: string = '';
  constructor(private formBuilder: FormBuilder,
     private user: UserService, 
     private dialogRef: MatDialogRef<PopupComponent>,
     @Inject(MAT_DIALOG_DATA) public editData: any ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        qualification: ['', Validators.required],
        dob: ['', Validators.required],
        gender: ['', Validators.required]
      }
    )
    const editData = this.editData.data;
    if(editData) {
      this.actionButton = 'Save';
      this.userForm.controls['firstName'].setValue(editData.firstName);
      this.userForm.controls['lastName'].setValue(editData.lastName);
      this.userForm.controls['gender'].setValue(editData.gender);
      this.userForm.controls['dob'].setValue(editData.dob);
      this.userForm.controls['qualification'].setValue(editData.qualification);
    }
  }

get firstName() {
  return this.userForm.get('firstName');
}
get lastName() {
  return this.userForm.get('lastName');

}
get gender() {
  return this.userForm.get('gender');

}
get dob() {
  return this.userForm.get('dob');

}
get qualification() {
  return this.userForm.get('qualification');
}

  submitForm() {
    if(!this.editData.data) {
      if(this.userForm.valid) {
        this.user.addUserDetails(this.userForm.value).subscribe({
          next:(result) => {
            alert('User details added successfully...');
             this.userForm.reset();
             this.dialogRef.close('save');
          },
          error:() => {
            this.errorMsg = 'Something went wrong...';
          }
        });
      } else {
        this.errorMsg = 'Something went wrong...';
      }
    } else {
       this.updateUserDetails();
    }

  }
  updateUserDetails() {
    const editData = this.editData.data;
    this.user.putUserDetails(this.userForm.value, editData.id).subscribe({
      next:() => {
        alert('User details updated successfully...')
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this.errorMsg = 'Something went wrong...'
      }
    })
  }

}
