import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLogin } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


/**
 * Generates a window to prompt a user for a login
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
  };
  constructor(
    public fetchApiData: UserLogin,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
 
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('User Login successful', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
      },

      (result) => {
        this.snackBar.open(result, 'NOT OK', {
          duration: 2000,
        });
      }
    );
  }
}