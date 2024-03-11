import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent {
  taskData: any;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private todoService: TodoService,
    private cdr: ChangeDetectorRef
  ) {
    this.taskData = this.navParams.data;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async onDuplicate(data: any) {
    data.key = '';
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      componentProps: {
        data,
      },
      cssClass: 'Createmodal',
    });
    return await modal.present();
  }

  async onEdit(data: any) {
    console.log(data);
    const modal = await this.modalCtrl.create({
      component: CreateTaskComponent,
      componentProps: {
        data,
      },
      cssClass: 'Createmodal',
    });
    this.modalCtrl.dismiss();
    this.cdr.detectChanges();
    return await modal.present();
  }

  onMissed() {
    this.taskData.data.value.TaskStatus = 'InComplete';
    this.todoService.addTodo(this.taskData.data.key, this.taskData.data.value);
    this.modalCtrl.dismiss({ deleted: true });
    this.cdr.detectChanges();
  }

  onComplete() {
    this.taskData.data.value.TaskStatus = 'Complete';
    this.todoService.addTodo(this.taskData.data.key, this.taskData.data.value);
    this.modalCtrl.dismiss({ deleted: true });
    this.cdr.detectChanges();
    console.log(this.taskData.data);
  }

  async presentAlertDelete() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',

      header: 'Confirm!',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

            this.todoService.deleteTask(this.taskData.data.key).then((res) => {
              this.modalCtrl.dismiss({ deleted: true });
            });
          },
        },
      ],
    });
    return await alert.present();
  }
}
