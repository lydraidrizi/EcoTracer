import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit';

interface CategorySummary {
  name: string;
  count: number;
  totalXp: number;
  totalStreak: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})
export class Categories {
  private habitService = inject(HabitService);
  habits: Habit[] = [];

  constructor() {
    this.habits = this.habitService.getHabits();
  }

  get categories(): CategorySummary[] {
    const map: Record<string, CategorySummary> = {};

    this.habits.forEach(h => {
      if (!map[h.category]) {
        map[h.category] = {
          name: h.category,
          count: 0,
          totalXp: 0,
          totalStreak: 0
        };
      }

      map[h.category].count++;
      map[h.category].totalXp += h.xp;
      map[h.category].totalStreak += h.streak;
    });

    return Object.values(map);
  }
}