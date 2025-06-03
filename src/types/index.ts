export type CommunityCategory = 'Indigenous' | 'Quilombola' | 'Artisans' | 'Agricultural' | 'Cultural' | 'Environmental' | 'Other';

export const communityCategories: CommunityCategory[] = [
  'Indigenous', 'Quilombola', 'Artisans', 'Agricultural', 'Cultural', 'Environmental', 'Other'
];

export interface Community {
  id: string;
  name: string;
  description: string;
  category: CommunityCategory;
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
}
