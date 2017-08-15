import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { NotLoginGuard } from './guards/notlogin-guard.service';

import { MDashboardComponent } from './m-dashboard/m-dashboard.component';
import { MNotFoundComponent } from './m-notfound/m-notfound.component';
import { MAssignmentsAllComponent } from './m-assignments/m-assignments-all.component';
import { MAssignmentsComponent } from './m-assignments/m-assignments.component';
import { MStudentsComponent } from './m-students/m-students.component';
import { MSubmissionsComponent } from './m-submissions/m-submissions.component';
import { MNotLoggedInComponent } from './m-notfound/m-notloggedin.component';

const routes: Routes = [
  { 
    path: '',   
    redirectTo: '/dashboard', 
    pathMatch: 'full'
  },{
    path: 'dashboard',
    component: MDashboardComponent,
    canActivate: [ AuthGuard ]
  },{
    path: 'students',
    component: MStudentsComponent,
    canActivate: [ AdminGuard ]
  },{
    path: 'assignments',
    component: MAssignmentsComponent,
    canActivate: [ AdminGuard ]
  },{
    path: 'submissions/:id',
    component: MSubmissionsComponent,
    canActivate: [ AuthGuard ]
  },{ 
    path: 'error', 
    component: MNotFoundComponent,
    canActivate: [ AuthGuard ]
  },{ 
    path: 'notLoggedIn', 
    component: MNotLoggedInComponent,
    canActivate: [ NotLoginGuard ]
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