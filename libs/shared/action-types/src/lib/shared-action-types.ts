export const IPC_MESSAGE = 'MessageBus::Message';
export type IpcMessageBody<T = unknown> = {
  type: string;
  payload: T
} 

export const LOAD_RIIVOLUTION_MOD = 'RiivolutionMod::Load' as const;
export type LoadRiivolutionModPayload = {
  filePath: string;
};

export const LOAD_RIIVOLUTION_MOD_PROGRESS = 'RiivolutionMod::Progress'
export type LoadRiivolutionModProgressPayload = {
  progress: number;
}

export const LOAD_RIIVOLUTION_MOD_ERROR = 'RiivolutionMod::ERROR'
export type LoadRiivolutionModErrorPayload = {
  error: Error;
}