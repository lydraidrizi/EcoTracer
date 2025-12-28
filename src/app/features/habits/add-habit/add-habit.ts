import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../../../services/habit.service';
import { Habit } from '../../../models/habit';

@Component({
  selector: 'app-add-habit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-habit.html',
  styleUrls: ['./add-habit.css']
})
export class AddHabit {
  private habitService = inject(HabitService);

  name = '';
  description = '';
  category = '';
  dailyGoal = 1;        
  todayCount = 0;       

  addHabit() {
    if (!this.name.trim()) return;

    const newHabit: Habit = {
      id: Date.now(),
      name: this.name,
      description: this.description,
      category: this.category || 'General',
      streak: 0,
      xp: 0,
      dailyGoal: this.dailyGoal,   
      todayCount: 0                
    };

    this.habitService.addHabit(newHabit);


    this.name = '';
    this.description = '';
    this.category = '';
    this.dailyGoal = 1;
  }
}
