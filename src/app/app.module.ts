import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import {AppRoutingModule} from './app.routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderComponent } from './naviogation/header/header.component';
import { SidenavListComponent } from './naviogation/sidenav-list/sidenav-list.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AuthModule} from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {reducers} from './app.reducer';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFireStorageModule,
    StoreModule.forRoot(reducers),
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
