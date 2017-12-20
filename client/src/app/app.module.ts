import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


import { MEAN2RoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MEAN2RoutingModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatroomComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }