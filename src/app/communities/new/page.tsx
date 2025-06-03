import CommunityForm from '../components/community-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewCommunityPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">Adicionar Nova Comunidade</CardTitle>
          <CardDescription>Preencha os dados abaixo para registrar uma nova comunidade na plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <CommunityForm />
        </CardContent>
      </Card>
    </div>
  );
}
