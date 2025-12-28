export function BacklogTitle() {
  return (
    <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center items-center py-4 px-2 sm:px-6 overflow-hidden">
      <div className="relative group flex justify-center items-center">
        {/* Efeito de brilho de fundo suave */}
        <div className="absolute -inset-8 bg-blue-100/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

        <pre className="
          relative
          font-mono
          font-bold
          text-blue-900
          leading-[1.1]
          select-none
          text-center
          
          /* Tamanho de fonte responsivo e dinâmico */
          text-[clamp(4.2px,1.3vw,12px)]
          sm:text-[clamp(8px,1.2vw,14px)]
          md:text-[min(1.10vw,14px)]
          lg:text-[13px]
          xl:text-[15px]
          
          /* Refinamentos estéticos - Efeito Retro Neon suave */
          drop-shadow-[0_0_8px_rgba(30,58,138,0.25)]
          hover:drop-shadow-[0_0_12px_rgba(30,58,138,0.4)]
          hover:scale-[1.01]
          transition-all
          duration-500
          px-4
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
