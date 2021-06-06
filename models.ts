export interface PrioritySchedulingProcess {
  pid: number;
  priority: number;
  arrivalTime: TimeInSeconds;
  burstTime: TimeInSeconds;
}

export interface RoundRobinSchedulingProcess {
  pid: number;
  arrivalTime: TimeInSeconds;
  burstTime: TimeInSeconds;
  timeRemaining: TimeInSeconds;
  serviceTime?: undefined | number | null;
  timeOfCompletion?: TimeInSeconds;
  waitingTime: TimeInSeconds;
}

export interface RoundRobinSchedulingInput {
  roundRobinProcesses: RoundRobinSchedulingProcess[];
  tQuantum: TimeInSeconds;
  numberOfProcesses: number;
}
export interface prioritySchedulingInput {
  priorityProcesses: PrioritySchedulingProcess[];
  numberOfProcesses: number;
}

export interface PrioritySchedulingPrintModel {
  processes: PrioritySchedulingProcess[];
  type: string;
  wholeWaitingTime: TimeInSeconds;
  wholeResponseTime: TimeInSeconds;
  wholeTurnaroundTime: TimeInSeconds;
  Throughput: TimeInSeconds;
  count: number;
  runningTime: TimeInSeconds;
}
export interface RoundRobinSchedulingPrintModel {
  processes: RoundRobinSchedulingProcess[];
  logs: RunningProcessLogModel[];
  time: TimeInSeconds;
}
export type RunningProcessLogModel = {
  pid: number;
  serviceTime: number;
  arrivalTime: number;
  originalArrivingTime: number | undefined;
};
export type RunLogString = string;
export type TimeInSeconds = number;
