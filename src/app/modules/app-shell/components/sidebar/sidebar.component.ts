import { Component, OnInit } from '@angular/core';
import { UserEntity } from '@core/models/entities/user.entity';
import { GroupIconSizePropertyName } from '@ui/icon/type';
import { Observable } from 'rxjs';
import { AppShellFacade } from '../../app-shell.facade';
import { CollectionEntity } from './../../models/entities/collection.entity';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  vm$!: Observable<UserEntity | null>;
  collections$!: Observable<CollectionEntity[]>;

  IconSize = GroupIconSizePropertyName;

  list: {
    icon: string;
    text: string;
  }[] = [
    {
      icon: 'layers-three',
      text: 'Inbox',
    },
    {
      icon: 'bell',
      text: 'Activity',
    },
    {
      icon: 'settings',
      text: 'Settings',
    },
  ];
  selectedItem: string | null = null;
  constructor(private readonly appShellFacade: AppShellFacade) {}
  ngOnInit(): void {
    this.vm$ = this.appShellFacade.userProfile();
    this.collections$ = this.appShellFacade.getCollections();
  }

  onSelect(index: string) {
    this.selectedItem = index;
  }

  logout() {
    this.appShellFacade.logout().subscribe();
  }
}
