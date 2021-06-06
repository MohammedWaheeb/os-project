import {
  prioritySchedulingInput,
  PrioritySchedulingPrintModel,
  PrioritySchedulingProcess,
  TimeInSeconds,
} from "./models.ts";
import { prioritySchedulingPrettyPrint } from "./util.ts";

export const PriorityScheduling = (procs: prioritySchedulingInput) => {
  //stating time
  let time: TimeInSeconds = 0;

  let queue: PrioritySchedulingProcess[] | undefined = [];

  const statistics: PrioritySchedulingPrintModel = {
    processes: procs.priorityProcesses,
    type: "Priority Scheduling",
    Throughput: 0,
    wholeResponseTime: 0,
    wholeWaitingTime: 0,
    wholeTurnaroundTime: 0,
    count: procs.priorityProcesses.length,
    runningTime: 0,
  };

  const ranProcs: PrioritySchedulingProcess[] = [];
  while (procs.priorityProcesses.length != 0) {
    // get arrived processes
    queue = procs.priorityProcesses.filter((x: PrioritySchedulingProcess) => {
      return x.arrivalTime <= time;
    });

    //get highest priority from arrived processes
    const procToRun: PrioritySchedulingProcess = queue?.sort((a, b) =>
      a.priority - b.priority
    )[0];

    if (!procToRun) {
      //pass time if no procs available
      time++;

      continue;
    }

    //remove to queue (run)
    procs.priorityProcesses = procs.priorityProcesses.filter((x) =>
      x.pid != procToRun.pid
    );
    ranProcs.push(procToRun);

    time += procToRun.burstTime;

    const processTurnaroundTime = time - procToRun.arrivalTime;

    const processWaitingTime = processTurnaroundTime - procToRun.burstTime;

    const processResponseTime = procToRun.arrivalTime + processWaitingTime;

    statistics.wholeTurnaroundTime += processTurnaroundTime;
    statistics.wholeWaitingTime += processWaitingTime;
    statistics.wholeResponseTime += processResponseTime;

    if (procs.priorityProcesses.length == 0) {
      break;
    }
  }
  statistics.processes = ranProcs;
  statistics.runningTime = time;
  prioritySchedulingPrettyPrint(statistics);
};
