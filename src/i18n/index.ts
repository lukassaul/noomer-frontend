import en from './en.json';
import cn from './cn.json';
import de from './de.json';
import fr from './fr.json';

export const t = (key: string, language: string): string => {
  let langData: { [key: string]: string } = {};

  if(language === 'EN') {
    langData = en;
  }else if(language === 'DE') {
    langData = de;
  }else if(language === 'FR') {
    langData = fr;
  }else if(language === 'CN') {
    langData = cn;
  }

  return langData[key];
}
