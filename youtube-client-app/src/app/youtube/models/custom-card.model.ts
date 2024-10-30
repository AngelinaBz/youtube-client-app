export interface CustomCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  creationDate: Date;
  tags?: { tagName: string }[];
}
