/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
declare module 'datasource-sql' {
  export type DataConfig = any;
  export class SQLDataSource {
    public db: any;
    public constructor(params: DataConfig);
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
