import { z } from 'zod';
import { communityCategoriesPT } from '@/types'; // Updated import

export const communitySchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }).max(100),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres." }).max(1000),
  category: z.enum(communityCategoriesPT, { errorMap: () => ({ message: "Selecione uma categoria válida." }) }), // Updated to use Portuguese categories
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres." }).max(200),
  latitude: z.coerce.number().min(-90).max(90, { message: "Latitude inválida." }),
  longitude: z.coerce.number().min(-180).max(180, { message: "Longitude inválida." }),
  contactEmail: z.string().email({ message: "Email inválido." }).optional().or(z.literal('')),
  contactPhone: z.string().optional().or(z.literal('')),
  website: z.string().url({ message: "URL inválida." }).optional().or(z.literal('')),
  imageUrl: z.string().url({ message: "URL da imagem inválida." }).optional().or(z.literal('')),
});

export type CommunityFormData = z.infer<typeof communitySchema>;
