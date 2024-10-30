import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check login status', () => {
    expect(service.checkLoginStatus()).toBe(false);
    localStorage.setItem('authToken', 'testtoken');
    expect(service.checkLoginStatus()).toBe(true);
  });

  it('should get username from localStorage', () => {
    expect(service.getUsername()).toBeNull();
    localStorage.setItem('username', 'testuser');
    expect(service.getUsername()).toBe('testuser');
  });

  it('should login and update observables', fakeAsync(() => {
    service.login('testuser', 'testpass');
    expect(localStorage.getItem('authToken')).toBe('testuser_testpass');
    expect(localStorage.getItem('username')).toBe('testuser');

    let isLoggedIn: boolean = false;
    let username: string | null = null;

    service.isLoggedIn$.subscribe((value) => {
      isLoggedIn = value;
    });
    service.username$.subscribe((value) => {
      username = value;
    });

    tick();

    expect(isLoggedIn).toBeTruthy();
    expect(username).toBe('testuser');
  }));

  it('should logout and clear observables', fakeAsync(() => {
    service.login('testuser', 'testpass');
    tick();

    service.logout();

    let isLoggedIn: boolean = true;
    let username: string | null = 'testuser';

    service.isLoggedIn$.subscribe((value) => {
      isLoggedIn = value;
    });
    service.username$.subscribe((value) => {
      username = value;
    });

    tick();

    expect(isLoggedIn).toBeFalsy();
    expect(username).toBeNull();
  }));
});
