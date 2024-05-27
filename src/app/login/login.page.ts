import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../shared/auth-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.loginForm.valid) {
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .catch((err) => {
          // this.presentToast(err);
          console.log(err);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.router.navigate(['/tabs/tab1']);
      }
    } else {
      return console.log('Please provide all the required values!');
    }
  }
}
