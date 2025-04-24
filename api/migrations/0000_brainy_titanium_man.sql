CREATE TABLE `roles` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text NOT NULL,
	`role` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_id_unique` ON `roles` (`id`);--> statement-breakpoint
CREATE TABLE `timeins` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text NOT NULL,
	`datetime` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `timeins_id_unique` ON `timeins` (`id`);--> statement-breakpoint
CREATE TABLE `timeouts` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text NOT NULL,
	`datetime` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `timeouts_id_unique` ON `timeouts` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`public_id` text NOT NULL,
	`name` text,
	`phone_number` text NOT NULL,
	`image_url` text,
	`verified` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);