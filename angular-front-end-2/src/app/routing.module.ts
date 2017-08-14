import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin-guard.service';
import { MDashboardComponent } from './m-dashboard/m-dashboard.component';
import { MNotFoundComponent } from './m-notfound/m-notfound.component';
import { MAssignmentsAllComponent } from './m-assignments/m-assignments-all.component';
import { MAssignmentsComponent } from './m-assignments/m-assignments.component';
import { MStudentsComponent } from './m-students/m-students.component';
import { MSubmissionsComponent } from './m-submissions/m-submissions.component';

const routes: Routes = [
  { 
    path: '',   
    redirectTo: '/dashboard', 
    pathMatch: 'full'
  },{
    path: 'dashboard',
    component: MDashboardComponent
  },{
    path: 'submissions/:id',
    component: MSubmissionsComponent
  },{
    path: 'students',
    component: MStudentsComponent,
    canActivate: [ AdminGuard ]
  },{
    path: 'assignments',
    component: MAssignmentsComponent,
    canActivate: [ AdminGuard ]
  },{ 
    path: 'error', 
    component: MNotFoundComponent
  },{ 
    path: '**', 
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class RoutingModule { }