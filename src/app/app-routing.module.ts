import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'edit-matkul/:id',
    loadChildren: () =>
      import('./edit-matkul/edit-matkul.module').then(
        (m) => m.EditMatkulPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'start',
    loadChildren: () =>
      import('./start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'list-matkul',
    loadChildren: () =>
      import('./list-matkul/list-matkul.module').then(
        (m) => m.ListMatkulPageModule
      ),
  },
  {
    path: 'list-mahasiswa',
    loadChildren: () =>
      import('./list-mahasiswa/list-mahasiswa.module').then(
        (m) => m.ListMahasiswaPageModule
      ),
  },
  {
    path: 'edit-mahasiswa/:id',
    loadChildren: () =>
      import('./edit-mahasiswa/edit-mahasiswa.module').then(
        (m) => m.EditMahasiswaPageModule
      ),
  },
  {
    path: 'list-dosen',
    loadChildren: () =>
      import('./list-dosen/list-dosen.module').then(
        (m) => m.ListDosenPageModule
      ),
  },
  {
    path: 'edit-dosen/:id',
    loadChildren: () =>
      import('./edit-dosen/edit-dosen.module').then(
        (m) => m.EditDosenPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'list-krs',
    loadChildren: () =>
      import('./list-krs/list-krs.module').then((m) => m.ListKrsPageModule),
  },
  {
    path: 'edit-krs/:id',
    loadChildren: () =>
      import('./edit-krs/edit-krs.module').then((m) => m.EditKrsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
