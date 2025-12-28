import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../../services/habit.service';
import { HabitCard } from '../habit-card/habit-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, HabitCard, FormsModule],
  templateUrl: './habit-list.html',
  styleUrls: ['./habit-list.css']
})
export class HabitList {
  private habitService = inject(HabitService);
  habits = this.habitService.getHabits();

 
  sortBy: string = 'none';
  filterCategory: string = 'all';


  get categories() {
    return [...new Set(this.habits.map(h => h.category))];
  }

 
  get filteredHabits() {
    let list = [...this.habits];

   
    if (this.filterCategory !== 'all') {
      list = list.filter(h => h.category === this.filterCategory);
    }

    
    switch (this.sortBy) {
      case 'xp':
        list.sort((a, b) => b.xp - a.xp);
        break;
      case 'streak':
        list.sort((a, b) => b.streak - a.streak);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        list.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return list;
  }
}
