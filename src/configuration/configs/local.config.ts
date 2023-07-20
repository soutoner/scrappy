import { Config, ProcessVariables } from '../config';

export function localConfig(
  processVariables: ProcessVariables,
): Omit<Config, 'environment'> {
  return {
    logLevel: processVariables.LOG_LEVEL ?? 'DEBUG',
    isCronEnabled: false,
  };
}
