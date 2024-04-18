import React from "react";
import Hint from "./Typography/Hint";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto px-4">
        <p className="text-5xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-nature-start to-nature-end dark:text-neutral-400 tracking-wider">
          Arctic Lense
        </p>

        <p className="text-md leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-nature-end to-nature-start dark:text-neutral-400 tracking-wider">
          A photography album
        </p>
      </div>

      <div className="max-w-screen-md mx-auto px-4 space-y-3">
        <Hint text="Geir, en 57 år gammel fotograf fra Norge, har utviklet en lidenskap for makrofotografi de siste årene." />
        <Hint text="Selv om han bare har vært aktiv i fotoverdenen i noen få år, har hans dedikasjon til å fange detaljene i naturen gjennom linsen raskt blitt en sentral del av hans kunstneriske uttrykk." />
        <Hint text="Alle bildene på denne nettsiden er tatt av Geir selv, og viser hans unike evne til å se skjønnheten i de små øyeblikkene rundt oss." />
      </div>
    </div>
  );
};

export default Header;
