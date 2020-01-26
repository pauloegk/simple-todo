import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ItemService } from './item.service';
import { Item } from './models/item';

const msgUpdate = 'Item atualizado';
const msgDelete = 'Item removido';
const msgCreate = 'Item adicionado';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading: boolean;
  items: Item[] = [];
  updating: boolean;
  itemName = '';
  itemToEdit: Item;

  constructor(
    private itemService: ItemService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.itemService.findAll().subscribe(items => {
      this.items = items;
    });
  }

  submitItem() {
    if (!this.itemName) { return; }
    if (this.updating) {
      this.update();
    } else {
      this.create();
    }
  }

  edit(item: Item) {
    this.updating = true;
    this.itemName = item.name;
    this.itemToEdit = item;
  }

  delete(id: number) {
    this.itemService.delete(id).subscribe(res => {
      if (res.status === 204) {
        this.items = this.items.filter(i => i.id !== id);
        this.notify(msgDelete);
      }
    });
  }

  doneItem(item: Item): void {
    this.itemService.update(item).subscribe(resp => {
      this.notify(msgUpdate);
    });
  }

  private create(): void {
    const item = new Item(this.itemName);
    this.itemService.create(item).subscribe(i => {
      this.items.push(i);
      this.items = [...this.items];
      this.resetFields();
      this.notify(msgCreate);
    });
  }

  private update(): void {
    const item = this.items.find(t => t.id === this.itemToEdit.id);
    item.name = this.itemName;
    this.itemService.update(item).subscribe(resp => {
      this.resetFields();
      this.notify(msgUpdate);
    });
  }

  private resetFields(): void {
    this.itemToEdit = null;
    this.updating = false;
    this.itemName = '';
  }

  private notify(msg: string) {
    this.notification.success(msg, null);
  }


}
