import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from '../../models/type';

@Component({
  selector: 'app-nav-collection-item',
  templateUrl: './nav-collection-item.component.html',
  styleUrls: ['./nav-collection-item.component.scss'],
})
export class NavCollectionItemComponent implements OnInit {
  @Input() value!: NavItem;
  constructor() {}

  ngOnInit(): void {
    console.log(this.value);
  }
}
