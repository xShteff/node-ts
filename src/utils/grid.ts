import { Pickle } from "./../model/";
export class Grid {
  public static generateGrid(width: number, height: number): Pickle[][] {
    console.log("GENERATING GRID...");
    let data: Pickle[][] = [];
    for (let w: number = 0; w < width; w++) {
      let row: Pickle[] = [];
      for (let h: number = 0; h < height; h++) {
        const pickle: Pickle = {
          colour: {
            red: 255,
            green: 255,
            blue: 255
          }
        } as Pickle;
        row.push(pickle);
      }
      data.push(row);
    }
    return data;
  }
}
