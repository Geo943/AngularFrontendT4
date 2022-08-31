import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'cliente', redirectTo: 'cliente/index', pathMatch: 'full'},
  { path: 'cliente/index', component: IndexComponent },
  { path: 'cliente/create', component: CreateComponent },
  { path: 'cliente/:postId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
