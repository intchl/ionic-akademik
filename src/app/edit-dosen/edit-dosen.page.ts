import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DosenService } from './../shared/dosen.service';

@Component({
  selector: 'app-edit-dosen',
  templateUrl: './edit-dosen.page.html',
  styleUrls: ['./edit-dosen.page.scss'],
})
export class EditDosenPage implements OnInit {
  updateDosenForm: FormGroup;
  id: any;
  constructor(
    private dosenService: DosenService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.dosenService
      .getDosen(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.updateDosenForm.setValue(res);
      });
  }
  ngOnInit() {
    this.updateDosenForm = this.fb.group({
      nama_d: [''],
      nidn: [''],
    });
    console.log(this.updateDosenForm.value);
  }
  updateForm() {
    this.dosenService
      .updateDosen(this.id, this.updateDosenForm.value)
      .then(() => {
        this.router.navigate(['/../list-dosen/']);
      })
      .catch((error) => console.log(error));
  }
}
