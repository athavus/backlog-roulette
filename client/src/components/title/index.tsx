export function BacklogTitle() {
  return (
    <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center items-center py-4 px-4 sm:px-6 overflow-hidden">
      <div className="relative group flex flex-col items-center">
        {/* Camada de brilho de fundo */}
        <div className="absolute -inset-10 bg-blue-100/10 blur-3xl rounded-full opacity-50"></div>

        <pre className="
          relative
          font-mono
          text-blue-700
          leading-[1.15]
          select-none
          text-left
          inline-block
          
          /* Escalonamento fino para evitar distorção de caracteres */
          sm:text-[10px]
          md:text-[11px]
          lg:text-[13px]
          xl:text-[15px]
          
          /* Efeito visual mais limpo */
          drop-shadow-[0_1px_2px_rgba(30,58,138,0.1)]
          transition-all
          duration-700
        ">
          {`██████╗  █████╗  ██████╗██╗  ██╗██╗      ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██║     ██╔═══██╗██╔════╝ 
██████╔╝███████║██║     █████╔╝ ██║     ██║   ██║██║  ███╗
██╔══██╗██╔══██║██║     ██╔═██╗ ██║     ██║   ██║██║   ██║
██████╔╝██║  ██║╚██████╗██║  ██╗███████╗╚██████╔╝╚██████╔╝
╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ 
██████╗  ██████╗ ██╗   ██╗██╗     ███████╗████████╗████████╗███████╗
██╔══██╗██╔═══██╗██║   ██║██║     ██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝
██████╔╝██║   ██║██║   ██║██║     █████╗     ██║      ██║   █████╗  
██╔══██╗██║   ██║██║   ██║██║     ██╔══╝     ██║      ██║   ██╔══╝  
██║  ██║╚██████╔╝╚██████╔╝███████╗███████╗   ██║      ██║   ███████╗
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚══════╝`}
        </pre>
      </div>
    </div>
  );
}
