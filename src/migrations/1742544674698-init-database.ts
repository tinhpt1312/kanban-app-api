import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDatabase1742544674698 implements MigrationInterface {
  name = 'InitDatabase1742544674698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" BIGSERIAL NOT NULL, "action" character varying(100) NOT NULL, "subject" character varying(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "permissions_pkey" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions_roles" ("id" BIGSERIAL NOT NULL, "role_id" bigint NOT NULL, "permission_id" bigint NOT NULL, CONSTRAINT "permissions_roles_pkey" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" BIGSERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "roles_pkey" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards_labels" ("id" BIGSERIAL NOT NULL, "card_id" bigint NOT NULL, "label_id" bigint NOT NULL, CONSTRAINT "PK_5d180e2e297c964acc1aa2ada65" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "labels" ("id" BIGSERIAL NOT NULL, "title" character varying(256) NOT NULL, "color" character varying(50) NOT NULL, "board_id" bigint NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "pk_labels_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board_members" ("id" BIGSERIAL NOT NULL, "board_id" bigint NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "pk_board_members_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boards" ("id" BIGSERIAL NOT NULL, "board" character varying(256) NOT NULL, "background_color" character varying(50) NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "pk_boards_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lists" ("id" BIGSERIAL NOT NULL, "title" character varying(256) NOT NULL, "position" integer NOT NULL, "is_archived" boolean NOT NULL DEFAULT false, "board_id" bigint NOT NULL, CONSTRAINT "pk_lists_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" BIGSERIAL NOT NULL, "content" text NOT NULL, "card_id" bigint NOT NULL, "parentId" bigint, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "pk_comments_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attachments" ("id" BIGSERIAL NOT NULL, "file_name" character varying(256) NOT NULL, "card_id" bigint NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "pk_attachments_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "checklists_items" ("id" BIGSERIAL NOT NULL, "title" character varying(50) NOT NULL, "checklist_id" bigint NOT NULL, "due_date" TIMESTAMP DEFAULT now(), "is_completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e1a51f02685868467448cd03112" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "check_lists" ("id" BIGSERIAL NOT NULL, "name" character varying(256) NOT NULL, "card_id" bigint NOT NULL, CONSTRAINT "PK_63fb5f5cb0969398d1c5fc7be7f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" BIGSERIAL NOT NULL, "card" character varying(256) NOT NULL, "list_id" bigint NOT NULL, "description" text, "position" integer NOT NULL, "priority" character varying(50) NOT NULL, "is_archived" boolean NOT NULL DEFAULT false, "status" character varying(50) NOT NULL, "start_date" TIMESTAMP DEFAULT now(), "due_date" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "pk_cards_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards_members" ("id" SERIAL NOT NULL, "card_id" bigint NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_95f3d2ea84c906fd578564ad7c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "email" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "provider" character varying(255) NOT NULL, "avatar" character varying(255), "email_verified" boolean NOT NULL DEFAULT false, "password" character varying(255), "role_id" bigint, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "users_pkey" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_codes" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "code" character varying(6) NOT NULL, "type" character varying(50) NOT NULL, "used_at" TIMESTAMP, "expired_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "created_by" bigint, "updated_at" TIMESTAMP DEFAULT now(), "updated_by" bigint, "deleted_at" TIMESTAMP, "deleted_by" bigint, CONSTRAINT "pk_user_codes_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions_roles" ADD CONSTRAINT "fk_permissions_roles_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions_roles" ADD CONSTRAINT "fk_permissions_roles_permission_id" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_labels" ADD CONSTRAINT "fk_card_labels_card_id" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_labels" ADD CONSTRAINT "fk_card_labels_label_id" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "labels" ADD CONSTRAINT "fk_labels_board_id" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "labels" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "labels" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_members" ADD CONSTRAINT "fk_board_members_board_id" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_members" ADD CONSTRAINT "fk_board_members_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ADD CONSTRAINT "fk_lists_board_id" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "fk_card_comments_id" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" ADD CONSTRAINT "fk_card_attachments_card_id" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "checklists_items" ADD CONSTRAINT "fk_checklist_items_checklist_id" FOREIGN KEY ("checklist_id") REFERENCES "check_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "check_lists" ADD CONSTRAINT "fk_checklists_card_id" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "fk_cards_list_id" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_members" ADD CONSTRAINT "fk_cards_members_card_id" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_members" ADD CONSTRAINT "fk_cards_members_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_users_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_codes" ADD CONSTRAINT "fk_user_codes_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_codes" ADD CONSTRAINT "fk_timestamp_created_by" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_codes" ADD CONSTRAINT "fk_timestamp_updated_by" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_codes" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_codes" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_codes" DROP CONSTRAINT "fk_user_codes_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "fk_users_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_members" DROP CONSTRAINT "fk_cards_members_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_members" DROP CONSTRAINT "fk_cards_members_card_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "fk_cards_list_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "check_lists" DROP CONSTRAINT "fk_checklists_card_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "checklists_items" DROP CONSTRAINT "fk_checklist_items_checklist_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP CONSTRAINT "fk_card_attachments_card_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "fk_card_comments_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" DROP CONSTRAINT "fk_lists_board_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_members" DROP CONSTRAINT "fk_board_members_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_members" DROP CONSTRAINT "fk_board_members_board_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "labels" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "labels" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "labels" DROP CONSTRAINT "fk_labels_board_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_labels" DROP CONSTRAINT "fk_card_labels_label_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards_labels" DROP CONSTRAINT "fk_card_labels_card_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions_roles" DROP CONSTRAINT "fk_permissions_roles_permission_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions_roles" DROP CONSTRAINT "fk_permissions_roles_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "fk_timestamp_updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "fk_timestamp_created_by"`,
    );
    await queryRunner.query(`DROP TABLE "user_codes"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "cards_members"`);
    await queryRunner.query(`DROP TABLE "cards"`);
    await queryRunner.query(`DROP TABLE "check_lists"`);
    await queryRunner.query(`DROP TABLE "checklists_items"`);
    await queryRunner.query(`DROP TABLE "attachments"`);
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "lists"`);
    await queryRunner.query(`DROP TABLE "boards"`);
    await queryRunner.query(`DROP TABLE "board_members"`);
    await queryRunner.query(`DROP TABLE "labels"`);
    await queryRunner.query(`DROP TABLE "cards_labels"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "permissions_roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
  }
}
