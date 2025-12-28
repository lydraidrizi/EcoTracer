import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../../services/habit.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {
  constructor(private habitService: HabitService) {}

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  resetData() {
    localStorage.clear();
  
  }
}