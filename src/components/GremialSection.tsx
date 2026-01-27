import gremialLogo from "@/assets/gremial-ccsu.jpeg";

export const GremialSection = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <a 
            href="https://www.ccsu.com.uy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <img 
              src={gremialLogo} 
              alt="Cámara de Comercio y Servicios del Uruguay" 
              className="h-24 md:h-32 w-auto object-contain"
            />
          </a>
          <p className="text-lg md:text-xl text-primary font-semibold">
            Red Integra
          </p>
        </div>
      </div>
    </section>
  );
};
