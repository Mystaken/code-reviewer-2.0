import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APIService } from './api.service';
import { AuthService } from '../auth/auth.service';


@NgModule({
  declarations: [],
  imports: [
    HttpModule
  ],
  providers: [
    APIService,
    AuthService
  ],
  bootstrap: []
})
export class APIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: APIServiceModule,
      providers: [
        APIService
      ]
    };
  }
}