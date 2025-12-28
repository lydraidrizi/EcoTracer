import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../../../services/habit.service';
import { Habit } from '../../../models/habit';

@Component({
  selector: 'app-edit-habit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-habit.html',
  styleUrls: ['./edit-habit.css']
})
export class EditHabit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private habitService = inject(HabitService);

  habit!: Habit;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const habits = this.habitService.getHabits();
    this.habit = habits.find(h => h.id === id)!;
  }

  save() {
    this.habitService.updateHabit(this.habit);
    this.router.navigate(['/habits']);
  }
}
