import { Config, ProcessVariables } from '../config';
import { localConfig } from '../configs/local.config';

export function productionConfig(
  processVariables: ProcessVariables,
): Omit<Config, 'environment'> {
  return {
    ...localConfig(processVariables),
    logLevel: processVariables.LOG_LEVEL ?? 'INFO',
    isCronEnabled: true,
    crontab: '*/5 * * * * *',
  };
}
