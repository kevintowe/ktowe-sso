import { Controller, Get, Inject, Param } from '@nestjs/common';

import { CoreApi } from 'azure-devops-node-api/CoreApi';
import { GitApi } from 'azure-devops-node-api/GitApi';

// Sorts by the name property, if name is undefined push it to the front
function sortObjectsByOptionalNameProperty<T extends { name?: string }>(
  objects: T[]
): T[] {
  const undefinedNames: T[] = [];
  const definedNames: T[] = [];

  for (const obj of objects) {
    if (obj.name === undefined) {
      undefinedNames.push(obj);
    } else {
      definedNames.push(obj);
    }
  }

  definedNames.sort((a, b) => a.name!.localeCompare(b.name!));

  Array.prototype.push.apply(undefinedNames, definedNames);
  return undefinedNames;
}

// am going to optomize on perfromance

@Controller('ado')
export class AdoController {
  constructor(
    @Inject('ADO_CORE_API') private readonly adoCore: CoreApi,
    @Inject('ADO_GIT_API') private readonly gitApi: GitApi
  ) {}

  // Projects
  @Get('projects')
  async projects() {
    const projects = await this.adoCore.getProjects();
    return sortObjectsByOptionalNameProperty(projects);
  }

  // Repositories
  @Get('repositories/:projectId')
  async repositories(@Param('projectId') projectId: string) {
    const repos = await this.gitApi.getRepositories(projectId);
    return sortObjectsByOptionalNameProperty(repos);
  }
}
