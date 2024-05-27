import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatkulService } from './../shared/matkul.service';
import { Dosen } from '../shared/Dosen';
import { DosenService } from './../shared/dosen.service';

@Component({
  selector: 'app-edit-matkul',
  templateUrl: './edit-matkul.page.html',
  styleUrls: ['./edit-matkul.page.scss'],
})
export class EditMatkulPage implements OnInit {
  Dosens: Dosen[] = [];
  updateMatkulForm: FormGroup;
  id: any;
  constructor(
    private matkulService: MatkulService,
    private dosenService: DosenService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.matkulService

      .getMatkul(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.updateMatkulForm.setValue(res);
      });
  }
  ngOnInit() {
    this.updateMatkulForm = this.fb.group({
      nama_mk: [''],
      kode_mk: [''],
      sms: [''],
      sks: [''],
      dosen: [''],
    });
    console.log(this.updateMatkulForm.value);
    this.fetchDosens();
  }

  fetchDosens() {
    this.dosenService
      .getDosenList()
      .snapshotChanges()
      .subscribe((res) => {
        this.Dosens = [];
        res.forEach((item) => {
          let a: any = item.payload.toJSON();
          a['$key'] = item.key;
          this.Dosens.push(a as Dosen);
        });
      });
  }

  updateForm() {
    this.matkulService
      .updateMatkul(this.id, this.updateMatkulForm.value)
      .then(() => {
        this.router.navigate(['/../list-matkul//']);
      })
      .catch((error) => console.log(error));
  }
}
