import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent  {

  constructor(private modalCtrl : ModalController,
    private toastCtrl: ToastController,
     private todoService: TodoService ) { }




  priority=['High','Medium','Low'];
  currentDate: string ='';
  selectedColour: string = '';
  selectedIcon : string = '';

  todoForm= new FormGroup({
    Title: new FormControl(''),
    Description: new FormControl(''),
    Priority: new FormControl(''),
    datetime: new FormControl(new Date().toISOString()),
    startTime: new FormControl(new Date().toISOString()),
    endTime: new FormControl(new Date().toISOString()),
    Colour: new FormControl(''),
    Icon: new FormControl(''),
  })
  dismissModal()
  {
    this.modalCtrl.dismiss();
  }

  async presentToast(msg: string)
  {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      buttons: [{
        side:'end',
        icon:'checkmark-circle-outline',
        role:'cancel'
      }
      ]
    });
    toast.present();
  }
  onSubmit()
  {
this.currentDate = (new Date()).toISOString();
let uid = this.currentDate + this.todoForm.value.Title;
this.todoForm.value.Colour = this.selectedColour;
this.todoForm.value.Icon = this.selectedIcon;
this.todoService.addTodo(uid, this.todoForm.value).then(data => {
  console.log(data);

  this.presentToast("Toast Added Succesfully!");
   
  this.modalCtrl.dismiss();
});

  }

  onColourSelection(colour: string) {

    this.selectedColour= colour;
  }
  onIconSelected(icon: string) {

    this.selectedIcon = icon;
  }
}
