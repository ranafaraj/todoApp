import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { CreateTaskComponent } from '../components/create-task/create-task.component';
import { TaskViewComponent } from '../components/task-view/task-view.component';
import { TodoService } from '../services/todo.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList: any;
  currentDate: string;
  currentDay: string;
  constructor(
    private modalCtrl: ModalController,
    private todoService: TodoService,
    private loadingCtrl: LoadingController,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
  ) {
    this.loadData();
    this.getCurrentDate();

  }

  loadData() {

    this.presentingLoading().then(() => {

      this.todoService.getAllTodo().then((val) => {
        this.todoList = val;
        this.cdr.detectChanges();
        this.loadingCtrl.dismiss();


      });
    });
  }

  async presentModal(data :any){
    const modal = await this.modalCtrl.create({
      component:TaskViewComponent,
      showBackdrop:true,
      backdropDismiss:true,
      animated: true,
      initialBreakpoint: 0.45,
      keyboardClose:true,
      componentProps:{
        data
      },
      cssClass: "taskViewModal"
    });
    modal.onDidDismiss().then(() => {
      this.loadData();
      this.cdr.detectChanges();
    });

    return await modal.present();
  }

  async presentingLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();
  }
  calculateTimeDifference(startDateTime: string, endDateTime: string): string {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'invalid date format';
    }

    const diffTime = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diffTime / 1000 / 60 / 60);
    const mins = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h`;
    } else if (mins > 0) {
      return `${mins}m`;
    } else {
      return '0 m';
    }
  }

  convertDateTimeToTime(dateTimeValue: any): string {
    if (dateTimeValue !== null) {
      return this.datePipe.transform(dateTimeValue, 'hh.mm') || '';
    }
    return '';
  }

  getCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    this.currentDate = today.toLocaleDateString('en-US');
    this.currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
  }
  async addTodo() {
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      cssClass: 'addToDo',
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
    });
    return await modal.present();
  }
}
