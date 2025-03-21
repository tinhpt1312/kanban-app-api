import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Audit } from './audit';

@Entity({ name: 'attachments', schema: 'public' })
export class Attachment {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_attachments_id',
  })
  id!: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: '256',
  })
  fileName!: string;

  @Column({
    name: 'card_id',
    type: 'bigint',
  })
  cardId!: string;

  @ManyToOne(() => Card, (card) => card.attachments)
  @JoinColumn({
    name: 'card_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_card_attachments_card_id',
  })
  card!: Card;

  @Column(() => Audit, { prefix: false })
  audit!: Audit;
}
