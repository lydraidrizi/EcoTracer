import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class History {
  history: any[] = [];

  constructor() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = JSON.parse(localStorage.getItem('ecotracer_history') || '[]');
  }

  formatDate(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
