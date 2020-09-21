import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskDto } from './task.interface';

const API_TASK = '/assets/app-task/mocks/task.json';
const STACKBLITZ = true;

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private taskListData = (STACKBLITZ ? this.createTaskList() : null);

  constructor(
    private http: HttpClient
  ) {
  }

  public getData(data: { ids: number[] }): Observable<TaskDto[]> {
    return (STACKBLITZ
      ? of(this.taskListData)
      : this.http.get<TaskDto[]>(API_TASK))
      .pipe(
        map((response: TaskDto[]) =>
          (data.ids.length === 0 ? response : response.filter(item => data.ids.includes(item.id)))
        )
      );
  }

  public createTaskList(): TaskDto[] {
    const result: TaskDto[] = [];
    result.push(this.createTask(1, 'PepsiCo'));
    result.push(this.createTask(2, 'Humana'));
    result.push(this.createTask(3, 'AbbVie Inc'));
    result.push(this.createTask(4, 'Archer Daniels'));
    result.push(this.createTask(5, 'Albertsons'));
    result.push(this.createTask(6, 'Lockheed'));
    result.push(this.createTask(7, 'Energy Transfer'));
    result.push(this.createTask(8, 'Goldman Sachs'));
    result.push(this.createTask(9, 'Caterpillar'));
    result.push(this.createTask(10, 'Pfizer'));

    result.push(this.createTask(11, 'Healthcare'));
    result.push(this.createTask(12, 'American Express'));
    result.push(this.createTask(13, 'Delta Air Lines'));
    result.push(this.createTask(14, 'Merck & Co'));
    result.push(this.createTask(15, 'Allstate'));
    result.push(this.createTask(16, 'New York Life'));
    result.push(this.createTask(17, 'Bestbuy	Retail'));
    result.push(this.createTask(18, 'United Airlines'));
    result.push(this.createTask(19, 'Liberty Mutual'));
    result.push(this.createTask(20, 'Chemical Company'));

    result.push(this.createTask(21, 'Tyson Foods'));
    result.push(this.createTask(22, 'General Dynamics'));
    result.push(this.createTask(23, 'John Deere'));
    result.push(this.createTask(24, 'Publix'));
    result.push(this.createTask(25, 'Tech Data'));
    result.push(this.createTask(26, 'World Fuel'));
    result.push(this.createTask(27, 'Honeywell'));
    result.push(this.createTask(28, 'Exelon'));
    result.push(this.createTask(29, 'Capital One'));
    result.push(this.createTask(30, 'Plains GP'));
    return result;
  }

  // ** Private API **

  private multiplicityByTwo(id: number, value1: string, value2: string): string {
    return (id % 2 === 0 ? value1 : value2);
  }

  private multiplicityByThree(id: number, value1: string, value2: string, value3: string): string {
    return (id % 3 === 0 ? value1 : this.multiplicityByTwo(id, value2, value3));
  }

  private createTask(id: number, name: string): TaskDto {
    const id2 = id + 1;
    const msg1 = 'Clarify the contract for the company';
    const msg2 = 'Offer a contract for the company';
    const msg3 = 'Extend the contract for the company';
    const k = id % 4;
    const n = id % 10;
    const d2 = new Date('2020.' + (6 + (id % 2 === 0 ? -k : k)) + '.' + (15 + (id % 2 === 0 ? -n : n)));
    return {
      id,
      subject: this.multiplicityByThree(id2, 'Clarify the contract', 'Offer a contract', 'Extend the contract') + ' "' + name + '"',
      description: this.multiplicityByThree(id2, msg1, msg2, msg3) + ' "' + name + '"',
      message: this.multiplicityByTwo(id2, '', 'Message for "' + name + '".'),
      status: this.multiplicityByTwo(id2, 'not active', 'active'),
      startDate: d2.toISOString(),
      endDate: '',
      warning: this.multiplicityByThree(id2, '', 'Warning for "' + name + '" !', ''),
      error: this.multiplicityByThree(id2, 'Warning for "' + name + '" !!!', '', '')
    };
  }
}
