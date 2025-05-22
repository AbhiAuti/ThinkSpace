import { Routes } from '@angular/router';
import { AddblogComponent } from './Components/Blog/addblog/addblog.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { ReadblogComponent } from './Components/Blog/readblog/readblog.component';
import { authGuard } from './Gaurd/auth.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'addblog',component:AddblogComponent,canActivate: [authGuard]},
    {path:'login',component:LoginComponent},
    {path:'blog/:id',component:ReadblogComponent}
];
