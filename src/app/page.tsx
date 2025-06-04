import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound, Map as MapIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-br from-primary/10 to-background rounded-lg shadow-lg">
        <h1 className="text-5xl font-headline text-primary mb-4">
          Bem-vindo ao Mapa de Diversidade
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Explore e conecte-se com as diversas comunidades que enriquecem nossa cultura e território.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/communities">
              <UsersRound className="mr-2 h-5 w-5" /> Ver Comunidades
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/map">
              <MapIcon className="mr-2 h-5 w-5" /> Explorar Mapa
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-headline text-primary mb-6">Nossa Missão</h2>
          <p className="text-lg text-foreground/90 mb-4">
            O Mapa de Diversidade visa dar visibilidade e fortalecer comunidades tradicionais, grupos culturais,
            e iniciativas socioambientais. Acreditamos no poder da conexão e do compartilhamento de saberes.
          </p>
          <p className="text-lg text-foreground/90">
            Utilize nossa plataforma para cadastrar, encontrar e apoiar essas comunidades, contribuindo para
            um futuro mais justo, inclusivo e sustentável.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://images.shutterstock.com/image-photo/yellow-chili-on-hand-region-600nw-713969461.jpg"
            alt="Mão segurando uma pimenta amarela, representando a riqueza e diversidade cultural e agrícola."
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="chili hand"
          />
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-headline text-primary mb-8 text-center">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-2xl text-primary">
                <UsersRound className="mr-3 h-7 w-7 text-accent" />
                Lista de Comunidades
              </CardTitle>
              <CardDescription>Navegue por um diretório completo e organizado.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Encontre informações detalhadas, filtre por categoria e realize buscas específicas. Gerencie dados com facilidade.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-2xl text-primary">
                <MapIcon className="mr-3 h-7 w-7 text-accent" />
                Mapa Interativo
              </CardTitle>
              <CardDescription>Visualize a localização geográfica das comunidades.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore o mapa para descobrir comunidades próximas e entender sua distribuição territorial.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-2xl text-primary">
                <PlusCircle className="mr-3 h-7 w-7 text-accent" />
                Cadastro Simplificado
              </CardTitle>
              <CardDescription>Adicione novas comunidades à plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contribua para o mapa adicionando informações sobre comunidades que você conhece.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
