
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Community, CommunityCategoryPT } from "@/types"; 
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Eye, Edit3, Archive as ArchiveIcon, Users, Palette, TreePine, Building } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { User } from "firebase/auth"; // Import User type

const CategoryIcon = ({ category }: { category: CommunityCategoryPT }) => { 
  switch (category) {
    case 'Indígena': return <Users className="h-4 w-4 mr-2 text-primary" />;
    case 'Quilombola': return <Users className="h-4 w-4 mr-2 text-primary" />;
    case 'Artesãos': return <Palette className="h-4 w-4 mr-2 text-accent" />;
    case 'Agrícola': return <TreePine className="h-4 w-4 mr-2 text-primary" />;
    case 'Cultural': return <Building className="h-4 w-4 mr-2 text-accent" />;
    case 'Ambiental': return <TreePine className="h-4 w-4 mr-2 text-primary" />;
    default: return <Users className="h-4 w-4 mr-2 text-muted-foreground" />; 
  }
};


export const getColumns = (
  onArchive: (id: string) => void,
  user: User | null // Accept user as a parameter
): ColumnDef<Community>[] => {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => {
        const category = row.getValue("category") as CommunityCategoryPT; 
        return (
          <Badge variant="secondary" className="flex items-center w-fit">
            <CategoryIcon category={category} />
            {category}
          </Badge>
        );
      }
    },
    {
      accessorKey: "address",
      header: "Endereço",
      cell: ({ row }) => {
        const address = row.getValue("address") as string;
        return <div className="text-sm text-muted-foreground truncate max-w-xs">{address}</div>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive");
        return <Badge variant={isActive ? "default" : "outline"}>{isActive ? "Ativa" : "Arquivada"}</Badge>;
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const community = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/communities/${community.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" /> Ver Detalhes
                </Link>
              </DropdownMenuItem>
              {user && ( 
                <>
                  <DropdownMenuItem asChild>
                    <Link href={`/communities/${community.id}/edit`} className="cursor-pointer">
                      <Edit3 className="mr-2 h-4 w-4" /> Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onArchive(community.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                    <ArchiveIcon className="mr-2 h-4 w-4" /> Arquivar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
