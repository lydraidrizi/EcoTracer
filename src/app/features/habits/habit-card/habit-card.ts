import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Habit } from '../../../models/habit';
import { HabitService } from '../../../services/habit.service';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './habit-card.html',
  styleUrls: ['./habit-card.css']
})
export class HabitCard {
  @Input() habit!: Habit;
  popAnimation = false;

  constructor(private habitService: HabitService) {}

  deleteHabit() {
    this.habitService.deleteHabit(this.habit.id);
  }

  getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'recycling':
        return '♻️';
      case 'transport':
        return '🚶';
      case 'energy':
        return '💡';
      case 'health':
        return '💚';
      case 'water':
        return '💧';
      default:
        return '🌱';
    }
  }

  getCategoryColor(category: string): string {
    switch (category.toLowerCase()) {
      case 'recycling':
        return '#4caf50';
      case 'transport':
        return '#2196f3';
      case 'energy':
        return '#ff9800';
      case 'health':
        return '#e91e63';
      case 'water':
        return '#03a9f4';
      default:
        return '#9e9e9e';
    }
  }

  getProgressPercent(): number {
    const xp = this.habit.xp;
    const percent = (xp % 50) / 50 * 100;
    return Math.min(percent, 100);
  }

  completeHabit() {
    this.habit.streak++;
    this.habit.xp += 5;
    this.habit.todayCount = (this.habit.todayCount || 0) + 1;

    this.habitService.logDailyXp(5);
    this.habitService.updateHabit(this.habit);
    this.habitService.logHabitHistory(this.habit.name);
    this.popAnimation = true;
    setTimeout(() => this.popAnimation = false, 300);
  }
}