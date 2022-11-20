import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from '../../models/type';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit {
  @Input() value!: NavItem;
  constructor() {}

  ngOnInit(): void {
    console.log(this.value);
  }
}
