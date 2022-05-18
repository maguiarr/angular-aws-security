import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PrivateContentComponent } from './private-content/private-content.component';
import { SsoComponent } from './sso/sso.component';

const routes: Routes = [
  { path: '', component: HomeComponent}, 
  { path: 'about', component: AboutComponent}, 
  { path: 'private', component: PrivateContentComponent},
  { path: 'home', component: HomeComponent},
  { path: 'sso', component: SsoComponent},
  { path: '**', redirectTo: ""},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
