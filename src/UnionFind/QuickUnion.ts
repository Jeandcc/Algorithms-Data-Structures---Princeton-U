import BaseUF from "./index";

export default class QuickUnionUF implements BaseUF {
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

    const rootA = this.find(a);
    const rootB = this.find(b);

    if (rootA === rootB) return;

    this.ids[rootA] = rootB;

    this.connectionsCount--;
  }

  connected(a: number, b: number): boolean {
    this.validate(a);
    this.validate(b);

    const aRoot = this.find(a);
    const bRoot = this.find(b);

    return aRoot == bRoot;
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

    if (this.ids[a] === a) return a;
    else return this.find(this.ids[a]);
  }
}
