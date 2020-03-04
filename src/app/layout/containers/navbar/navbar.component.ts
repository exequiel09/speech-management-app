import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy, OnInit {
  @Input() collapsed = true;
  @Input() pageTitle = 'Speech Manager';

  private readonly _unsubscribe$ = new Subject<any>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _router: Router
  ) {
    // we'll trigger change detection here manually on every NavigationEnd event since
    // `routerLinkActive` directive does not propagate changes to `isActive` property
    // if the parent component's change detection strategy is set to `OnPush`.
    this._router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),

        delay(0),

        // terminate the pipeline when it receives a notification value from a source observable/subject
        takeUntil(this._unsubscribe$)
      )
      .subscribe(() => this._cdr.markForCheck())
      ;
  }

  ngOnDestroy() {
    // push a notification value to terminate existing subscribers and complete the subject immediately
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() { }

  toggle() {
    this.collapsed = !this.collapsed;
    this._cdr.markForCheck();
  }

}
