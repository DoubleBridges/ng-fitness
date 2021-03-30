import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>) {
  }

  ngOnInit(): void {
    this.store.subscribe(data => console.log(data));
    this.loadingSubscription = this.uiService
      .loadingStateChanged
      .subscribe(isLoading => this.isLoading = isLoading);
  }

  onSubmit(form: NgForm): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    !!this.loadingSubscription && this.loadingSubscription.unsubscribe();
  }

}
