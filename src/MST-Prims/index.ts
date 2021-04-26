class MST {
  public static run(graph: number[][]) {
    const mst = this.findMST(graph);
    this.printMST(mst, graph);
  }

  private static findMST(graph: number[][]) {
    let bestOriginToVertices = new Array(graph.length);
    let weightsToGoToVertex = new Array(graph.length).fill(Infinity);
    let includedVertices = new Array(graph.length).fill(false);

    weightsToGoToVertex[0] = 0;
    bestOriginToVertices[0] = -1;

    for (let i = 0; i < graph.length - 1; i++) {
      const cheapestVertex = this.findCheapestVertex(
        weightsToGoToVertex,
        includedVertices
      );

      includedVertices[cheapestVertex] = true;

      for (let j = 0; j < graph.length; j++) {
        const isConnection = graph[cheapestVertex][j] != 0;
        const alreadyIncludedInMst = includedVertices[j];
        const cheaperThanPreviousConnection =
          graph[cheapestVertex][j] < weightsToGoToVertex[j];

        if (
          isConnection &&
          !alreadyIncludedInMst &&
          cheaperThanPreviousConnection
        ) {
          bestOriginToVertices[j] = cheapestVertex;
          weightsToGoToVertex[j] = graph[cheapestVertex][j];
        }
      }
    }

    return bestOriginToVertices;
  }

  private static findCheapestVertex(
    weightsToGoToVertices: number[],
    includedVertices: boolean[]
  ): number {
    let cheapestMove = Infinity;
    let indexOfCheapestNode = -1;

    for (let v = 0; v < weightsToGoToVertices.length; v++) {
      const alreadyIncludedInMST = includedVertices[v];
      const cheaper = weightsToGoToVertices[v] < cheapestMove;

      if (!alreadyIncludedInMST && cheaper) {
        cheapestMove = weightsToGoToVertices[v];
        indexOfCheapestNode = v;
      }
    }

    return indexOfCheapestNode;
  }

  private static printMST(originVertices: number[], graph: number[][]) {
    console.log("Edge \tWeight");

    for (let i = 1; i < graph.length; i++) {
      console.log(
        originVertices[i] + " - " + i + "\t" + graph[i][originVertices[i]]
      );
    }
  }
}

MST.run([
  [0, 1306, 0, 0, 2161, 2661, 0, 0, 0, 0, 0, 0],
  [1306, 0, 629, 919, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 629, 0, 435, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 919, 435, 0, 1225, 0, 1983, 0, 0, 0, 0, 0],
  [2161, 0, 0, 1225, 0, 1483, 1258, 0, 0, 0, 0, 0],
  [2661, 0, 0, 0, 1483, 0, 1532, 661, 0, 0, 0, 0],
  [0, 0, 0, 1983, 1258, 1532, 0, 0, 2113, 2161, 0, 0],
  [0, 0, 0, 0, 0, 661, 0, 0, 1145, 0, 0, 1613],
  [0, 0, 0, 0, 0, 0, 2113, 1145, 0, 1709, 383, 725],
  [0, 0, 0, 0, 0, 0, 2161, 0, 1709, 0, 2145, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 383, 2145, 0, 338],
  [0, 0, 0, 0, 0, 0, 0, 1613, 725, 0, 338, 0],
]);

/**
 * [seattle,SF,LA,Las Vegas, Denver, Minneapolis, Dallas, Chicago, DC,
 * Miami, NY , Boston]
 * [0,1306,0,0,2161,2661,0,0,0,0,0,0] Seattle
 * [1306,0,629,919,0,0,0,0,0,0,0,0] SF
 * [0,629,0,435,0,0,0,0,0,0,0,0] LA
 * [0,919,435,0,1225,0,1983,0,0,0,0,0] Las Vegas
 * [2161,0,0,1225,0,1483,1258,0,0,0,0,0] Denver
 * [2661,0,0,0,1483,0,1532,661,0,0,0,0] Minneapolis
 * [0,0,0,1983,1258,1532,0,0,2113,2161,0,0] Dallas
 * [0,0,0,0,0,661,0,0,1145,0,0,1613] Chicago
 * [0,0,0,0,0,0,2113,1145,0,1709,383,725] DC
 * [0,0,0,0,0,0,2161,1709,0,2145,0] Miami
 * [0,0,0,0,0,0,0,0,383,2145,0,338] York
 * [0,0,0,0,0,0,0,1613,725,0,338,0] Boston
 *
 * */
