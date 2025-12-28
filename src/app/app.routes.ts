import { Routes } from '@angular/router';
import { HabitList } from './features/habits/habit-list/habit-list';
import { Dashboard } from './features/habits/dashboard/dashboard';
import { AddHabit } from './features/habits/add-habit/add-habit';
import { EditHabit } from './features/habits/edit-habit/edit-habit';
import { Settings } from './features/habits/settings/settings';
import { Categories } from './features/categories/categories';
import { History } from './features/history/history';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'habits', component: HabitList },
  { path: 'add-habit', component: AddHabit },
  { path: 'edit-habit/:id', component: EditHabit },
  { path: 'settings', component: Settings },
  { path: 'categories', component: Categories },
  { path: 'history', component: History },
  { path: 'profile', component: Profile }
];