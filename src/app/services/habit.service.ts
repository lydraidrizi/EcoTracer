import { Injectable } from '@angular/core';
import { Habit } from '../models/habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private storageKey = 'ecotracer_habits';

  
  streakFreezeTokens = Number(localStorage.getItem('ecotracer_freeze_tokens') || 0);

  private defaultHabits: Habit[] = [
    {
      id: 1,
      name: 'Recycle plastic',
      description: 'Recycle plastic bottles and containers at home.',
      category: 'Recycling',
      streak: 0,
      xp: 10,
      dailyGoal: 1,
      todayCount: 0
    },
    {
      id: 2,
      name: 'Walk instead of drive',
      description: 'Choose walking for short distances instead of using a car.',
      category: 'Transport',
      streak: 0,
      xp: 15,
      dailyGoal: 1,
      todayCount: 0
    },
    {
      id: 3,
      name: 'Turn off unused lights',
      description: 'Switch off lights when leaving a room.',
      category: 'Energy',
      streak: 0,
      xp: 5,
      dailyGoal: 1,
      todayCount: 0
    }
  ];

  constructor() {
    this.loadHabits();
    this.resetDailyCountsIfNeeded();
  }

  private habits: Habit[] = [];

  private loadHabits() {
    const saved = localStorage.getItem(this.storageKey);
    this.habits = saved ? JSON.parse(saved) : this.defaultHabits;
  }

  private saveHabits() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.habits));
  }

  
  saveFreezeTokens() {
    localStorage.setItem('ecotracer_freeze_tokens', String(this.streakFreezeTokens));
  }

  getHabits(): Habit[] {
    return this.habits;
  }

  updateHabit(updatedHabit: Habit) {
    const index = this.habits.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      this.habits[index] = updatedHabit;
      this.saveHabits();
    }
  }

  addHabit(habit: Habit) {
    this.habits.push(habit);
    this.saveHabits();
  }

  deleteHabit(id: number) {
    this.habits = this.habits.filter(h => h.id !== id);
    this.saveHabits();
  }

  
  resetDailyCountsIfNeeded() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('ecotracer_last_reset');

    if (savedDate !== today) {

      this.habits.forEach(h => {
        
        if ((h.todayCount || 0) < h.dailyGoal) {

          if (this.streakFreezeTokens > 0) {
            
            this.streakFreezeTokens--;
            this.saveFreezeTokens();
          } else {
            
            h.streak = 0;
          }
        }

        
        h.todayCount = 0;
      });

      localStorage.setItem('ecotracer_last_reset', today);
      this.saveHabits();
    }
  }

  
  logDailyXp(amount: number) {
    const today = new Date().toDateString();
    const history = JSON.parse(localStorage.getItem('ecotracer_xp_history') || '{}');

    if (!history[today]) {
      history[today] = 0;
    }

    history[today] += amount;

    localStorage.setItem('ecotracer_xp_history', JSON.stringify(history));
  }

  
  logHabitHistory(habitName: string) {
    const entry = {
      name: habitName,
      timestamp: new Date().toISOString()
    };

    const history = JSON.parse(localStorage.getItem('ecotracer_history') || '[]');
    history.unshift(entry);
    localStorage.setItem('ecotracer_history', JSON.stringify(history));
  }
}
