import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  habits: Habit[] = [];

  constructor(private habitService: HabitService) {
    this.habits = this.habitService.getHabits();
  }

  get totalXp() {
    return this.habits.reduce((sum, h) => sum + (h.xp || 0), 0);
  }

  get totalStreaks() {
    return this.habits.reduce((sum, h) => sum + (h.streak || 0), 0);
  }

  get level() {
    return Math.floor(this.totalXp / 100);
  }

  get ecoScore() {
    return this.totalXp + this.totalStreaks * 2;
  }

  get achievements() {
    return [
      {
        name: 'Streak Master',
        unlocked: this.habits.some(h => h.streak >= 7)
      },
      {
        name: 'Eco Warrior',
        unlocked: this.habits.some(h => h.xp >= 100)
      },
      {
        name: 'Daily Hero',
        unlocked: this.habits.filter(h => (h.todayCount || 0) >= h.dailyGoal).length === this.habits.length
      }
    ];
  }
}