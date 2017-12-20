import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './user'
//import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { LoginService } from './login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  loading = false;
  isSubmitted = false;
  title = 'MEAN app with Socket IO';
  model = new User('');
  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit() {
  }
  loginUser() {
      this.loginService.addLogin(this.model)
      .subscribe(
        login => {
          // console.log("Messages:", messages);
          this.model = login;
          // this.getBlogs();
          this.goToChatrooms(login);
        },
        error =>  this.title = <any>error
      );
      
    }
    goToChatrooms(user) {
      this.router.navigate(['/chatRooms', user]);
    }
  
    submitLogin() {
      this.loginService.addLogin(this.model)
        .subscribe(
          userName => {
            this.model = userName;
          },
          error =>  this.title = <any>error
        );
    }

}
