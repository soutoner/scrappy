import { Config, ProcessVariables } from '../config';

export function localConfig(
  processVariables: Partial<ProcessVariables>,
): Config {
  return {
    logLevel: processVariables.LOG_LEVEL ?? 'DEBUG',
    isCronEnabled: false,
  };
}
