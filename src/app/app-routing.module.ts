import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { HomeComponent } from './home/home.component';
import { LazyComponent } from './lazy/lazy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      /* Lazy Loading change url on routerLink */
      // {
      //   path:'',
      //   loadComponent: () => import('src/app/lazy/lazy.component').then(c => c.LazyComponent),
      // }

      /* Normal route don't change url on routerLink */
      {
        path:'',
        component: LazyComponent
      }
    ]
  },
  {
    path: 'page',
    component: PortalComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
