export function BacklogTitle() {
  return (
    <div className="mb-4 sm:mb-6 lg:mb-8 w-full flex justify-center overflow-x-auto">
      <pre className="
        text-[7px]                // Muito pequeno no mobile, cabe na largura
        sm:text-[10px]            // Pouco maior em tablets pequenos
        md:text-xs                // xs: 0.75rem em tablets/médios
        lg:text-sm                // sm: 0.875rem em desktop
        xl:text-base              // base: 1rem em telas grandes
        text-blue-900
        font-mono
        leading-none
        select-none
        text-center
        drop-shadow-lg
        shadow-black
        px-1
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
  );
}
