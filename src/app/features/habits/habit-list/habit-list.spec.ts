import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habit-list.html',
  styleUrls: ['./habit-list.css']
})
export class HabitList {}
