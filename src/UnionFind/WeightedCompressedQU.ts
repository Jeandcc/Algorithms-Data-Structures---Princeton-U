import BaseUF from "./index";

export default class WeightedQuickUnioUF implements BaseUF {
  ids: number[];
  treeSizes: number[];

  constructor(private connectionsCount: number) {
    this.ids = [];
    this.treeSizes = [];
    this.treeSizes.fill(1, 0, connectionsCount);

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

    if (this.treeSizes[rootA] < this.treeSizes[rootB]) {
      this.ids[rootA] = rootB;
      this.treeSizes[rootB] += this.treeSizes[rootA];
    } else {
      this.ids[rootB] = this.ids[rootA];
      this.treeSizes[rootA] += this.treeSizes[rootB];
    }

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

  find(memberToBeChecked: number): number {
    this.validate(memberToBeChecked);

    // Looks for the root of the member on the tree
    let root = memberToBeChecked;
    while (root != this.ids[root]) {
      root = this.ids[root];
    }

    // Points all ancestors to the root directly
    let treeMember = memberToBeChecked;
    while (treeMember != root) {
      let newParent = this.ids[treeMember];
      this.ids[memberToBeChecked] = root;
      treeMember = newParent;
    }

    return treeMember;
  }
}
