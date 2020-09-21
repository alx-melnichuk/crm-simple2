import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientDto } from './client.interface';

const API_CLIENT = '/assets/app-client/mocks/client.json';
const STACKBLITZ = true;

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  private clientListData = (STACKBLITZ ? this.createClientList() : null);

  constructor(
    private http: HttpClient
  ) {
  }

  public getData(data: { ids: number[] }): Observable<ClientDto[]> {
    return (STACKBLITZ
      ? of(this.clientListData)
      : this.http.get<ClientDto[]>(API_CLIENT))
      .pipe(
        map((response: ClientDto[]) =>
          (data.ids.length === 0 ? response : response.filter(item => data.ids.includes(item.id)))
        )
      );
  }

  public createClientList(): ClientDto[] {
    const result: ClientDto[] = [];
    result.push(this.createClient(1, 'Petrenko', 'Igor', 'Mikhailovich'));
    result.push(this.createClient(2, 'Pushkin', 'Sergey', 'Petrovich'));
    result.push(this.createClient(3, 'Gasanov', 'Ibrahim', 'Sultanovich'));
    result.push(this.createClient(4, 'Ivanov', 'Petr', 'Vasilievich'));
    result.push(this.createClient(5, 'Ahmadulin', 'Pavel', 'Konstantinovich'));
    result.push(this.createClient(6, 'Kosatin', 'Luka', 'Ivanovic'));
    result.push(this.createClient(7, 'Vayzev', 'Stanislav', 'Vladimirovich'));
    result.push(this.createClient(8, 'Freeman', 'Martin', ''));
    result.push(this.createClient(9, 'Lundin', 'Arno', ''));
    result.push(this.createClient(10, 'Suhorucov', 'Semyon', 'Ignatievich'));
    result.push(this.createClient(11, 'Asputin', 'Artur', 'Vitalievich'));
    result.push(this.createClient(12, 'Lourens', 'Nikus', ''));
    result.push(this.createClient(13, 'Rudolph', 'Valentino', ''));
    result.push(this.createClient(14, 'Krajevec', 'Donji', ''));
    result.push(this.createClient(15, 'Westbrook', 'Jimi', ''));
    result.push(this.createClient(16, 'Fitzgerald', 'Larry', ''));
    result.push(this.createClient(17, 'Hendrix', 'Jimi', ''));
    return result;
  }

  // ** Private API **

  private multiplicityByTwo(id: number, value1: string, value2: string): string {
    return (id % 2 === 0 ? value1 : value2);
  }

  private multiplicityByThree(id: number, value1: string, value2: string, value3: string): string {
    return (id % 3 === 0 ? value1 : this.multiplicityByTwo(id, value2, value3));
  }

  private createClient(id: number, surname: string, name: string, patronymic: string): ClientDto {
    const id2 = id + 1;
    return {
      id,
      surname,
      name,
      patronymic,
      email: surname + '@gmail.com',
      phone: '(' + this.multiplicityByThree(id, '050', '098', '062') + ')'
        + ((this.multiplicityByThree(id, '113', '409', '320')) + id * 3) + '-'
        + (this.multiplicityByThree(id, '12', '19', '32') + (id + 2) * 3) + '-'
        + (15 + id * 3)
      ,
      source: (id % 3 === 0 ? 'acquaintances' : 'internet'),
      city: (id % 3 === 0 ? 'New Jersey' : (id % 2 === 0 ? 'Georgia' : 'Oregon')),
      webSite: (id2 % 3 === 0 ? 'New Jersey' : (id2 % 2 === 0 ? 'Georgia' : 'Oregon')),
      hasContract: (id % 3 === 0 ? true : false),
      description: 'Description by ' + surname + ' ' + name + '.',
      message: '',
      interest: '',
      preference: '',
      howFound: (id % 3 === 0 ? '' : 'web site'),
      isRealClient: (id % 3 === 0 ? true : false),
      payment: (id2 % 3 === 0 ? 'cash' : (id2 % 2 === 0 ? 'notcash' : 'cash/notcash')),
    };
  }
}
