import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  isLoggedIn = false;

    constructor(private route: ActivatedRoute,
    private router: Router,
    public loginService: AuthenticationService) { }

    ngOnInit() {
      this.isLoggedIn = this.loginService.isUserLoggedIn();
      console.log('menu ->' + this.isLoggedIn);
    }

}
