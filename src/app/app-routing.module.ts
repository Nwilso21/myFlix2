import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Sets up a router to direct the pages accordinlgy
 */

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
