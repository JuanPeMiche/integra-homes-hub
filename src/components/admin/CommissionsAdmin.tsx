import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, User, Scale, Users } from "lucide-react";
import { useAdminCommissions, CommissionMember } from "@/hooks/useCommissions";

export const CommissionsAdmin = () => {
  const { commissionMembers, isLoading, createMember, updateMember, deleteMember } = useAdminCommissions();
  const [activeCommission, setActiveCommission] = useState<'fiscal' | 'etica'>('fiscal');
  const [editingMember, setEditingMember] = useState<CommissionMember | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '' });

  const filteredMembers = commissionMembers?.filter(m => m.commission_type === activeCommission) || [];

  const handleAddMember = async () => {
    const order = filteredMembers.length;
    await createMember.mutateAsync({
      commission_type: activeCommission,
      name: 'Nuevo miembro',
      display_order: order
    });
  };

  const handleSelectMember = (member: CommissionMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, role: member.role || '' });
  };

  const handleSave = async () => {
    if (!editingMember) return;
    await updateMember.mutateAsync({
      id: editingMember.id,
      name: formData.name,
      role: formData.role || null,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este miembro?')) {
      await deleteMember.mutateAsync(id);
      if (editingMember?.id === id) {
        setEditingMember(null);
      }
    }
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
        <CardHeader>
          <CardTitle className="text-lg">Comisiones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeCommission} onValueChange={(v) => {
            setActiveCommission(v as 'fiscal' | 'etica');
            setEditingMember(null);
          }}>
            <TabsList className="w-full grid grid-cols-2 m-2">
              <TabsTrigger value="fiscal" className="gap-1">
                <Scale className="h-4 w-4" />
                Fiscal
              </TabsTrigger>
              <TabsTrigger value="etica" className="gap-1">
                <Users className="h-4 w-4" />
                Ética
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-1 p-2">
              {filteredMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => handleSelectMember(member)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    editingMember?.id === member.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{member.name}</div>
                    {member.role && (
                      <div className={`text-sm truncate ${
                        editingMember?.id === member.id
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}>
                        {member.role}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-2 border-t">
            <Button onClick={handleAddMember} className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Miembro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingMember ? 'Editar Miembro' : 'Selecciona un miembro'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingMember ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre del miembro"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rol (opcional)</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Ej: Presidente, Secretario..."
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={updateMember.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(editingMember.id)}
                  disabled={deleteMember.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Selecciona un miembro para editar</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
