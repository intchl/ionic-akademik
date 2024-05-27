import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  email: any;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService
      .getProfile()
      .then((user) => {
        this.email = user?.email;
        console.log(user?.email);
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
      });
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
