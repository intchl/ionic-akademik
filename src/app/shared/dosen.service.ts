import { Injectable } from '@angular/core';
import { Dosen } from '../shared/Dosen';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DosenService {
  DosenListRef: AngularFireList<any>;
  DosenRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createDosen(Dosen: Dosen) {
    return this.DosenListRef.push({
      nama_d: Dosen.nama_d,
      nidn: Dosen.nidn,
    });
  }

  // Get Single
  getDosen(id: string) {
    this.DosenRef = this.db.object('/Dosen/' + id);
    return this.DosenRef;
  }

  // Get List
  getDosenList() {
    this.DosenListRef = this.db.list('/Dosen');
    return this.DosenListRef;
  }

  // Update
  updateDosen(id: any, Dosen: Dosen) {
    return this.DosenRef.update({
      nama_d: Dosen.nama_d,
      nidn: Dosen.nidn,
    });
  }

  // Delete
  deleteDosen(id: string) {
    this.DosenRef = this.db.object('/Dosen/' + id);
    this.DosenRef.remove();
  }
}
