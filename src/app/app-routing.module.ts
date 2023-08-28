import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthorizationGuardService } from 'src/services/authorization/authorization-guard.service';


const routes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthorizationGuardService],
    loadChildren: () => import('./layout/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    canActivate: [AuthorizationGuardService],
    component: LayoutComponent,
    loadChildren: () => import('./layout/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'authorization',
    loadChildren: () => import('./modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
  },
  {
    path: '**',
    redirectTo: 'layout',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
