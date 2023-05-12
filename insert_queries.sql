INSERT INTO `open_source_finder`.`contributor`
(`id`,
`name`,
`github_id`,
`blog_url`,
`bio`)
VALUES
(<{id: }>,
<{name: }>,
<{github_id: }>,
<{blog_url: }>,
<{bio: }>);

INSERT INTO `open_source_finder`.`keyword`
(`id`,
`word`)
VALUES
(<{id: }>,
<{word: }>);

INSERT INTO `open_source_finder`.`license`
(`id`,
`name`)
VALUES
(<{id: }>,
<{name: }>);

INSERT INTO `open_source_finder`.`platform`
(`id`,
`name`,
`project_count`,
`homepage`)
VALUES
(<{id: }>,
<{name: }>,
<{project_count: }>,
<{homepage: }>);

INSERT INTO `open_source_finder`.`project`
(`id`,
`name`,
`owner_id`)
VALUES
(<{id: }>,
<{name: }>,
<{owner_id: }>);

INSERT INTO `open_source_finder`.`project_repository`
(`project_id`,
`repository_id`)
VALUES
(<{project_id: }>,
<{repository_id: }>);

INSERT INTO `open_source_finder`.`repository`
(`id`,
`name`,
`description`,
`latest_release_number`,
`latest_release_published_at`,
`homepage`,
`package_manager_url`,
`latest_download_url`,
`rank_`,
`stars`,
`forks`,
`platform_id`,
`dependencies_count`,
`created_at`,
`updated_at`)
VALUES
(<{id: }>,
<{name: }>,
<{description: }>,
<{latest_release_number: }>,
<{latest_release_published_at: }>,
<{homepage: }>,
<{package_manager_url: }>,
<{latest_download_url: }>,
<{rank_: }>,
<{stars: }>,
<{forks: }>,
<{platform_id: }>,
<{dependencies_count: }>,
<{created_at: CURRENT_TIMESTAMP}>,
<{updated_at: }>);

INSERT INTO `open_source_finder`.`repository_dependency`
(`dependent_id`,
`dependee_id`)
VALUES
(<{dependent_id: }>,
<{dependee_id: }>);

INSERT INTO `open_source_finder`.`repository_keyword`
(`repository_id`,
`keyword_id`)
VALUES
(<{repository_id: }>,
<{keyword_id: }>);

INSERT INTO `open_source_finder`.`repository_license`
(`repository_id`,
`license_id`)
VALUES
(<{repository_id: }>,
<{license_id: }>);

INSERT INTO `open_source_finder`.`user`
(`id`,
`name`,
`email`,
`password`,
`created_at`)
VALUES
(<{id: }>,
<{name: }>,
<{email: }>,
<{password: }>,
<{created_at: CURRENT_TIMESTAMP}>);
