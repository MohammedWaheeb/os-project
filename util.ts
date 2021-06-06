import {
  prioritySchedulingInput,
  PrioritySchedulingPrintModel,
  PrioritySchedulingProcess,
  RoundRobinSchedulingInput,
  RoundRobinSchedulingPrintModel,
  RoundRobinSchedulingProcess,
  RunLogString,
  TimeInSeconds,
} from "./models.ts";
import { PriorityScheduling } from "./priorityScheduling.ts";
import { RoundRobinScheduling } from "./roundRobinScheduling.ts";

export const RoundRobinPrettyPrint = (
  props: RoundRobinSchedulingPrintModel,
) => {

  let waiting: number = 0;
  props.logs.forEach((x) => {
    props.processes!.find((y) => x.pid == y.pid)!.waitingTime += x.serviceTime -
      x.arrivalTime;
    waiting += x.serviceTime - x.arrivalTime;
  });

  let turnaround = 0;
  props.processes.forEach((x) => turnaround += x!.burstTime! + x.waitingTime);
  let gannt = "";
  props.logs.forEach((x) => {
    gannt += `[${x.pid}] `;
  });

  console.log("Average waiting time= ", waiting / props.processes.length);

  console.log(
    "Average turnaround time= ",
    turnaround / props.processes.length,
  );
  let firstTimes = 0;
  props.processes.forEach((i) => {
    firstTimes += props.processes!.find((x) => x.pid == i.pid)?.serviceTime!;
  });
  console.log("Average Response Time= ", firstTimes / props.processes.length);

  console.log("Throughput= ", props.time / props.processes.length);
  console.log(gannt);
};

export const prioritySchedulingPrettyPrint = (
  props: PrioritySchedulingPrintModel,
) => {
  let runLog: RunLogString = "";
  // console.log({
  //     "PID": procToRun.pid,
  //     "ta": processTurnaroundTime,
  //     "wait": processWaitingTime,
  //     "rsp": processResponseTime,
  //     "time": time,
  //   });

  console.log("Average waiting time= ", props.wholeWaitingTime / props.count);

  console.log(
    "Average turnaround time= ",
    props.wholeTurnaroundTime / props.count,
  );
  console.log("Average Response Time= ", props.wholeResponseTime / props.count);

  console.log("Throughput= ", props.runningTime / props.count);

  props.processes.map((i: PrioritySchedulingProcess) => {
    runLog += `[P${i.pid}] `;
  });
  console.log("\n", runLog, "\n");
  runLog = "";
  props.processes.map((i: PrioritySchedulingProcess) => {
    for (let index = 0; index < i.burstTime; index++) {
      runLog += `[P${i.pid}]`;
    }
    runLog += " => ";
  });
  console.log(runLog);
};

export const HandleRoundRobinSchedulingInput = () => {
  const userInput: RoundRobinSchedulingInput = {
    roundRobinProcesses: [],
    tQuantum: 0,
    numberOfProcesses: 0,
  };

  userInput.numberOfProcesses = Number(prompt("Enter a number of processes\n"));
  userInput.tQuantum = Number(prompt("Enter the time quantum\n"));

  for (let index = 0; index < userInput.numberOfProcesses; index++) {
    const input = prompt(`
        Enter Processes ${index +
      1} Arrival time and Burst time, Comma separated \n 
        Example : 1, 0.7 \n 
            Arrival time: 1 \n
            Burst time: 0.7 \n
        `);
    if (!input) {
      continue;
    }

    const inputData: number[] = input?.split(",").map((i: string) => {
      return Number(i);
    });
    if (inputData.length != 2) {
      console.log(`Bad input => ${input}`);
      continue;
    }

    userInput.roundRobinProcesses?.push({
      pid: index + 1,
      arrivalTime: inputData[0],
      burstTime: inputData[1],
      timeRemaining: inputData[1],
      waitingTime: 0,
    });
  }
  RoundRobinScheduling(userInput);
};

export const HandlePrioritySchedulingInput = () => {
  const userInput: prioritySchedulingInput = {
    priorityProcesses: [],
    numberOfProcesses: 0,
  };

  userInput.numberOfProcesses = Number(prompt("Enter a number of processes\n"));
  for (let index = 0; index < userInput.numberOfProcesses; index++) {
    const input = prompt(`
        Enter Processes ${index +
      1} Priority, Arrival time and Burst time, Comma separated \n 
        Example : 3, 1, 0.7 \n 
            Priority: 3 \n
            Arrival time: 1 \n
            Burst time: 0.7 \n
        `);
    if (!input) {
      continue;
    }

    const inputData: number[] = input?.split(",").map((i: string) => {
      return Number(i);
    });
    if (inputData.length != 3) {
      console.log(`Bad input => ${input}`);
      continue;
    }

    userInput.priorityProcesses?.push({
      pid: index + 1,
      priority: inputData[0],
      arrivalTime: inputData[1],
      burstTime: inputData[2],
    });
  }
  PriorityScheduling(userInput);
};

export const TestPriorityScheduling = () => {
  // //bool example
  // const input: string[] = [
  //     "3,0,10",
  //     "1,0,1",
  //     "4,0,2",
  //     "5,0,1",
  //     "2,0,5",
  // ];

  const input: string[] = [
    "2,0 ,3",
    "6,2,5",
    "3,1,4",
    "5,4,2",
    "7,6,9",
    "4,5,4",
    "10,7,10",
  ];

  //const input:string[]=["2,0 ,3","6,2,5","3,1,4","5,4,2","7,6,9","4,5,4","10,7,10"]
  const inputProcesses: PrioritySchedulingProcess[] = input.map((x, i) => {
    const inputData = x.split(",");
    return {
      pid: i + 1,
      priority: Number(inputData[0]),
      arrivalTime: Number(inputData[1]),
      burstTime: Number(inputData[2]),
    };
  });
  PriorityScheduling({
    priorityProcesses: inputProcesses,
    numberOfProcesses: inputProcesses.length,
  });
};

export const TestRoundRobinScheduling = () => {
  // const input: string[] = [
  //   "0 ,24",
  //   "0,3",
  //   "0,3",
  // ];
  const input: string[] = [
    "0 ,5",
    "1,3",
    "2,8",
    "3,6",
  ];

  const inputProcesses: RoundRobinSchedulingProcess[] = input.map((x, i) => {
    const inputData = x.split(",");

    return {
      pid: i + 1,
      arrivalTime: Number(inputData[0]),
      burstTime: Number(inputData[1]),
      timeRemaining: Number(inputData[1]),
      waitingTime: 0,
    };
  });
  const timeQuantum: TimeInSeconds = 3;
  RoundRobinScheduling({
    tQuantum: timeQuantum,
    numberOfProcesses: inputProcesses.length,
    roundRobinProcesses: inputProcesses,
  });
};
