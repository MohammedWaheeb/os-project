import { PrioritySchedulingProcess } from "./models.ts";
import { PriorityScheduling } from "./priorityScheduling.ts";
import {
  HandlePrioritySchedulingInput,
  HandleRoundRobinSchedulingInput,
  TestPriorityScheduling,
  TestRoundRobinScheduling,
} from "./util.ts";

console.log("\tOperating system project \n \tBy  Mohammed waheeb, Nada\n \n");
const type = prompt(
  `Chose A Scheduling Algorithm \n\t
   1-Priority Scheduling (1). \n
   2-Round Robin Scheduling (2).\n
   3-Priority scheduling with preset test data (3). \n
   4-Round robin scheduling with preset test data (4).\n
   
`,
);

switch (type) {
  case "1":
    HandlePrioritySchedulingInput();
    break;
  case "2":
    HandleRoundRobinSchedulingInput();
    break;

  case "3":
    TestPriorityScheduling();
    break;
  case "4":
    TestRoundRobinScheduling();
    break;

  default:
    break;
}
