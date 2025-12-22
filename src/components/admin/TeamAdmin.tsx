import { useState } from "react";
import { useAdminTeamMembers, TeamMember } from "@/hooks/useTeamMembers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/ImageUploader";
import { Plus, Trash2, Save, User } from "lucide-react";

export const TeamAdmin = () => {
  const { teamMembers, isLoading, createMember, updateMember, deleteMember } = useAdminTeamMembers();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});

  const handleAddMember = async () => {
    await createMember.mutateAsync({
      name: "Nuevo miembro",
      role: "Cargo",
      display_order: (teamMembers?.length || 0) + 1,
    });
  };

  const handleSelectMember = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(member);
  };

  const handleSave = async () => {
    if (!editingMember) return;
    
    await updateMember.mutateAsync({
      id: editingMember.id,
      name: formData.name,
      role: formData.role,
      photo_url: formData.photo_url,
      display_order: formData.display_order,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este miembro?")) {
      await deleteMember.mutateAsync(id);
      if (editingMember?.id === id) {
        setEditingMember(null);
        setFormData({});
      }
    }
  };

  const handlePhotoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, photo_url: url }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de miembros */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Directiva</CardTitle>
          <Button size="sm" onClick={handleAddMember} disabled={createMember.isPending}>
            <Plus className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {teamMembers?.map((member) => (
            <div
              key={member.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                editingMember?.id === member.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
              onClick={() => handleSelectMember(member)}
            >
              {member.photo_url ? (
                <img 
                  src={member.photo_url} 
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{member.name}</p>
                <p className={`text-sm truncate ${
                  editingMember?.id === member.id
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                }`}>
                  {member.role}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(member.id);
                }}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          
          {(!teamMembers || teamMembers.length === 0) && (
            <p className="text-center text-muted-foreground py-8">
              No hay miembros de la directiva
            </p>
          )}
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            {editingMember ? "Editar miembro" : "Selecciona un miembro"}
          </CardTitle>
          {editingMember && (
            <Button onClick={handleSave} disabled={updateMember.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {updateMember.isPending ? "Guardando..." : "Guardar"}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {editingMember ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-40">
                  <Label className="text-center block mb-2">Foto</Label>
                  <ImageUploader
                    bucket="team-photos"
                    folder="directiva"
                    currentImage={formData.photo_url}
                    onUpload={handlePhotoUpload}
                    aspectRatio="square"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre completo</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre del miembro"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <Input
                    value={formData.role || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Ej: Presidente, Tesorero..."
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
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <User className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Selecciona un miembro de la lista para editarlo</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
