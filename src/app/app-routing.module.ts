import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
