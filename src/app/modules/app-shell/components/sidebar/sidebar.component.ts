import { Component, OnInit } from '@angular/core';
import { AppShellFacade } from '../../app-shell.facade';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private readonly appShellFacade: AppShellFacade) {}
  ngOnInit(): void {}

  logout() {
    this.appShellFacade.logout().subscribe();
  }
}
