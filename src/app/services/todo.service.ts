import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private storage: Storage) {
    this.init(); // Call init method during service instantiation
  }

  async init() {
    await this.storage.create(); // Initialize storage
  }

  addTodo(key: any, value: any) {
    return this.storage.set(key, value);
  }

  getAllTodo() {
    let tasks: any =[];
    var promise = new Promise((resolve, reject)=> {
      this.storage.forEach((value, key,index) => {
        tasks.push({'key':key,'value':value});
      }).then((d) => {
        resolve(tasks);
      });
    });

    return promise;
  }

  getTaskById(key: string) {
    return this.storage.get(key);
  }

  async deleteTask(key: string) {
    return await this.storage.remove(key);
  }
}
