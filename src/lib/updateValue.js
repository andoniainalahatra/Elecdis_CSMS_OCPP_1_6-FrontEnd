import { dataForBox } from "@/_mock/DataForSimulateDate";

const boxData = dataForBox

export const updateValue = (filterType, dataType, setter) => {
    switch (filterType) {
      case "journalier":
        setter(boxData.dataWithFilter.journalier[dataType]);
        break;
      case "mensuel":
        setter(boxData.dataWithFilter.mensuel[dataType]);
        break;
      case "trimestriel":
        setter(boxData.dataWithFilter.trimestriel[dataType]);
        break;
      case "semestriel":
        setter(boxData.dataWithFilter.semestriel[dataType]);
        break;
      case "annuel":
        setter(boxData.dataWithFilter.annuel[dataType]);
        break;
      default:
        break;
    }
  };