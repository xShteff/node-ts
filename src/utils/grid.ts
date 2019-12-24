import { Colour, Pickle } from './../model/';
export class Grid {

	public static generateColour(red:number, green:number, blue:number): Colour {
		return {
			blue: blue,
			red: red,
			green: green,
			cssString: `rgb(${red}, ${green}, ${blue})`
		} as Colour
	}

  public static generateGrid(width: number, height: number): Pickle[][] {
		console.log("GENERATING GRID...");
    let data: Pickle[][] = [];
    for (let w: number = 0; w < width; w++) {
      let row: Pickle[] = []; 
      for (let h: number = 0; h < height; h++) {
        const pickle: Pickle = {
          colour: this.generateColour(255, 255, 255)
        } as Pickle;
        row.push(pickle);
			}
			data.push(row);
    }
    // console.log(data);
    return data;
  }
}
