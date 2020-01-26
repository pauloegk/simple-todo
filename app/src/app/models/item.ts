export class Item {
  id: number;
  name: string;
  done: boolean;
  constructor(name: string, done = false) {
    this.name = name;
    this.done = done;
  }
}
