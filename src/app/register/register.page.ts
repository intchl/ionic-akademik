import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../shared/auth-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  async signUP() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.signupForm.valid) {
      const user = await this.authService
        .registerUser(
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.signupForm.value.name
        )
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
