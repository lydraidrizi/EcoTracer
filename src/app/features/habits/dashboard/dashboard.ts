import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../../services/habit.service';
import { Habit } from '../../../models/habit';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  private habitService = inject(HabitService);

  habits: Habit[] = [];
  totalXP = 0;
  totalStreak = 0;

  
  previousLevel = Number(localStorage.getItem('ecotracer_previous_level') || 0);

  quotes: string[] = [
    "Small steps create big change.",
    "Your habits shape your future.",
    "Every eco action counts.",
    "Consistency beats perfection.",
    "The planet thanks you today.",
    "One habit at a time.",
    "Progress, not perfection.",
    "You’re building a greener future.",
    "Tiny actions, massive impact.",
    "Keep going — you’re doing great."
  ];

  get dailyQuote() {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  constructor() {
    this.habits = this.habitService.getHabits();
    this.calculateStats();

    
    if (this.level > this.previousLevel) {
      this.habitService.streakFreezeTokens++;
      this.habitService.saveFreezeTokens();
      localStorage.setItem('ecotracer_previous_level', String(this.level));
    }
  }

  calculateStats() {
    this.totalXP = this.habits.reduce((sum, h) => sum + h.xp, 0);
    this.totalStreak = this.habits.reduce((sum, h) => sum + h.streak, 0);
  }

  get dailyGoalsCompleted() {
    return this.habits.filter(h => (h.todayCount || 0) >= h.dailyGoal).length;
  }

  get totalDailyGoals() {
    return this.habits.length;
  }

  get dailyProgressPercent() {
    return (this.dailyGoalsCompleted / this.totalDailyGoals) * 100;
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
        unlocked: this.dailyGoalsCompleted === this.totalDailyGoals
      }
    ];
  }

  get totalXp() {
    return this.habits.reduce((sum, h) => sum + (h.xp || 0), 0);
  }

  get level() {
    return Math.floor(this.totalXp / 100);
  }

  get nextLevelXp() {
    return (this.level + 1) * 100;
  }

  get xpIntoCurrentLevel() {
    return this.totalXp - this.level * 100;
  }

  get xpForCurrentLevel() {
    return 100;
  }

  get levelProgressPercent() {
    return (this.xpIntoCurrentLevel / this.xpForCurrentLevel) * 100;
  }

  get weeklyXp() {
    const history = JSON.parse(localStorage.getItem('ecotracer_xp_history') || '{}');
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toDateString();

      result.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        xp: history[key] || 0
      });
    }

    return result;
  }

  get totalStreaks() {
    return this.habits.reduce((sum, h) => sum + (h.streak || 0), 0);
  }

  get ecoScore() {
    return this.totalXp + this.totalStreaks * 2;
  }

  
  get streakFreezeTokens() {
    return this.habitService.streakFreezeTokens;
  }
}
