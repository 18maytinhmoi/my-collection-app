import { Component, OnInit } from '@angular/core';
import { UserEntity } from '@core/models/entities/user.entity';
import { BaseComponent } from '@core/services/base.components';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AppShellFacade } from '../../app-shell.facade';
import { NavItem } from '../../models/type';

type ViewModel = {
  user: UserEntity | null;
  navCollectionItems: NavItem[];
  navItems: NavItem[];
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends BaseComponent<ViewModel> implements OnInit {
  list: NavItem[] = [
    {
      iconKey: 'layers-three',
      text: 'Inbox',
      key: Symbol(),
      active: false,
      link: '',
    },
    {
      iconKey: 'bell',
      text: 'Activity',
      key: Symbol(),
      active: false,
      link: '',
    },
    {
      iconKey: 'settings',
      text: 'Settings',
      key: Symbol(),
      active: false,
      link: '',
    },
  ];
  selectedItemKeySubject!: BehaviorSubject<string | symbol | undefined>;
  constructor(private readonly appShellFacade: AppShellFacade) {
    super();
  }

  ngOnInit(): void {
    this.selectedItemKeySubject = new BehaviorSubject<string | symbol | undefined>(
      undefined
    );

    const user$ = this.appShellFacade
      .userProfile()
      .pipe(map(user => (vm: ViewModel) => ({ ...vm, user })));

    const navCollectionItems$ = combineLatest([
      this.selectedItemKeySubject.asObservable(),
      this.appShellFacade.getCollections(),
    ]).pipe(
      map(([key, data]) => {
        return data.map(item => ({
          key: item.id,
          text: item.name,
          iconKey: item.iconKey,
          link: `bookmark/${item.id}`,
          active: item.id === key,
        }));
      }),
      map(navCollectionItems => (vm: ViewModel) => ({ ...vm, navCollectionItems }))
    );

    this.initialize([user$, navCollectionItems$], {
      user: null,
      navCollectionItems: [],
      navItems: this.list,
    });
  }

  onNavItemClick(key: string | symbol) {
    this.selectedItemKeySubject.next(key);
  }

  logout() {
    this.appShellFacade.logout().subscribe();
  }
}
