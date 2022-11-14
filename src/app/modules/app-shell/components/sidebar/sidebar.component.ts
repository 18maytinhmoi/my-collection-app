import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selectedItemLinkSubject!: BehaviorSubject<string>;
  constructor(
    private readonly _router: Router,
    private readonly appShellFacade: AppShellFacade
  ) {
    super();
  }

  ngOnInit(): void {
    const url = this._router.url;
    this.selectedItemLinkSubject = new BehaviorSubject<string>(url);

    const user$ = this.appShellFacade
      .userProfile()
      .pipe(map(user => (vm: ViewModel) => ({ ...vm, user })));

    const navCollectionItems$ = combineLatest([
      this.selectedItemLinkSubject.asObservable(),
      this.appShellFacade.getCollections(),
    ]).pipe(
      map(([link, data]) =>
        data.map(item => {
          const paths = link.split('/');
          const active = link.includes('bookmark') && paths[paths.length - 1] === item.id;

          return {
            key: item.id,
            text: item.name,
            iconKey: item.iconKey,
            link: `bookmark/${item.id}`,
            active,
          };
        })
      ),
      map(navCollectionItems => (vm: ViewModel) => ({ ...vm, navCollectionItems }))
    );

    this.initialize([user$, navCollectionItems$], {
      user: null,
      navCollectionItems: [],
      navItems: this.list,
    });
  }

  onNavItemClick(link: string) {
    this.selectedItemLinkSubject.next(link);
  }

  logout() {
    this.appShellFacade.logout().subscribe();
  }
}
