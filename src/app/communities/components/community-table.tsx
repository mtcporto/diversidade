"use client";

import *import type { Community, CommunityCategory } from "@/types";
import { communityCategories } from "@/types";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type FilterFn,
} from "@tanstack/react-table";
import { rankItem } from '@tanstack/match-sorter-utils';
import { flexRender } from "@tanstack/react-table";
import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getColumns } from "./columns";
import { archiveCommunity, getCommunities } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface CommunityTableProps {
  initialCommunities: Community[];
  initialTotalCount: number;
  initialPage: number;
  searchQuery?: string;
  searchCategory?: CommunityCategory;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export default function CommunityTable({ 
  initialCommunities, 
  initialTotalCount, 
  initialPage,
  searchQuery: initialSearchQuery = '',
  searchCategory: initialSearchCategory
}: CommunityTableProps) {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [categoryFilter, setCategoryFilter] = useState<CommunityCategory | undefined>(initialSearchCategory);
  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const pageSize = 10;

  const handleArchive = async (id: string) => {
    const success = await archiveCommunity(id);
    if (success) {
      toast({ title: "Comunidade arquivada", description: "A comunidade foi movida para os arquivos." });
      fetchData(currentPage, searchTerm, categoryFilter); // Refresh data
    } else {
      toast({ title: "Erro", description: "Não foi possível arquivar a comunidade.", variant: "destructive" });
    }
  };
  
  const columns = useMemo(() => getColumns(handleArchive), [handleArchive]);

  const table = useReactTable({
    data: communities,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      }
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
  });

  const fetchData = async (page: number, term: string, category?: CommunityCategory) => {
    const { communities: newCommunities, totalCount: newTotalCount } = await getCommunities(term, category, page, pageSize);
    setCommunities(newCommunities);
    setTotalCount(newTotalCount);
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("query", term); else params.delete("query");
    if (category) params.set("category", category); else params.delete("category");
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    // Sync state with URL params on initial load or if they change externally
    const urlPage = Number(searchParams.get('page')) || 1;
    const urlQuery = searchParams.get('query') || '';
    const urlCategory = searchParams.get('category') as CommunityCategory | undefined;

    if (urlPage !== currentPage || urlQuery !== searchTerm || urlCategory !== categoryFilter) {
      setCurrentPage(urlPage);
      setSearchTerm(urlQuery);
      setCategoryFilter(urlCategory);
      fetchData(urlPage, urlQuery, urlCategory);
    }
  }, [searchParams]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    fetchData(1, newSearchTerm, categoryFilter);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? undefined : value as CommunityCategory;
    setCategoryFilter(newCategory);
    fetchData(1, searchTerm, newCategory);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= table.getPageCount()) {
      fetchData(newPage, searchTerm, categoryFilter);
    }
  };


  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-1/2 md:w-1/3">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
           <Input
            placeholder="Buscar por nome, descrição..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full rounded-md border shadow-sm focus:ring-accent focus:border-accent"
          />
        </div>
        <Select value={categoryFilter || "all"} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-auto min-w-[180px] shadow-sm focus:ring-accent focus:border-accent">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {communityCategories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-headline text-primary">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma comunidade encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Total de {totalCount} comunidades.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
          </Button>
          <span className="text-sm">
            Página {currentPage} de {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === table.getPageCount() || table.getPageCount() === 0}
          >
            Próxima <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
