import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
