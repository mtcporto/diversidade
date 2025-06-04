export type CommunityCategoryPT = 'Indígena' | 'Quilombola' | 'Artesãos' | 'Agrícola' | 'Cultural' | 'Ambiental' | 'Outra';

export const communityCategoriesPT: CommunityCategoryPT[] = [
  'Indígena', 'Quilombola', 'Artesãos', 'Agrícola', 'Cultural', 'Ambiental', 'Outra'
];

export interface Community {
  id: string;
  name: string;
  description: string;
  category: CommunityCategoryPT; // Updated to Portuguese type
  address: string;
  latitude: number;
  longitude: number;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  imageUrl?: string; 
  createdAt: string; 
  updatedAt: string; 
  isActive: boolean; 
  pexelsQueryUsed?: string; // Optional: store Pexels query
}
