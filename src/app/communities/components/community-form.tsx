"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { communitySchema, type CommunityFormData } from "@/lib/schema";
import type { Community } from "@/types";
import { communityCategories } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCommunity, updateCommunity } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Image as ImageIcon, Mail, MapPin, Phone, Tag, Users, FileText } from "lucide-react";

interface CommunityFormProps {
  existingCommunity?: Community;
}

export default function CommunityForm({ existingCommunity }: CommunityFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CommunityFormData>({
    resolver: zodResolver(communitySchema),
    defaultValues: existingCommunity ? {
      ...existingCommunity,
      latitude: existingCommunity.latitude ?? 0, // Ensure number type
      longitude: existingCommunity.longitude ?? 0, // Ensure number type
    } : {
      name: "",
      description: "",
      category: undefined,
      address: "",
      latitude: 0,
      longitude: 0,
      contactEmail: "",
      contactPhone: "",
      website: "",
      imageUrl: "",
    },
  });

  async function onSubmit(data: CommunityFormData) {
    try {
      if (existingCommunity) {
        await updateCommunity(existingCommunity.id, data);
        toast({ title: "Sucesso!", description: "Comunidade atualizada com sucesso." });
        router.push(`/communities/${existingCommunity.id}`);
      } else {
        const newCommunity = await createCommunity(data);
        toast({ title: "Sucesso!", description: "Comunidade criada com sucesso." });
        router.push(`/communities/${newCommunity.id}`);
      }
      router.refresh(); // Refresh server components
    } catch (error) {
      console.error("Failed to save community:", error);
      toast({
        title: "Erro",
        description: "Falha ao salvar comunidade. Tente novamente.",
        variant: "destructive",
      });
    }
  }

  const formFields = [
    { name: "name" as const, label: "Nome da Comunidade", placeholder: "Ex: Aldeia Pataxó Nova Vida", icon: Users, description: "O nome oficial da comunidade ou organização." },
    { name: "description" as const, label: "Descrição", placeholder: "Descreva a comunidade, sua missão, atividades...", icon: FileText, type: "textarea", description: "Um resumo sobre a comunidade, suas atividades principais e história." },
    { name: "category" as const, label: "Categoria", placeholder: "Selecione uma categoria", icon: Tag, type: "select", options: communityCategories, description: "Classifique o tipo principal da comunidade." },
    { name: "address" as const, label: "Endereço Completo", placeholder: "Ex: Rua Principal, 123, Vila Esperança, Cidade - Estado", icon: MapPin, description: "O endereço físico principal da comunidade." },
    { name: "latitude" as const, label: "Latitude", placeholder: "Ex: -19.916681", type: "number", icon: MapPin, description: "Coordenada geográfica (decimal). Use '.' como separador." },
    { name: "longitude" as const, label: "Longitude", placeholder: "Ex: -43.934493", type: "number", icon: MapPin, description: "Coordenada geográfica (decimal). Use '.' como separador." },
    { name: "contactEmail" as const, label: "Email de Contato", placeholder: "contato@comunidade.org", type: "email", icon: Mail, description: "Email principal para contato." },
    { name: "contactPhone" as const, label: "Telefone de Contato", placeholder: "(XX) XXXXX-XXXX", icon: Phone, description: "Telefone principal para contato." },
    { name: "website" as const, label: "Website/Rede Social", placeholder: "https://comunidade.org", type: "url", icon: Globe, description: "Link para o site oficial ou perfil em rede social." },
    { name: "imageUrl" as const, label: "URL da Imagem de Destaque", placeholder: "https://linkdaimagem.com/foto.jpg", type: "url", icon: ImageIcon, description: "Um link para uma imagem representativa da comunidade." },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((fieldInfo) => (
          <FormField
            key={fieldInfo.name}
            control={form.control}
            name={fieldInfo.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-lg">
                  <fieldInfo.icon className="mr-2 h-5 w-5 text-primary" />
                  {fieldInfo.label}
                </FormLabel>
                <FormControl>
                  {fieldInfo.type === "textarea" ? (
                    <Textarea placeholder={fieldInfo.placeholder} {...field} rows={5} className="focus:ring-accent focus:border-accent" />
                  ) : fieldInfo.type === "select" ? (
                    <Select onValueChange={field.onChange} defaultValue={field.value as string | undefined}>
                      <SelectTrigger className="focus:ring-accent focus:border-accent">
                        <SelectValue placeholder={fieldInfo.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldInfo.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={fieldInfo.type || "text"}
                      placeholder={fieldInfo.placeholder}
                      {...field}
                      value={field.value ?? ""} // Ensure value is not undefined for input
                      className="focus:ring-accent focus:border-accent"
                      step={ (fieldInfo.name === 'latitude' || fieldInfo.name === 'longitude') ? "any" : undefined }
                    />
                  )}
                </FormControl>
                <FormDescription>{fieldInfo.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Salvando..." : (existingCommunity ? "Salvar Alterações" : "Criar Comunidade")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
