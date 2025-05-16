import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sharedImports } from '../../../shared-imports';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode=false;
  registerForm:FormGroup;
  loginForm:FormGroup;

  constructor(private fb:FormBuilder,private authservice:AuthService,private router:Router){
   this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
    this.registerForm =this.fb.group({
      username:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    @Output() loginStatusChange = new EventEmitter<boolean>(); 

  onLogin(){
    if(this.loginForm.valid){
      const {username,password}=this.loginForm.value;
      this.authservice.login(username,password).subscribe(user=>{
        if(user){
          console.log("loggedin successful");
          sessionStorage.setItem('isLoggedIn', 'true');
         sessionStorage.setItem('name', user.username);
         sessionStorage.setItem('email', user.email); 
          this.loginStatusChange.emit(true);                       // Emit login status change
          this.router.navigate(['addblog']);
        }else{
          alert("invalid credential")
        }

      })
    }

  }

  onRegister(){
    if(this.registerForm.valid){
      this.authservice.register(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log('Registration successful', res);
          this.toggleMode(); // Optionally switch to login after registration
                            // You can also auto-login the user after registration (optional)
          this.onLogin();  // Directly call onLogin method to log them in
        },error:(err)=>{
            console.error('Registration failed', err);
        }
      });

    }

  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
