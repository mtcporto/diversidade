
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Community } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Eye, Edit3, Archive as ArchiveIcon, Users, MapPin, Palette, TreePine, Building } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const CategoryIcon = ({ category }: { category: Community['category'] }) => {
  switch (category) {
    case 'Indigenous': return <Users className="h-4 w-4 mr-2 text-primary" />;
    case 'Quilombola': return <Users className="h-4 w-4 mr-2 text-primary" />;
    case 'Artisans': return <Palette className="h-4 w-4 mr-2 text-accent" />;
    case 'Agricultural': return <TreePine className="h-4 w-4 mr-2 text-primary" />;
    case 'Cultural': return <Building className="h-4 w-4 mr-2 text-accent" />;
    case 'Environmental': return <TreePine className="h-4 w-4 mr-2 text-primary" />;
    default: return <Users className="h-4 w-4 mr-2 text-muted-foreground" />;
  }
};


export const getColumns = (
  onArchive: (id: string) => void
): ColumnDef<Community>[] => [
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
      const category = row.getValue("category") as Community['category'];
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
            <DropdownMenuItem asChild>
              <Link href={`/communities/${community.id}/edit`} className="cursor-pointer">
                <Edit3 className="mr-2 h-4 w-4" /> Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onArchive(community.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
              <ArchiveIcon className="mr-2 h-4 w-4" /> Arquivar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
