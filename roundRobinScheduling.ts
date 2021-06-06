import {
  RoundRobinSchedulingInput,
  RoundRobinSchedulingProcess,
  RunningProcessLogModel,
  TimeInSeconds,
} from "./models.ts";
import { RoundRobinPrettyPrint } from "./util.ts";

export const RoundRobinScheduling = (input: RoundRobinSchedulingInput) => {
  let time: TimeInSeconds = 0;
  let queue = input.roundRobinProcesses;

  const runningProcessLogModel: RunningProcessLogModel[] = [];
  while (true) {
    queue = input.roundRobinProcesses.filter((z) => z.timeRemaining != 0)
      .filter((i) => i.arrivalTime <= time + input.tQuantum);

    if (queue.length == 0) {
      console.log("break");

      break;
    }

    queue.forEach((proc: RoundRobinSchedulingProcess) => {
      const arrivalTime = time;

      let timeToRun = input.tQuantum;
      if (proc.timeRemaining - input.tQuantum < 0) {
        timeToRun = proc.timeRemaining;
      }

      let originalProc = input.roundRobinProcesses!.find((x) =>
        x.pid == proc.pid
      );

      runningProcessLogModel.push({
        pid: proc.pid,
        serviceTime: arrivalTime,
        arrivalTime: proc.serviceTime ?? proc.arrivalTime,
        originalArrivingTime: proc.arrivalTime,
      });
      time += timeToRun;

      originalProc!.timeRemaining = proc.timeRemaining - timeToRun;
      originalProc!.serviceTime = arrivalTime + input.tQuantum;
      originalProc?.timeRemaining == 0
        ? originalProc.timeOfCompletion = time
        : null;
    });
  }
  RoundRobinPrettyPrint(
    {
      logs: runningProcessLogModel,
      processes: input.roundRobinProcesses,
      time: time,
    },
  );
};
