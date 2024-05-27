import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MahasiswaService } from './../shared/mahasiswa.service';

@Component({
  selector: 'app-edit-mahasiswa',
  templateUrl: './edit-mahasiswa.page.html',
  styleUrls: ['./edit-mahasiswa.page.scss'],
})
export class EditMahasiswaPage implements OnInit {
  updateMahasiswaForm: FormGroup;
  id: any;
  constructor(
    private mahasiswaService: MahasiswaService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.mahasiswaService
      .getMahasiswa(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.updateMahasiswaForm.setValue(res);
      });
  }
  ngOnInit() {
    this.updateMahasiswaForm = this.fb.group({
      nama_ms: [''],
      nim: [''],
      sms: [''],
    });
    console.log(this.updateMahasiswaForm.value);
  }
  updateForm() {
    this.mahasiswaService
      .updateMahasiswa(this.id, this.updateMahasiswaForm.value)
      .then(() => {
        this.router.navigate(['/../list-mahasiswa/']);
      })
      .catch((error) => console.log(error));
  }
}
