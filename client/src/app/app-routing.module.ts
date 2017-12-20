import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'chatRooms', component:ChatroomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MEAN2RoutingModule { }