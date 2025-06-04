import type { Community, CommunityCategoryPT } from '@/types'; // Updated import
import { fetchImageFromPexels } from '@/services/pexels';

// Initial mock data for communities
let mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Comunidade Sol Nascente',
    description: 'Uma comunidade vibrante de artesãos locais que preservam técnicas ancestrais de cerâmica e tecelagem.',
    category: 'Artesãos', // Updated category
    address: 'Rua das Palmeiras, 123, Vila Aurora, MG',
    latitude: -19.916681,
    longitude: -43.934493,
    contactEmail: 'sol.nascente@email.com',
    contactPhone: '(31) 98765-4321',
    website: 'https://solnascente.example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    pexelsQueryUsed: 'artesanato cerâmica',
    createdAt: new Date('2020-01-15T09:30:00Z').toISOString(),
    updatedAt: new Date('2023-05-20T14:00:00Z').toISOString(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Aldeia Krenak Esperança',
    description: 'Comunidade indígena Krenak dedicada à preservação de sua cultura, língua e território ancestral.',
    category: 'Indígena', // Updated category
    address: 'Reserva Indígena Rio Doce, S/N, Resplendor, MG',
    latitude: -19.3233,
    longitude: -41.2556,
    contactEmail: 'aldeia.esperanca@email.com',
    website: 'https://aldeiakrenak.example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    pexelsQueryUsed: 'Krenak indígena',
    createdAt: new Date('2018-06-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2023-10-10T10:00:00Z').toISOString(),
    isActive: true,
  },
  {
    id: '3',
    name: 'Quilombo Raízes da Terra',
    description: 'Comunidade quilombola com forte tradição na agricultura familiar orgânica e manifestações culturais afro-brasileiras.',
    category: 'Quilombola', // Updated category
    address: 'Estrada da Liberdade, Km 5, Zona Rural, Ouro Preto, MG',
    latitude: -20.3856,
    longitude: -43.5039,
    contactPhone: '(31) 91234-5678',
    imageUrl: 'https://placehold.co/600x400.png',
    pexelsQueryUsed: 'quilombo agricultura orgânica',
    createdAt: new Date('2015-03-22T11:45:00Z').toISOString(),
    updatedAt: new Date('2023-11-01T16:20:00Z').toISOString(),
    isActive: false, // Archived example
  },
   {
    id: '4',
    name: 'Associação Agroecológica Vida Verde',
    description: 'Grupo de agricultores familiares focados em práticas agroecológicas e produção de alimentos saudáveis.',
    category: 'Agrícola', // Updated category
    address: 'Sítio Boa Esperança, s/n, Zona Rural, Viçosa, MG',
    latitude: -20.7544,
    longitude: -42.8786,
    contactEmail: 'vida.verde@email.com',
    website: 'https://vidaverdeagro.example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    pexelsQueryUsed: 'agroecologia horta comunitária',
    createdAt: new Date('2019-09-10T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T00:00:00Z').toISOString(),
    isActive: true,
  },
  {
    id: '5',
    name: 'Centro Cultural Tambores da Montanha',
    description: 'Espaço dedicado à promoção da cultura popular, com oficinas de percussão, dança e contação de histórias.',
    category: 'Cultural', // Updated category
    address: 'Praça da Matriz, 77, Serra Azul, SP',
    latitude: -23.6815,
    longitude: -46.8762,
    contactEmail: 'tambores.montanha@email.com',
    contactPhone: '(11) 99999-8888',
    imageUrl: 'https://placehold.co/600x400.png',
    pexelsQueryUsed: 'cultura popular percussão',
    createdAt: new Date('2021-07-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2023-08-20T00:00:00Z').toISOString(),
    isActive: true,
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCommunities(
  searchTerm?: string,
  categoryFilter?: CommunityCategoryPT, // Updated type
  page: number = 1,
  pageSize: number = 10
): Promise<{ communities: Community[], totalCount: number }> {
  await delay(300); // Simulate network delay

  let filtered = mockCommunities.filter(c => c.isActive); // Default to active communities

  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(community =>
      community.name.toLowerCase().includes(lowerSearchTerm) ||
      community.description.toLowerCase().includes(lowerSearchTerm) ||
      community.address.toLowerCase().includes(lowerSearchTerm)
    );
  }

  if (categoryFilter) {
    filtered = filtered.filter(community => community.category === categoryFilter);
  }
  
  const totalCount = filtered.length;
  const paginatedCommunities = filtered.slice((page - 1) * pageSize, page * pageSize);

  return { communities: paginatedCommunities, totalCount };
}

