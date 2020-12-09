import BaseUF from "./index";

export default class QuickFindUF implements BaseUF {
  ids: number[];

  constructor(private connectionsCount: number) {
    this.ids = [];

    for (let i = 0; i < connectionsCount; i++) {
      this.ids[i] = i;
    }
  }

  union(a: number, b: number): void {
    this.validate(a);
    this.validate(b);

    const prevVal = this.ids[a];
    const newVal = this.ids[b];

    if (prevVal === newVal) return;

    for (let i = 0; i < this.ids.length; i++) {
      if (this.ids[i] == prevVal) this.ids[i] = newVal;
    }

    this.connectionsCount--;
  }

  connected(a: number, b: number): boolean {
    this.validate(a);
    this.validate(b);

    return this.ids[a] === this.ids[b];
  }

  validate(a: number) {
    const isValid = a >= 0 && a < this.ids.length;

    if (!isValid) {
      throw new Error("Invalid argument provided");
    }
  }

  count(): number {
    return this.connectionsCount;
  }

  find(a: number): number {
    this.validate(a);

    return this.ids[a];
  }
}
