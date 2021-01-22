import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;

  private users = {
    maxi: { name: 'Maxi', picture: 'assets/images/eva.png' },
    jakob: { name: 'Jakob', picture: 'assets/images/lee.png' },
    laura: { name: 'Laura', picture: 'assets/images/alan.png' },    
    marco: { name: 'Marco', picture: 'assets/images/kate.png'}
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.marco, type: this.types.mobile },
    { user: this.users.maxi, type: this.types.home },
    { user: this.users.laura, type: this.types.mobile },
    { user: this.users.jakob, type: this.types.work },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.users.marco, type: this.types.mobile, time: this.time.setHours(21, 12)},
    { user: this.users.maxi, type: this.types.home, time: this.time.setHours(11, 24)},
    { user: this.users.jakob, type: this.types.work, time: this.time.setHours(9, 42)},
    { user: this.users.laura, type: this.types.mobile, time: this.time.setHours(8, 0)},
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