export async function getAllCommunitiesForMap(): Promise<Community[]> {
  await delay(100);
  return mockCommunities.filter(c => c.isActive);
}


export async function getCommunityById(id: string): Promise<Community | undefined> {
  await delay(100);
  return mockCommunities.find(community => community.id === id);
}

export async function createCommunity(data: Omit<Community, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'pexelsQueryUsed'>): Promise<Community> {
  await delay(200);
  
  let finalImageUrl = data.imageUrl;
  let pexelsQuery: string | undefined;

  if (!finalImageUrl) {
    const pexelsResponse = await fetchImageFromPexels(data.name, data.category);
    if (pexelsResponse.imageUrl) {
      finalImageUrl = pexelsResponse.imageUrl;
      pexelsQuery = pexelsResponse.queryUsed;
    } else {
      finalImageUrl = `https://placehold.co/600x400.png?text=${encodeURIComponent(data.name)}`; // Fallback placeholder
    }
  }

  const newCommunity: Community = {
    ...data,
    id: String(mockCommunities.length + 1 + Math.random()), // Simple ID generation
    imageUrl: finalImageUrl,
    pexelsQueryUsed: pexelsQuery,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  };
  mockCommunities.unshift(newCommunity); // Add to the beginning for visibility
  return newCommunity;
}

export async function updateCommunity(id: string, data: Partial<Omit<Community, 'id' | 'createdAt' | 'updatedAt' | 'pexelsQueryUsed'>>): Promise<Community | undefined> {
  await delay(200);
  const index = mockCommunities.findIndex(community => community.id === id);
  if (index !== -1) {
    let finalImageUrl = data.imageUrl;
    let pexelsQueryUpdate: string | undefined = mockCommunities[index].pexelsQueryUsed;

    // If imageUrl is explicitly being set to empty or undefined by the update, 
    // AND it was not already empty, then try to fetch from Pexels.
    // Or if imageUrl is not part of 'data' object at all (meaning it wasn't touched in the form), and it was empty before, try Pexels.
    const shouldFetchPexels = (!data.imageUrl && data.hasOwnProperty('imageUrl')) || (!mockCommunities[index].imageUrl && !data.hasOwnProperty('imageUrl'));

    if (shouldFetchPexels && data.name && data.category) { // Ensure name and category are available for Pexels query
      const pexelsResponse = await fetchImageFromPexels(data.name, data.category);
      if (pexelsResponse.imageUrl) {
        finalImageUrl = pexelsResponse.imageUrl;
        pexelsQueryUpdate = pexelsResponse.queryUsed;
      } else if (!mockCommunities[index].imageUrl) { // Only set placeholder if there wasn't an image before
         finalImageUrl = `https://placehold.co/600x400.png?text=${encodeURIComponent(data.name || mockCommunities[index].name)}`;
      }
    } else if (data.imageUrl === "") { // If explicitly cleared in form
        finalImageUrl = `https://placehold.co/600x400.png?text=${encodeURIComponent(data.name || mockCommunities[index].name)}`;
        pexelsQueryUpdate = undefined;
    }


    mockCommunities[index] = {
      ...mockCommunities[index],
      ...data,
      imageUrl: finalImageUrl !== undefined ? finalImageUrl : mockCommunities[index].imageUrl, // Keep old if new is undefined
      pexelsQueryUsed: pexelsQueryUpdate,
      updatedAt: new Date().toISOString(),
    };
    return mockCommunities[index];
  }
  return undefined;
}

export async function archiveCommunity(id: string): Promise<boolean> {
  await delay(100);
  const index = mockCommunities.findIndex(community => community.id === id);
  if (index !== -1) {
    mockCommunities[index].isActive = false;
    mockCommunities[index].updatedAt = new Date().toISOString();
    return true;
  }
  return false;
}

export async function unarchiveCommunity(id: string): Promise<boolean> {
  await delay(100);
  const index = mockCommunities.findIndex(community => community.id === id);
  if (index !== -1) {
    mockCommunities[index].isActive = true;
    mockCommunities[index].updatedAt = new Date().toISOString();
    return true;
  }
  return false;
}

export async function getArchivedCommunities(
  page: number = 1,
  pageSize: number = 10
): Promise<{ communities: Community[], totalCount: number }> {
  await delay(300);
  const archived = mockCommunities.filter(c => !c.isActive);
  const totalCount = archived.length;
  const paginatedCommunities = archived.slice((page - 1) * pageSize, page * pageSize);
  return { communities: paginatedCommunities, totalCount };
}
