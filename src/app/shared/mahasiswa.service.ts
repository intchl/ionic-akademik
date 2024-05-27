import { Injectable } from '@angular/core';
import { Mahasiswa } from '../shared/Mahasiswa';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class MahasiswaService {
  MahasiswaListRef: AngularFireList<any>;
  MahasiswaRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createMahasiswa(Mahasiswa: Mahasiswa) {
    return this.MahasiswaListRef.push({
      nama_ms: Mahasiswa.nama_ms,
      nim: Mahasiswa.nim,
      sms: Mahasiswa.sms,
    });
  }

  // Get Single
  getMahasiswa(id: string) {
    this.MahasiswaRef = this.db.object('/Mahasiswa/' + id);
    return this.MahasiswaRef;
  }

  // Get List
  getMahasiswaList() {
    this.MahasiswaListRef = this.db.list('/Mahasiswa');
    return this.MahasiswaListRef;
  }

  // Update
  updateMahasiswa(id: any, Mahasiswa: Mahasiswa) {
    return this.MahasiswaRef.update({
      nama_ms: Mahasiswa.nama_ms,
      nim: Mahasiswa.nim,
      sms: Mahasiswa.sms,
    });
  }

  // Delete
  deleteMahasiswa(id: string) {
    this.MahasiswaRef = this.db.object('/Mahasiswa/' + id);
    this.MahasiswaRef.remove();
  }
}
