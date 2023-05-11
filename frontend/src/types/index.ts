export interface IRepository {
  id: number;
  dependent_repos_count: number;
  dependents_count: number;
  deprecation_reason: string | null;
  description: string;
  forks: number;
  homepage: string;
  keywords: string[];
  language: string;
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number: string;
  latest_stable_release_published_at: string;
  license_normalized: boolean;
  licenses: string;
  name: string;
  normalized_licenses: string[];
  package_manager_url: string;
  platform: string;
  rank_: number;
  repository_license: string;
  repository_status: string | null;
  repository_url: string;
  stars: number;
  status: string | null;
  versions: IVersion[];
}

export interface IVersion {
  number: string;
  original_license: string[];
  published_at: string;
  repository_sources: string[];
  researched_at: string | null;
  spdx_expression: string;
}

export interface IPlatform {
  name: string;
  project_count: number;
  homepage: string;
  color: string;
  default_language: string;
}

export interface ILicense {
  id: number;
  name: string;
}
