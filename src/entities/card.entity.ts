import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from './list.entity';
import { Audit } from './audit';
import { Comment } from './comment.entity';
import { Attachment } from './attachment.entity';
import { CardLabel } from './card-label.entity';
import { CardMember } from './card-member.entity';
import { CheckList } from './check-list.entity';

@Entity({ name: 'cards', schema: 'public' })
export class Card {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_cards_id',
  })
  id!: string;

  @Column({
    name: 'card',
    type: 'varchar',
    length: 256,
  })
  title!: string;

  @Column({
    name: 'list_id',
    type: 'bigint',
  })
  listId!: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description!: string;

  @Column({
    name: 'position',
    type: 'int',
  })
  position!: number;

  @Column({
    name: 'priority',
    type: 'varchar',
    length: '50',
  })
  priority!: number;

  @Column({
    name: 'is_archived',
    type: 'boolean',
    default: false,
  })
  isArchived!: boolean;

  @Column({
    name: 'status',
    type: 'varchar',
    length: '50',
  })
  status!: string;

  @CreateDateColumn({
    name: 'start_date',
    type: 'timestamp',
    nullable: true,
  })
  startDate!: Date;

  @CreateDateColumn({
    name: 'due_date',
    type: 'timestamp',
    nullable: true,
  })
  dueDate!: Date;

  @ManyToOne(() => List, (list) => list.cards)
  @JoinColumn({
    name: 'list_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_cards_list_id',
  })
  list!: List;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments!: Comment[];

  @OneToMany(() => Attachment, (attachment) => attachment.card)
  attachments!: Attachment[];

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.card)
  cardLabels!: CardLabel[];

  @OneToMany(() => CardMember, (cardMember) => cardMember.card)
  cardMembers!: CardMember[];

  @OneToMany(() => CheckList, (checkList) => checkList.card)
  checkLists!: CheckList[];

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
