import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUploader } from "@/components/ImageUploader";
import { GalleryUploader } from "@/components/GalleryUploader";
import { ConveniosAdmin } from "@/components/admin/ConveniosAdmin";
import { TeamAdmin } from "@/components/admin/TeamAdmin";
import { CommissionsAdmin } from "@/components/admin/CommissionsAdmin";
import { MultiValueInput } from "@/components/admin/MultiValueInput";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  LogOut, 
  Building2, 
  Save, 
  Plus, 
  Trash2,
  Users,
  Image as ImageIcon,
  ChevronLeft,
  Handshake,
  Wrench,
  Star,
  Scale
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Residence = Tables<"residences">;
type Director = Tables<"residence_directors">;

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, signOut, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Residence>>({});
  const [activeSection, setActiveSection] = useState<'residencias' | 'convenios' | 'equipo' | 'comisiones'>('residencias');

  // Fetch residences directly from DB
  const { data: residences, isLoading: residencesLoading, refetch } = useQuery({
    queryKey: ['admin-residences'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('residences')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Residence[];
    },
    enabled: isAdmin === true,
  });

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/admin-login");
        return;
      }
      
      const { data } = await supabase.rpc('has_role', { 
        _user_id: user.id, 
        _role: 'admin' 
      });
      
      if (!data) {
        toast.error("No tienes permisos de administrador");
        await signOut();
        navigate("/admin-login");
        return;
      }
      
      setIsAdmin(true);
    };
    
    if (!loading) {
      checkAdmin();
    }
  }, [user, loading, navigate, signOut]);

  useEffect(() => {
    if (selectedResidence) {
      setFormData(selectedResidence);
      fetchDirectors(selectedResidence.id);
    }
  }, [selectedResidence]);

  const fetchDirectors = async (residenceId: string) => {
    const { data, error } = await supabase
      .from('residence_directors')
      .select('*')
      .eq('residence_id', residenceId)
      .order('display_order');
    
    if (!error && data) {
      setDirectors(data);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/admin-login");
  };

  const handleSave = async () => {
    if (!selectedResidence) return;
    
    setIsSaving(true);
    
    let updatedFormData = { ...formData };
    
    // Auto-geocode if address changed
    if (formData.address !== selectedResidence.address || 
        formData.city !== selectedResidence.city || 
        formData.province !== selectedResidence.province) {
      try {
        toast.info("Obteniendo coordenadas de la dirección...");
        const { data, error: geocodeError } = await supabase.functions.invoke('geocode-address', {
          body: {
            address: formData.address,
            city: formData.city,
            province: formData.province
          }
        });
        
        if (geocodeError) {
          console.error('Geocode error:', geocodeError);
          toast.warning("No se pudieron obtener las coordenadas automáticamente");
        } else if (data?.lat && data?.lng) {
          updatedFormData.coordinates_lat = data.lat;
          updatedFormData.coordinates_lng = data.lng;
          toast.success("Coordenadas actualizadas automáticamente");
        }
      } catch (err) {
        console.error('Geocode fetch error:', err);
      }
    }
    
    const { error } = await supabase
      .from('residences')
      .update(updatedFormData)
      .eq('id', selectedResidence.id);
    
    if (error) {
      toast.error("Error al guardar: " + error.message);
    } else {
      toast.success("Residencia actualizada correctamente");
      refetch();
      queryClient.invalidateQueries({ queryKey: ['residences'] });
    }
    
    setIsSaving(false);
  };

  const handleLogoUpload = async (url: string) => {
    setFormData(prev => ({ ...prev, logo_url: url }));
  };

  const handleMainImageUpload = async (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
  };

  const handleGalleryChange = async (urls: string[]) => {
    setFormData(prev => ({ ...prev, images: urls }));
  };

  const handleAddDirector = async () => {
    if (!selectedResidence) return;
    
    const { data, error } = await supabase
      .from('residence_directors')
      .insert({
        residence_id: selectedResidence.id,
        name: 'Nuevo Director',
        role: 'Director/a',
        display_order: directors.length
      })
      .select()
      .single();
    
    if (error) {
      toast.error("Error al agregar director");
    } else if (data) {
      setDirectors([...directors, data]);
    }
  };

  const handleUpdateDirector = async (id: string, field: keyof Director, value: string) => {
    setDirectors(prev => 
      prev.map(d => d.id === id ? { ...d, [field]: value } : d)
    );
  };

  const handleSaveDirector = async (director: Director) => {
    const { error } = await supabase
      .from('residence_directors')
      .update({
        name: director.name,
        role: director.role,
        photo_url: director.photo_url
      })
      .eq('id', director.id);
    
    if (error) {
      toast.error("Error al guardar director");
    } else {
      toast.success("Director actualizado");
    }
  };

  const handleDeleteDirector = async (id: string) => {
    const { error } = await supabase
      .from('residence_directors')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast.error("Error al eliminar director");
    } else {
      setDirectors(prev => prev.filter(d => d.id !== id));
      toast.success("Director eliminado");
    }
  };

  const handleDirectorPhotoUpload = async (directorId: string, url: string) => {
    setDirectors(prev => 
      prev.map(d => d.id === directorId ? { ...d, photo_url: url } : d)
    );
  };

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">Panel de Administración</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Main Section Tabs */}
        <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as 'residencias' | 'convenios' | 'equipo' | 'comisiones')} className="mb-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="residencias" className="gap-2">
              <Building2 className="w-4 h-4" />
              Residencias
            </TabsTrigger>
            <TabsTrigger value="convenios" className="gap-2">
              <Handshake className="w-4 h-4" />
              Convenios
            </TabsTrigger>
            <TabsTrigger value="equipo" className="gap-2">
              <Users className="w-4 h-4" />
              Directiva
            </TabsTrigger>
            <TabsTrigger value="comisiones" className="gap-2">
              <Scale className="w-4 h-4" />
              Comisiones
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeSection === 'residencias' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lista de Residencias */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Residencias</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-350px)]">
                {residencesLoading ? (
                  <div className="p-4 text-center text-muted-foreground">Cargando...</div>
                ) : (
                  <div className="space-y-1 p-2">
                    {residences?.map((residence) => (
                      <button
                        key={residence.id}
                        onClick={() => setSelectedResidence(residence)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedResidence?.id === residence.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <div className="font-medium truncate">{residence.name}</div>
                        <div className={`text-sm truncate ${
                          selectedResidence?.id === residence.id
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground'
                        }`}>
                          {residence.city}, {residence.province}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Content - Editor */}
          <div className="lg:col-span-3">
            {selectedResidence ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setSelectedResidence(null)}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <CardTitle>{formData.name}</CardTitle>
                  </div>
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info">
                    <TabsList className="mb-6 flex-wrap h-auto gap-1">
                      <TabsTrigger value="info">
                        <Building2 className="w-4 h-4 mr-2" />
                        Información
                      </TabsTrigger>
                      <TabsTrigger value="images">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Imágenes
                      </TabsTrigger>
                      <TabsTrigger value="services">
                        <Wrench className="w-4 h-4 mr-2" />
                        Servicios
                      </TabsTrigger>
                      <TabsTrigger value="activities">
                        <Star className="w-4 h-4 mr-2" />
                        Actividades
                      </TabsTrigger>
                      <TabsTrigger value="team">
                        <Users className="w-4 h-4 mr-2" />
                        Equipo
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nombre</Label>
                          <Input
                            value={formData.name || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo</Label>
                          <Input
                            value={formData.type || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Ciudad</Label>
                          <Input
                            value={formData.city || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Provincia</Label>
                          <Input
                            value={formData.province || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Dirección (las coordenadas del mapa se actualizan automáticamente)</Label>
                          <Input
                            value={formData.address || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Teléfono principal</Label>
                          <Input
                            value={formData.phone || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            value={formData.email || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Sitio Web</Label>
                          <Input
                            value={formData.website || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>WhatsApp principal</Label>
                          <Input
                            value={formData.whatsapp || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Capacidad</Label>
                          <Input
                            type="number"
                            value={formData.capacity || 0}
                            onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Rango de Precios</Label>
                          <Input
                            value={formData.price_range || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, price_range: e.target.value }))}
                          />
                        </div>
                      </div>

                      {/* Multi-value fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <MultiValueInput
                          label="Teléfonos adicionales"
                          values={formData.phones || []}
                          onChange={(phones) => setFormData(prev => ({ ...prev, phones }))}
                          placeholder="Agregar teléfono adicional"
                        />
                        <MultiValueInput
                          label="WhatsApps adicionales"
                          values={formData.whatsapps || []}
                          onChange={(whatsapps) => setFormData(prev => ({ ...prev, whatsapps }))}
                          placeholder="Agregar WhatsApp adicional"
                        />
                        <MultiValueInput
                          label="Direcciones adicionales"
                          values={formData.addresses || []}
                          onChange={(addresses) => setFormData(prev => ({ ...prev, addresses }))}
                          placeholder="Agregar dirección adicional"
                        />
                        <MultiValueInput
                          label="Ciudades adicionales"
                          values={formData.cities || []}
                          onChange={(cities) => setFormData(prev => ({ ...prev, cities }))}
                          placeholder="Agregar ciudad adicional"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea
                          rows={5}
                          value={formData.description || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="images" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">Logo</Label>
                          <ImageUploader
                            bucket="residence-logos"
                            folder={selectedResidence.id}
                            currentImage={formData.logo_url}
                            onUpload={handleLogoUpload}
                            aspectRatio="square"
                          />
                        </div>
                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">Imagen Principal</Label>
                          <ImageUploader
                            bucket="residence-images"
                            folder={selectedResidence.id}
                            currentImage={formData.image}
                            onUpload={handleMainImageUpload}
                            aspectRatio="landscape"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Galería de Imágenes</Label>
                        <GalleryUploader
                          folder={selectedResidence.id}
                          images={formData.images || []}
                          onChange={handleGalleryChange}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="services" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-lg font-semibold">Servicios Disponibles</Label>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              const currentServices = formData.services || [];
                              setFormData(prev => ({ 
                                ...prev, 
                                services: [...currentServices, 'Nuevo servicio'] 
                              }));
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Servicio
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(formData.services || []).map((service, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Input
                                value={service}
                                onChange={(e) => {
                                  const newServices = [...(formData.services || [])];
                                  newServices[idx] = e.target.value;
                                  setFormData(prev => ({ ...prev, services: newServices }));
                                }}
                                placeholder="Nombre del servicio"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newServices = (formData.services || []).filter((_, i) => i !== idx);
                                  setFormData(prev => ({ ...prev, services: newServices }));
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                          {(!formData.services || formData.services.length === 0) && (
                            <p className="text-muted-foreground text-sm italic">No hay servicios agregados. Haz clic en "Agregar Servicio" para añadir uno.</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-lg font-semibold">Instalaciones</Label>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              const currentFacilities = formData.facilities || [];
                              setFormData(prev => ({ 
                                ...prev, 
                                facilities: [...currentFacilities, 'Nueva instalación'] 
                              }));
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Instalación
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(formData.facilities || []).map((facility, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Input
                                value={facility}
                                onChange={(e) => {
                                  const newFacilities = [...(formData.facilities || [])];
                                  newFacilities[idx] = e.target.value;
                                  setFormData(prev => ({ ...prev, facilities: newFacilities }));
                                }}
                                placeholder="Nombre de la instalación"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newFacilities = (formData.facilities || []).filter((_, i) => i !== idx);
                                  setFormData(prev => ({ ...prev, facilities: newFacilities }));
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                          {(!formData.facilities || formData.facilities.length === 0) && (
                            <p className="text-muted-foreground text-sm italic">No hay instalaciones agregadas. Haz clic en "Agregar Instalación" para añadir una.</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="activities" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-lg font-semibold">Actividades</Label>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              const currentActivities = formData.activities || [];
                              setFormData(prev => ({ 
                                ...prev, 
                                activities: [...currentActivities, 'Nueva actividad'] 
                              }));
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Actividad
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {(formData.activities || []).map((activity, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Input
                                value={activity}
                                onChange={(e) => {
                                  const newActivities = [...(formData.activities || [])];
                                  newActivities[idx] = e.target.value;
                                  setFormData(prev => ({ ...prev, activities: newActivities }));
                                }}
                                placeholder="Nombre de la actividad"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newActivities = (formData.activities || []).filter((_, i) => i !== idx);
                                  setFormData(prev => ({ ...prev, activities: newActivities }));
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          ))}
                          {(!formData.activities || formData.activities.length === 0) && (
                            <p className="text-muted-foreground text-sm italic">No hay actividades agregadas. Haz clic en "Agregar Actividad" para añadir una.</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="team" className="space-y-6">
                      <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">Equipo Directivo</Label>
                        <Button onClick={handleAddDirector} variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar Director
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {directors.map((director) => (
                          <Card key={director.id}>
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-32 flex-shrink-0">
                                  <ImageUploader
                                    bucket="director-photos"
                                    folder={`${selectedResidence.id}/${director.id}`}
                                    currentImage={director.photo_url}
                                    onUpload={(url) => handleDirectorPhotoUpload(director.id, url)}
                                    aspectRatio="square"
                                  />
                                </div>
                                <div className="flex-1 space-y-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                      <Label>Nombre</Label>
                                      <Input
                                        value={director.name}
                                        onChange={(e) => handleUpdateDirector(director.id, 'name', e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label>Cargo</Label>
                                      <Input
                                        value={director.role}
                                        onChange={(e) => handleUpdateDirector(director.id, 'role', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleSaveDirector(director)}
                                    >
                                      <Save className="w-4 h-4 mr-2" />
                                      Guardar
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleDeleteDirector(director.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Eliminar
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {directors.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            No hay directores agregados. Haz clic en "Agregar Director" para comenzar.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Selecciona una residencia para editar</p>
                </div>
              </Card>
            )}
          </div>
        </div>
        ) : activeSection === 'convenios' ? (
          <ConveniosAdmin />
        ) : activeSection === 'comisiones' ? (
          <CommissionsAdmin />
        ) : (
          <TeamAdmin />
        )}
      </div>
    </div>
  );
};

export default Admin;
