import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScrollService } from '../scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor(public router: Router, public scrollService: ScrollService) {}

  ngOnInit(): void {}
}
