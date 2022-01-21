export type PeripheralStatus = "online" | "offline";
export enum PeripheralStatusEnum {
  online = "online",
  reject = "offline",
}

export interface PeripheralModel {
  _id: string;
  uid: number;
  vendor: string;
  status: PeripheralStatus; // online/offline.
  gateway: string;
}
