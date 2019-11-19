import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { TopicsComponent } from './topics/topics.component';


const routes: Routes = [
  {path:"", redirectTo: 'home', pathMatch:"full"},
  {path:'home', component:HomeComponent},
  {path: 'about', component:MenuComponent},
  {path: 'topics', component:TopicsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
