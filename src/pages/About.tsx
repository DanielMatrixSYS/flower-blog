import React from "react";
import Title from "../components/Typography/Title";
import Description from "../components/Typography/Description";
import Signature from "../components/Signature";

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-start p-4 space-y-4">
      <div className="flex flex-col items-start space-y-4">
        <Title text="Hvem er jeg" />

        <Description text="Hei, jeg er Geir Roger Kirkerud, en 57 år gammel fotograf fra sør i Norge. Makrofotografi har vært min lidenskap de siste årene, men jeg nyter også å fange livet og bevegelsen av fugler og den brede vidden av landskapet rundt meg." />
        <Description text="Selv om min fotografiske reise startet senere i livet, har min dype forståelse og forbindelse til den naturlige verden rundt oss gjort fotografi til mer enn bare en hobby – det er en forlengelse av mitt perspektiv og fortelling." />
        <Description text="Jeg har tilbrakt utallige timer med å studere lys, skygge, og mønstre som naturen fritt byr på, og har lært hvordan man fanger de forbigående, men likevel evigvarende øyeblikkene." />
        <Description text="Alle bildene på denne nettsiden er tatt av meg. De representerer min reise og min evne til å se skjønnheten i hver eneste lille detalj – en evne jeg håper å kunne dele med deg gjennom mine verk." />
      </div>

      <div className="flex flex-col items-start space-y-4">
        <Title text="Nettsidens skaper" />

        <Description text="Denne nettsiden ble kjærlig utformet av Daniel Michelsen. Som en dedikert utvikler, har han gitt liv til mine fotografier online, og har skapt en digital plattform hvor de kan deles og verdsettes av alle." />
        <Signature text="Geir Roger Kirkerud" />
      </div>
    </div>
  );
};

export default About;
