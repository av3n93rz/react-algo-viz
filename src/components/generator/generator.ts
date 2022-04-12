import { ColumnData } from "../../hooks/useColumns";
import { Colors } from "../colors";

export type StepState = {
    result: ColumnData[];
};
  
export type SortingGenerator = Generator<StepState, StepState>;

export function* bubbleSort(arr: ColumnData[]): SortingGenerator {
  let noswaps = false;
    for (let i = 0; i < arr.length; i++) {
      noswaps = true;
      let col1;
      let col2;
      for (let j = 0; j < arr.length - i - 1; j++) {
        col1 = arr[j];
        col2 = arr[j+1];
        col1.color =  Colors.teal
        col2.color =  Colors.teal
        yield {
          result: arr,
        };
        if (col1.value > col2.value) {
          noswaps = false;
          col1.color =  Colors.orange
          yield {
            result: arr,
          };
          const a_x = arr[j].x
          arr[j].x = arr[j+1].x
          arr[j+1].x = a_x;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          yield {
            result: arr,
          };
          col2.color =  Colors.peach
        } else {
          col2.color =  Colors.orange
          col1.color =  Colors.peach
          yield {
            result: arr,
          };
        }
        yield {
          result: arr,
        };
      }
      let lastIdx = arr.length - 1 - i;
      arr[lastIdx].color =  Colors.red;
      arr.forEach((col) => {
        if(col.color === Colors.orange || col.color === Colors.peach) {
          col.color = Colors.blue
        }
      })
      if(noswaps) {
        while(lastIdx --> 0) {
            arr[lastIdx].color = Colors.red;
            yield {
              result: arr,
            };
        };
        break;
      };
    }
    return { result: arr };
  }