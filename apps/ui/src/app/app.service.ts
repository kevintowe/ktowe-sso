import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { TeamProjectReference } from 'azure-devops-node-api/interfaces/CoreInterfaces';

@Injectable({ providedIn: 'root' })
export class AppService {
  projects = new BehaviorSubject<null | TeamProjectReference[]>(null);

  constructor(private readonly httpClient: HttpClient, private readonly serverUrl = 'http://localhost:3000/api') {

  }

//   private readonly builGetReq = () => {return this.httpClient.get({url: this.serverUrl, method: 'GET', })

  getProjects() {
    return this.httpClient.get(this.serverUrl + `/ado/projects`)
  }
}
