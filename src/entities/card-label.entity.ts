import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Label } from './label.entity';

@Entity({ name: 'cards_labels', schema: 'public' })
export class CardLabel {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'card_id', type: 'bigint' })
  cardId!: string;

  @ManyToOne(() => Card, (card) => card.cardLabels)
  @JoinColumn({
    name: 'card_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_card_labels_card_id',
  })
  card!: Card;

  @Column({ name: 'label_id', type: 'bigint' })
  labelId!: string;

  @ManyToOne(() => Label, (label) => label.cardLabels)
  @JoinColumn({
    name: 'label_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_card_labels_label_id',
  })
  label!: Label;
}
