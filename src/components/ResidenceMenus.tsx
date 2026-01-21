import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useResidenceMenus, MenuData } from "@/hooks/useResidenceMenus";
import { Sun, Snowflake, UtensilsCrossed, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidenceMenusProps {
  residenceId: string;
}

const MEAL_ORDER = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'] as const;

// Highlight "Postre:" or "Postres:" in bold
const formatMealText = (text: string) => {
  const parts = text.split(/(Postres?:)/gi);
  return parts.map((part, index) => {
    if (/^postres?:$/i.test(part)) {
      return <strong key={index} className="text-primary">{part}</strong>;
    }
    return part;
  });
};

const MobileMenuView = ({ menuData, nota }: { menuData: MenuData; nota: string | null }) => {
  return (
    <div className="space-y-4">
      {nota && (
        <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <AlertCircle className="h-4 w-4 text-secondary flex-shrink-0" />
          <span className="text-sm font-medium text-secondary">{nota}</span>
        </div>
      )}
      
      <Accordion type="single" collapsible className="w-full space-y-2">
        {menuData.dias.map((dia) => (
          <AccordionItem key={dia} value={dia} className="border rounded-lg px-4 bg-card">
            <AccordionTrigger className="hover:no-underline py-3">
              <span className="font-semibold text-foreground">{dia}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4">
                {MEAL_ORDER.map((meal) => {
                  const mealContent = menuData.comidas[meal]?.[dia];
                  if (!mealContent) return null;
                  
                  return (
                    <div key={meal} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-primary">{meal}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6 leading-relaxed">
                        {formatMealText(mealContent)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const DesktopMenuView = ({ menuData, nota }: { menuData: MenuData; nota: string | null }) => {
  return (
    <div className="space-y-4">
      {nota && (
        <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <AlertCircle className="h-4 w-4 text-secondary flex-shrink-0" />
          <span className="text-sm font-medium text-secondary">{nota}</span>
        </div>
      )}
      
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold text-foreground w-24 sticky left-0 bg-muted/50 z-10">
                Comida
              </TableHead>
              {menuData.dias.map((dia) => (
                <TableHead key={dia} className="font-bold text-foreground text-center min-w-[140px]">
                  {dia}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEAL_ORDER.map((meal, mealIndex) => (
              <TableRow key={meal} className={mealIndex % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                <TableCell className="font-semibold text-primary sticky left-0 bg-inherit z-10 border-r">
                  {meal}
                </TableCell>
                {menuData.dias.map((dia) => {
                  const mealContent = menuData.comidas[meal]?.[dia] || '';
                  return (
                    <TableCell key={dia} className="text-sm text-muted-foreground align-top p-3">
                      <div className="leading-relaxed">
                        {formatMealText(mealContent)}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const ResidenceMenus = ({ residenceId }: ResidenceMenusProps) => {
  const { data: menus, isLoading, error } = useResidenceMenus(residenceId);
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-48"></div>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !menus || menus.length === 0) {
    return null; // Don't show anything if no menus exist
  }

  const veranoMenu = menus.find(m => m.season === 'verano');
  const inviernoMenu = menus.find(m => m.season === 'invierno');

  // Determine default tab based on current month (Dec-Feb = verano, Jun-Aug = invierno in Uruguay)
  const currentMonth = new Date().getMonth();
  const isVeranoSeason = currentMonth >= 11 || currentMonth <= 2;
  const defaultTab = isVeranoSeason && veranoMenu ? 'verano' : (inviernoMenu ? 'invierno' : 'verano');

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-subtle pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          Menús de Temporada
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {veranoMenu && (
              <TabsTrigger value="verano" className="gap-2">
                <Sun className="h-4 w-4" />
                Menú de Verano
              </TabsTrigger>
            )}
            {inviernoMenu && (
              <TabsTrigger value="invierno" className="gap-2">
                <Snowflake className="h-4 w-4" />
                Menú de Invierno
              </TabsTrigger>
            )}
          </TabsList>

          {veranoMenu && (
            <TabsContent value="verano" className="mt-0">
              {isMobile ? (
                <MobileMenuView menuData={veranoMenu.menu_data} nota={veranoMenu.nota} />
              ) : (
                <DesktopMenuView menuData={veranoMenu.menu_data} nota={veranoMenu.nota} />
              )}
            </TabsContent>
          )}

          {inviernoMenu && (
            <TabsContent value="invierno" className="mt-0">
              {isMobile ? (
                <MobileMenuView menuData={inviernoMenu.menu_data} nota={inviernoMenu.nota} />
              ) : (
                <DesktopMenuView menuData={inviernoMenu.menu_data} nota={inviernoMenu.nota} />
              )}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};
