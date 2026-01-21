import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useResidenceMenus, useUpsertResidenceMenu, useDeleteResidenceMenu, MenuData } from "@/hooks/useResidenceMenus";
import { Plus, Save, Trash2, Sun, Snowflake, UtensilsCrossed, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface MenusAdminProps {
  residenceId: string;
}

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const COMIDAS = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'] as const;

const createEmptyMenuData = (): MenuData => ({
  dias: DIAS,
  comidas: {
    Desayuno: Object.fromEntries(DIAS.map(d => [d, ''])),
    Almuerzo: Object.fromEntries(DIAS.map(d => [d, ''])),
    Merienda: Object.fromEntries(DIAS.map(d => [d, ''])),
    Cena: Object.fromEntries(DIAS.map(d => [d, ''])),
  },
});

export const MenusAdmin = ({ residenceId }: MenusAdminProps) => {
  const { data: menus, isLoading } = useResidenceMenus(residenceId);
  const upsertMutation = useUpsertResidenceMenu();
  const deleteMutation = useDeleteResidenceMenu();

  const [activeTab, setActiveTab] = useState<'verano' | 'invierno'>('invierno');
  const [veranoNota, setVeranoNota] = useState('');
  const [veranoData, setVeranoData] = useState<MenuData>(createEmptyMenuData());
  const [inviernoNota, setInviernoNota] = useState('');
  const [inviernoData, setInviernoData] = useState<MenuData>(createEmptyMenuData());

  useEffect(() => {
    if (menus) {
      const verano = menus.find(m => m.season === 'verano');
      const invierno = menus.find(m => m.season === 'invierno');

      if (verano) {
        setVeranoNota(verano.nota || '');
        setVeranoData(verano.menu_data);
      } else {
        setVeranoNota('');
        setVeranoData(createEmptyMenuData());
      }

      if (invierno) {
        setInviernoNota(invierno.nota || '');
        setInviernoData(invierno.menu_data);
      } else {
        setInviernoNota('');
        setInviernoData(createEmptyMenuData());
      }
    }
  }, [menus]);

  const handleCellChange = (
    season: 'verano' | 'invierno',
    comida: typeof COMIDAS[number],
    dia: string,
    value: string
  ) => {
    if (season === 'verano') {
      setVeranoData(prev => ({
        ...prev,
        comidas: {
          ...prev.comidas,
          [comida]: {
            ...prev.comidas[comida],
            [dia]: value,
          },
        },
      }));
    } else {
      setInviernoData(prev => ({
        ...prev,
        comidas: {
          ...prev.comidas,
          [comida]: {
            ...prev.comidas[comida],
            [dia]: value,
          },
        },
      }));
    }
  };

  const handleSave = async (season: 'verano' | 'invierno') => {
    const nota = season === 'verano' ? veranoNota : inviernoNota;
    const menuData = season === 'verano' ? veranoData : inviernoData;

    try {
      await upsertMutation.mutateAsync({
        residenceId,
        season,
        nota,
        menuData,
      });
      toast.success(`Menú de ${season === 'verano' ? 'Verano' : 'Invierno'} guardado correctamente`);
    } catch (error) {
      toast.error('Error al guardar el menú');
      console.error(error);
    }
  };

  const handleDelete = async (season: 'verano' | 'invierno') => {
    const menu = menus?.find(m => m.season === season);
    if (!menu) {
      toast.error('No existe un menú para esta temporada');
      return;
    }

    if (!confirm(`¿Estás seguro de eliminar el menú de ${season === 'verano' ? 'Verano' : 'Invierno'}?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({ menuId: menu.id, residenceId });
      toast.success(`Menú de ${season === 'verano' ? 'Verano' : 'Invierno'} eliminado`);
    } catch (error) {
      toast.error('Error al eliminar el menú');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Cargando menús...</div>;
  }

  const renderMenuEditor = (
    season: 'verano' | 'invierno',
    nota: string,
    setNota: (v: string) => void,
    menuData: MenuData
  ) => {
    const existingMenu = menus?.find(m => m.season === season);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {season === 'verano' ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Snowflake className="h-5 w-5 text-blue-500" />
            )}
            <h3 className="text-lg font-semibold">
              Menú de {season === 'verano' ? 'Verano' : 'Invierno'}
            </h3>
          </div>
          <div className="flex gap-2">
            {existingMenu && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(season)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </Button>
            )}
            <Button
              onClick={() => handleSave(season)}
              disabled={upsertMutation.isPending}
            >
              <Save className="w-4 h-4 mr-1" />
              Guardar
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Nota (ej: "MENÚ APTO PARA DIABÉTICOS E HIPERTENSOS")</Label>
          <Input
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Ingresa una nota opcional para mostrar arriba del menú"
          />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold w-24 sticky left-0 bg-muted/50 z-10">
                    Comida
                  </TableHead>
                  {DIAS.map((dia) => (
                    <TableHead key={dia} className="font-bold text-center min-w-[200px]">
                      {dia}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMIDAS.map((comida) => (
                  <TableRow key={comida}>
                    <TableCell className="font-semibold sticky left-0 bg-background z-10 border-r">
                      {comida}
                    </TableCell>
                    {DIAS.map((dia) => (
                      <TableCell key={dia} className="p-1">
                        <Textarea
                          value={menuData.comidas[comida]?.[dia] || ''}
                          onChange={(e) => handleCellChange(season, comida, dia, e.target.value)}
                          className="min-h-[80px] text-sm resize-none"
                          placeholder={`${comida} del ${dia}`}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {existingMenu && (
          <p className="text-xs text-muted-foreground">
            Última actualización: {new Date(existingMenu.updated_at).toLocaleString('es-UY')}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Menús de Temporada</h2>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p>Aquí puedes gestionar los menús de temporada de esta residencia.</p>
          <p>Los menús se mostrarán en la ficha pública de la residencia con tabs para Verano e Invierno.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'verano' | 'invierno')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invierno" className="gap-2">
            <Snowflake className="h-4 w-4" />
            Menú de Invierno
          </TabsTrigger>
          <TabsTrigger value="verano" className="gap-2">
            <Sun className="h-4 w-4" />
            Menú de Verano
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invierno" className="mt-6">
          {renderMenuEditor('invierno', inviernoNota, setInviernoNota, inviernoData)}
        </TabsContent>

        <TabsContent value="verano" className="mt-6">
          {renderMenuEditor('verano', veranoNota, setVeranoNota, veranoData)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
