import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUploader } from "@/components/ImageUploader";
import { useAdminConvenios, Convenio } from "@/hooks/useConvenios";
import { toast } from "sonner";
import { 
  Plus, 
  Save, 
  Trash2, 
  Handshake,
  ChevronLeft,
  GripVertical
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ConveniosAdmin = () => {
  const { convenios, isLoading, createConvenio, updateConvenio, deleteConvenio } = useAdminConvenios();
  const [selectedConvenio, setSelectedConvenio] = useState<Convenio | null>(null);
  const [formData, setFormData] = useState<Partial<Convenio>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectConvenio = (convenio: Convenio) => {
    setSelectedConvenio(convenio);
    setFormData(convenio);
  };

  const handleCreateNew = async () => {
    try {
      const newConvenio = await createConvenio.mutateAsync({
        name: "Nuevo Convenio",
        main_benefit: "Beneficio principal",
        display_order: (convenios?.length || 0) + 1,
        is_active: true,
      });
      setSelectedConvenio(newConvenio);
      setFormData(newConvenio);
      toast.success("Convenio creado");
    } catch (error) {
      toast.error("Error al crear convenio");
    }
  };

  const handleSave = async () => {
    if (!selectedConvenio) return;
    
    setIsSaving(true);
    try {
      await updateConvenio.mutateAsync({
        id: selectedConvenio.id,
        ...formData,
      });
      toast.success("Convenio actualizado");
    } catch (error) {
      toast.error("Error al guardar convenio");
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!selectedConvenio) return;
    
    if (!confirm("¿Estás seguro de eliminar este convenio?")) return;
    
    try {
      await deleteConvenio.mutateAsync(selectedConvenio.id);
      setSelectedConvenio(null);
      setFormData({});
      toast.success("Convenio eliminado");
    } catch (error) {
      toast.error("Error al eliminar convenio");
    }
  };

  const handleLogoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, logo_url: url }));
  };

  const handleSecondaryLogoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, secondary_logo_url: url }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar - Lista de Convenios */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg">Convenios</CardTitle>
          <Button size="sm" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-1" />
            Nuevo
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-350px)]">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Cargando...</div>
            ) : (
              <div className="space-y-1 p-2">
                {convenios?.map((convenio) => (
                  <button
                    key={convenio.id}
                    onClick={() => handleSelectConvenio(convenio)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedConvenio?.id === convenio.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <GripVertical className="w-4 h-4 opacity-50 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{convenio.name}</div>
                      <div className={`text-sm truncate ${
                        selectedConvenio?.id === convenio.id
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}>
                        {convenio.is_active ? "Activo" : "Inactivo"}
                      </div>
                    </div>
                  </button>
                ))}
                {(!convenios || convenios.length === 0) && (
                  <div className="p-4 text-center text-muted-foreground">
                    No hay convenios. Crea uno nuevo.
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Content - Editor */}
      <div className="lg:col-span-3">
        {selectedConvenio ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSelectedConvenio(null)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <CardTitle>{formData.name || "Nuevo Convenio"}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre del Convenio</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Tienda Inglesa"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Orden de visualización</Label>
                  <Input
                    type="number"
                    value={formData.display_order || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              {/* Main Benefit */}
              <div className="space-y-2">
                <Label>Beneficio Principal (destacado)</Label>
                <Input
                  value={formData.main_benefit || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, main_benefit: e.target.value }))}
                  placeholder="Ej: 10% de descuento en todos los productos"
                />
              </div>

              {/* Details */}
              <div className="space-y-2">
                <Label>Descripción breve</Label>
                <Textarea
                  rows={2}
                  value={formData.details || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  placeholder="Ej: Descuento directo en compras."
                />
              </div>

              {/* Conditions */}
              <div className="space-y-2">
                <Label>Condiciones</Label>
                <Textarea
                  rows={2}
                  value={formData.conditions || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                  placeholder="Ej: Aplicable con la tarjeta provista por Integra."
                />
              </div>

              {/* CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Texto del botón</Label>
                  <Input
                    value={formData.cta_label || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta_label: e.target.value }))}
                    placeholder="Ej: Consultar"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link del botón</Label>
                  <Input
                    value={formData.cta_link || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta_link: e.target.value }))}
                    placeholder="Ej: /contacto"
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_active ?? true}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label>Convenio activo (visible en la web)</Label>
              </div>

              {/* Logos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Logo Principal</Label>
                  <ImageUploader
                    bucket="convenio-logos"
                    folder={selectedConvenio.id}
                    currentImage={formData.logo_url}
                    onUpload={handleLogoUpload}
                    aspectRatio="square"
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Logo Secundario (opcional)</Label>
                  <ImageUploader
                    bucket="convenio-logos"
                    folder={`${selectedConvenio.id}/secondary`}
                    currentImage={formData.secondary_logo_url}
                    onUpload={handleSecondaryLogoUpload}
                    aspectRatio="square"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center min-h-[400px]">
            <div className="text-center text-muted-foreground">
              <Handshake className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Selecciona un convenio para editar</p>
              <p className="text-sm mt-2">o crea uno nuevo con el botón "Nuevo"</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
