import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  @Input() collapsed = true;
  @Input() pageTitle = 'Speech Manager';

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  toggle() {
    this.collapsed = !this.collapsed;
    this._cdr.markForCheck();
  }

}
