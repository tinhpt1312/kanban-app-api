import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { ChecklistItem } from './checklist-item.entity';
import { Audit } from './audit';

@Entity({ name: 'check_lists', schema: 'public' })
export class CheckList {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: '256' })
  name!: string;

  @Column({ name: 'card_id', type: 'bigint' })
  cardId!: string;

  @ManyToOne(() => Card, (card) => card.checkLists)
  @JoinColumn({
    name: 'card_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_checklists_card_id',
  })
  card!: Card;

  @OneToMany(() => ChecklistItem, (item) => item.checklist)
  items!: ChecklistItem[];

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
