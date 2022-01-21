export type PeripheralStatus = "online" | "offline";
export enum PeripheralStatusEnum {
  online = "online",
  offline = "offline",
}

export interface PeripheralModel {
  _id: string;
  uid: number;
  vendor: string;
  status: PeripheralStatus; // online/offline.
  gateway: string;
}
