import { useState, useEffect, useRef, useCallback } from "react";
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
import { VideoUploader } from "@/components/VideoUploader";
import { YouTubeLinkInput } from "@/components/YouTubeLinkInput";
import { ConveniosAdmin } from "@/components/admin/ConveniosAdmin";
import { TeamAdmin } from "@/components/admin/TeamAdmin";
import { CommissionsAdmin } from "@/components/admin/CommissionsAdmin";
import { NewsAdmin } from "@/components/admin/NewsAdmin";
import { MultiValueInput } from "@/components/admin/MultiValueInput";
import { MenusAdmin } from "@/components/admin/MenusAdmin";
import { UnsavedChangesIndicator } from "@/components/admin/UnsavedChangesIndicator";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { validateAndNormalizePhones } from "@/utils/phoneValidation";
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
  Scale,
  Video,
  Newspaper,
  Upload,
  Youtube,
  UtensilsCrossed,
  UserCheck
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
  const [activeSection, setActiveSection] = useState<'residencias' | 'convenios' | 'equipo' | 'comisiones' | 'noticias'>('residencias');
  const [autosaveEnabled, setAutosaveEnabled] = useState(false);

  // Refs para evitar perder el último valor escrito (p.ej. click en "Guardar" sin apretar "+")
  const phonesRef = useRef<string[]>([]);
  const whatsappsRef = useRef<string[]>([]);
  const addressesRef = useRef<string[]>([]);
  const citiesRef = useRef<string[]>([]);
  const emailsRef = useRef<string[]>([]);
  const staffRatioRef = useRef<{ ratio: string; description: string; categories: string[] } | null>(null);


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
    if (!selectedResidence) return;

    const phones = Array.isArray(selectedResidence.phones) ? selectedResidence.phones : [];
    const whatsapps = Array.isArray(selectedResidence.whatsapps) ? selectedResidence.whatsapps : [];
    const addresses = Array.isArray(selectedResidence.addresses) ? selectedResidence.addresses : [];
    const cities = Array.isArray(selectedResidence.cities) ? selectedResidence.cities : [];
    const emails = Array.isArray((selectedResidence as any).emails) ? (selectedResidence as any).emails : [];
    const staffRatio = (selectedResidence as any).staff_ratio || null;

    phonesRef.current = phones;
    whatsappsRef.current = whatsapps;
    addressesRef.current = addresses;
    citiesRef.current = cities;
    emailsRef.current = emails;
    staffRatioRef.current = staffRatio;

    setFormData({
      ...selectedResidence,
      phones,
      whatsapps,
      addresses,
      cities,
      emails,
      staff_ratio: staffRatio,
    });

    fetchDirectors(selectedResidence.id);
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

  // Unsaved changes detection
  const handleAutoSave = useCallback(async () => {
    if (!selectedResidence || isSaving) return;
    await handleSaveInternal(true);
  }, [selectedResidence, isSaving]);

  const { hasChanges, resetChanges } = useUnsavedChanges({
    initialData: selectedResidence,
    formData: formData as Residence,
    autosaveEnabled,
    autosaveDelay: 30000,
    onAutoSave: handleAutoSave,
  });

  const handleSaveInternal = async (isAutoSave = false) => {
    if (!selectedResidence) return;

    setIsSaving(true);

    let updatedFormData = { ...formData };

    // Asegura que se guarde el último estado de los campos multi-valor
    // Normalizar y eliminar duplicados de teléfonos y whatsapps
    const phonesResult = validateAndNormalizePhones(phonesRef.current, {
      removeInvalid: false,
      normalize: true,
      removeDuplicates: true,
    });
    const whatsappsResult = validateAndNormalizePhones(whatsappsRef.current, {
      removeInvalid: false,
      normalize: true,
      removeDuplicates: true,
    });

    // Mostrar advertencias si hay duplicados
    if (!isAutoSave) {
      if (phonesResult.duplicates.length > 0) {
        toast.warning(`Se eliminaron ${phonesResult.duplicates.length} teléfono(s) duplicado(s)`);
      }
      if (whatsappsResult.duplicates.length > 0) {
        toast.warning(`Se eliminaron ${whatsappsResult.duplicates.length} WhatsApp(s) duplicado(s)`);
      }
    }

    updatedFormData.phones = phonesResult.valid;
    updatedFormData.whatsapps = whatsappsResult.valid;
    updatedFormData.addresses = addressesRef.current;
    updatedFormData.cities = citiesRef.current;
    (updatedFormData as any).emails = emailsRef.current;
    
    // Guardar staff_ratio - limpiar si está vacío
    const currentStaffRatio = staffRatioRef.current;
    if (currentStaffRatio && currentStaffRatio.ratio && currentStaffRatio.ratio.trim() !== '') {
      (updatedFormData as any).staff_ratio = {
        ratio: currentStaffRatio.ratio.trim(),
        description: currentStaffRatio.description?.trim() || '',
        categories: (currentStaffRatio.categories || []).filter(c => c.trim() !== ''),
      };
    } else {
      (updatedFormData as any).staff_ratio = null;
    }

    // Auto-geocode if address changed
    if (
      formData.address !== selectedResidence.address ||
      formData.city !== selectedResidence.city ||
      formData.province !== selectedResidence.province
    ) {
      try {
        if (!isAutoSave) toast.info("Obteniendo coordenadas de la dirección...");
        const { data, error: geocodeError } = await supabase.functions.invoke("geocode-address", {
          body: {
            address: formData.address,
            city: formData.city,
            province: formData.province,
          },
        });

        if (geocodeError) {
          console.error("Geocode error:", geocodeError);
          if (!isAutoSave) toast.warning("No se pudieron obtener las coordenadas automáticamente");
        } else if (data?.lat && data?.lng) {
          updatedFormData.coordinates_lat = data.lat;
          updatedFormData.coordinates_lng = data.lng;
          if (!isAutoSave) toast.success("Coordenadas actualizadas automáticamente");
        }
      } catch (err) {
        console.error("Geocode fetch error:", err);
      }
    }

    const { error } = await supabase.from("residences").update(updatedFormData).eq("id", selectedResidence.id);

    if (error) {
      if (!isAutoSave) toast.error("Error al guardar: " + error.message);
    } else {
      if (!isAutoSave) toast.success("Residencia actualizada correctamente");
      resetChanges();
      refetch();
      queryClient.invalidateQueries({ queryKey: ["residences"] });
    }

    setIsSaving(false);
  };

  const handleSave = () => handleSaveInternal(false);

  // Valid residence types according to database constraint
  const RESIDENCE_TYPES = ['publica', 'privada', 'concertada'] as const;
  const RESIDENCE_TYPE_LABELS: Record<string, string> = {
    'publica': 'Pública',
    'privada': 'Privada',
    'concertada': 'Concertada',
  };

  const handleCreateResidence = async () => {
    try {
      const { data, error } = await supabase
        .from('residences')
        .insert({
          name: 'Nueva Residencia',
          type: 'privada', // Default valid type
          city: 'Ciudad',
          province: 'Departamento',
          address: 'Dirección',
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating residence:', error);
        if (error.message.includes('residences_type_check')) {
          throw new Error('Tipo de residencia inválido. Los valores permitidos son: Pública, Privada, Concertada.');
        }
        throw error;
      }
      
      toast.success("Residencia creada");
      refetch();
      if (data) {
        setSelectedResidence(data);
        setFormData(data);
      }
    } catch (error: any) {
      toast.error("Error al crear residencia: " + error.message);
      console.error('Create residence payload failed:', error);
    }
  };

  const handleDeleteResidence = async () => {
    if (!selectedResidence) return;
    
    if (!confirm(`¿Estás seguro de eliminar "${selectedResidence.name}"? Esta acción no se puede deshacer.`)) return;
    
    try {
      // First delete associated directors
      await supabase
        .from('residence_directors')
        .delete()
        .eq('residence_id', selectedResidence.id);
      
      // Then delete the residence
      const { error } = await supabase
        .from('residences')
        .delete()
        .eq('id', selectedResidence.id);
      
      if (error) throw error;
      
      toast.success("Residencia eliminada");
      setSelectedResidence(null);
      setFormData({});
      refetch();
      queryClient.invalidateQueries({ queryKey: ['residences'] });
    } catch (error: any) {
      toast.error("Error al eliminar residencia: " + error.message);
    }
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
        <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as 'residencias' | 'convenios' | 'equipo' | 'comisiones' | 'noticias')} className="mb-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
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
            <TabsTrigger value="noticias" className="gap-2">
              <Newspaper className="w-4 h-4" />
              Noticias
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeSection === 'residencias' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lista de Residencias */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Residencias</CardTitle>
              <Button size="sm" onClick={handleCreateResidence}>
                <Plus className="w-4 h-4 mr-1" />
                Nueva
              </Button>
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
                  <div className="flex items-center gap-4">
                    <UnsavedChangesIndicator
                      hasChanges={hasChanges}
                      isSaving={isSaving}
                      autosaveEnabled={autosaveEnabled}
                      onAutosaveToggle={setAutosaveEnabled}
                      showAutosaveToggle={true}
                    />
                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm" onClick={handleDeleteResidence}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                      <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Guardando..." : "Guardar Cambios"}
                      </Button>
                    </div>
                  </div>
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
                      <TabsTrigger value="menus">
                        <UtensilsCrossed className="w-4 h-4 mr-2" />
                        Menús
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
                          <select
                            value={formData.type || 'privada'}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {RESIDENCE_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {RESIDENCE_TYPE_LABELS[type]}
                              </option>
                            ))}
                          </select>
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
                        <div className="space-y-2 md:col-span-2">
                          <MultiValueInput
                            key={`emails-${selectedResidence.id}`}
                            label="Emails de contacto"
                            values={Array.isArray((formData as any).emails) ? (formData as any).emails : []}
                            onChange={(newValues) => {
                              emailsRef.current = newValues;
                              setFormData((prev) => ({ ...prev, emails: newValues }));
                            }}
                            placeholder="Agregar email"
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
                        {/* Índice de Transparencia */}
                        <div className="space-y-4 pt-4 border-t">
                          <Label className="text-lg font-semibold flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary" />
                            Índice de Transparencia
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Selecciona la cantidad de estrellas según el nivel de transparencia de la residencia.
                          </p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, transparency: star }))}
                                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                              >
                                <Star 
                                  className={`w-8 h-8 transition-colors ${
                                    star <= (formData.transparency || 0)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-muted-foreground/30'
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="ml-3 text-sm text-muted-foreground">
                              {formData.transparency || 0} de 5 estrellas
                            </span>
                            {(formData.transparency || 0) > 0 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2 text-xs"
                                onClick={() => setFormData(prev => ({ ...prev, transparency: 0 }))}
                              >
                                Quitar
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Habilitaciones */}
                        <div className="space-y-4 pt-4 border-t">
                          <Label className="text-lg font-semibold flex items-center gap-2">
                            <Scale className="w-5 h-5 text-primary" />
                            Habilitaciones
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>MSP</Label>
                              <select
                                value={(formData as any).msp_certification || 'Habilitado'}
                                onChange={(e) => setFormData(prev => ({ ...prev, msp_certification: e.target.value }))}
                                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                              >
                                <option value="Habilitado">Habilitado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="En trámite">En trámite</option>
                                <option value="No aplica">No aplica</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label>MIDES</Label>
                              <select
                                value={(formData as any).mides_certification || 'Habilitado'}
                                onChange={(e) => setFormData(prev => ({ ...prev, mides_certification: e.target.value }))}
                                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                              >
                                <option value="Habilitado">Habilitado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="En trámite">En trámite</option>
                                <option value="No aplica">No aplica</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label>Bomberos</Label>
                              <select
                                value={(formData as any).fire_certification || 'Habilitado'}
                                onChange={(e) => setFormData(prev => ({ ...prev, fire_certification: e.target.value }))}
                                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                              >
                                <option value="Habilitado">Habilitado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="En trámite">En trámite</option>
                                <option value="No aplica">No aplica</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visibility Toggle */}
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                        <input
                          type="checkbox"
                          id="is_hidden"
                          checked={(formData as any).is_hidden || false}
                          onChange={(e) => setFormData(prev => ({ ...prev, is_hidden: e.target.checked }))}
                          className="h-5 w-5 rounded border-border"
                        />
                        <div>
                          <Label htmlFor="is_hidden" className="cursor-pointer font-medium">Ocultar residencia</Label>
                          <p className="text-sm text-muted-foreground">
                            Si está marcado, esta residencia no aparecerá en los listados públicos.
                          </p>
                        </div>
                      </div>

                      {/* Secondary location section */}
                      <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-primary" />
                          <Label className="text-lg font-semibold">Sede Adicional / Sucursal</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Si esta residencia tiene más de una sede, completá los datos adicionales aquí.
                        </p>
                        
                        <div className="space-y-2">
                          <Label>Nombre de la sede adicional</Label>
                          <Input
                            value={(formData as any).secondary_name || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, secondary_name: e.target.value }))}
                            placeholder="Ej: Sede Pocitos, Sucursal Centro, etc."
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <MultiValueInput
                            key={`phones-${selectedResidence.id}`}
                            label="Teléfonos adicionales"
                            values={Array.isArray(formData.phones) ? formData.phones : []}
                            onChange={(newValues) => {
                              phonesRef.current = newValues;
                              setFormData((prev) => ({ ...prev, phones: newValues }));
                            }}
                            placeholder="Agregar teléfono adicional"
                          />
                          <MultiValueInput
                            key={`whatsapps-${selectedResidence.id}`}
                            label="WhatsApps adicionales"
                            values={Array.isArray(formData.whatsapps) ? formData.whatsapps : []}
                            onChange={(newValues) => {
                              whatsappsRef.current = newValues;
                              setFormData((prev) => ({ ...prev, whatsapps: newValues }));
                            }}
                            placeholder="Agregar WhatsApp adicional"
                          />
                          <MultiValueInput
                            key={`addresses-${selectedResidence.id}`}
                            label="Direcciones adicionales"
                            values={Array.isArray(formData.addresses) ? formData.addresses : []}
                            onChange={(newValues) => {
                              addressesRef.current = newValues;
                              setFormData((prev) => ({ ...prev, addresses: newValues }));
                            }}
                            placeholder="Agregar dirección adicional"
                          />
                          <MultiValueInput
                            key={`cities-${selectedResidence.id}`}
                            label="Ciudades adicionales"
                            values={Array.isArray(formData.cities) ? formData.cities : []}
                            onChange={(newValues) => {
                              citiesRef.current = newValues;
                              setFormData((prev) => ({ ...prev, cities: newValues }));
                            }}
                            placeholder="Agregar ciudad adicional"
                          />
                        </div>
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

                      {/* Videos de Presentación */}
                      <div className="space-y-6 pt-6 border-t">
                        <div className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-primary" />
                          <Label className="text-lg font-semibold">Videos de Presentación</Label>
                        </div>
                        
                        {/* Videos subidos */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <Label className="font-medium">Videos subidos (máx. 3 minutos)</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Subí videos directamente desde tu computadora. Formatos: MP4, WebM, MOV.
                          </p>
                          <VideoUploader
                            folder={selectedResidence.id}
                            videos={(formData.video_urls || []).filter(url => !url.includes('youtube.com') && !url.includes('youtu.be'))}
                            onChange={(urls) => {
                              const youtubeLinks = (formData.video_urls || []).filter(url => url.includes('youtube.com') || url.includes('youtu.be'));
                              setFormData(prev => ({ ...prev, video_urls: [...urls, ...youtubeLinks] }));
                            }}
                            maxVideos={5}
                          />
                        </div>

                        {/* Links de YouTube */}
                        <div className="space-y-3 pt-4 border-t border-dashed">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-4 h-4 text-destructive" />
                            <Label className="font-medium">Links de YouTube</Label>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            También podés agregar links a videos de YouTube existentes.
                          </p>
                          <YouTubeLinkInput
                            links={(formData.video_urls || []).filter(url => url.includes('youtube.com') || url.includes('youtu.be'))}
                            onChange={(links) => {
                              const uploadedVideos = (formData.video_urls || []).filter(url => !url.includes('youtube.com') && !url.includes('youtu.be'));
                              setFormData(prev => ({ ...prev, video_urls: [...uploadedVideos, ...links] }));
                            }}
                            maxLinks={5}
                          />
                        </div>
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

                      {/* Ratio de Personal */}
                      <div className="space-y-4 pt-6 border-t">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-5 h-5 text-secondary" />
                          <Label className="text-lg font-semibold">Ratio de Personal por Residente</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Indicá la proporción de personal por residente. Dejá vacío si no querés mostrar esta información.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Ratio (ej: 7/10)</Label>
                            <Input
                              value={((formData as any).staff_ratio as any)?.ratio || ''}
                              onChange={(e) => {
                                const current = (formData as any).staff_ratio || { ratio: '', description: '', categories: [] };
                                const updated = { ...current, ratio: e.target.value };
                                staffRatioRef.current = updated;
                                setFormData(prev => ({ ...prev, staff_ratio: updated }));
                              }}
                              placeholder="Ej: 7/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Descripción (ej: 7 profesionales cada 10 residentes)</Label>
                            <Input
                              value={((formData as any).staff_ratio as any)?.description || ''}
                              onChange={(e) => {
                                const current = (formData as any).staff_ratio || { ratio: '', description: '', categories: [] };
                                const updated = { ...current, description: e.target.value };
                                staffRatioRef.current = updated;
                                setFormData(prev => ({ ...prev, staff_ratio: updated }));
                              }}
                              placeholder="Ej: 7 profesionales cada 10 residentes"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Categorías de Personal</Label>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const current = (formData as any).staff_ratio || { ratio: '', description: '', categories: [] };
                                const updated = { ...current, categories: [...(current.categories || []), ''] };
                                staffRatioRef.current = updated;
                                setFormData(prev => ({ ...prev, staff_ratio: updated }));
                              }}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Agregar Categoría
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {(((formData as any).staff_ratio as any)?.categories || []).map((category: string, idx: number) => (
                              <div key={idx} className="flex gap-2">
                                <Input
                                  value={category}
                                  onChange={(e) => {
                                    const current = (formData as any).staff_ratio || { ratio: '', description: '', categories: [] };
                                    const newCategories = [...(current.categories || [])];
                                    newCategories[idx] = e.target.value;
                                    const updated = { ...current, categories: newCategories };
                                    staffRatioRef.current = updated;
                                    setFormData(prev => ({ ...prev, staff_ratio: updated }));
                                  }}
                                  placeholder="Ej: Cuidadores, Enfermeros, etc."
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const current = (formData as any).staff_ratio || { ratio: '', description: '', categories: [] };
                                    const newCategories = (current.categories || []).filter((_: string, i: number) => i !== idx);
                                    const updated = { ...current, categories: newCategories };
                                    staffRatioRef.current = updated;
                                    setFormData(prev => ({ ...prev, staff_ratio: updated }));
                                  }}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                            {(!((formData as any).staff_ratio as any)?.categories || ((formData as any).staff_ratio as any)?.categories?.length === 0) && (
                              <p className="text-muted-foreground text-sm italic">No hay categorías agregadas. Agregá las categorías de personal que querés mostrar en el tooltip.</p>
                            )}
                          </div>
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

                    <TabsContent value="menus" className="space-y-6">
                      <MenusAdmin residenceId={selectedResidence.id} />
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
        ) : activeSection === 'noticias' ? (
          <NewsAdmin />
        ) : (
          <TeamAdmin />
        )}
      </div>
    </div>
  );
};

export default Admin;
