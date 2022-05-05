export abstract class ConfigurationIRepository {
  abstract setValues(name: string, value: string): Promise<void>;
  abstract getValues(name: string): Promise<string>;
}
