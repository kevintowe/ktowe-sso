import { Module } from '@nestjs/common';

import * as azdev from 'azure-devops-node-api';
import { CONTROLLERS } from './controllers';

const orgUrl = 'https://dev.azure.com/vizientinc';

const token: string | undefined = process.env['AZURE_PERSONAL_ACCESS_TOKEN'];
if (token === undefined) {
  console.log(
    'You must provide an AZURE_PERSONAL_ACCESS_TOKEN in the environment'
  );
  process.exit(1);
}

const authHandler = azdev.getPersonalAccessTokenHandler(token);
const connection = new azdev.WebApi(orgUrl, authHandler);

@Module({
  imports: [],
  controllers: [...CONTROLLERS],
  providers: [
    {
      provide: 'ADO_CORE_API',
      useFactory: async () => await connection.getCoreApi(),
    },
    {
      provide: 'ADO_GIT_API',
      useFactory: async () => await connection.getGitApi(),
    },
  ],
})
export class AppModule {}
