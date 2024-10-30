import { Component } from '@angular/core';

import { AdminFormComponent } from '../../components/admin-form/admin-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
