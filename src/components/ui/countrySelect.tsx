'use client'
import { getNames, getCode } from 'country-list';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from './select'

interface CountrySelectProps {
  id?: string;
  formName?: string;
}

export function CountrySelect({id, formName} : CountrySelectProps) {
  const allCountries = getNames(); 

  const sortedCountries = [
    'Slovakia', 
    'Czechia', 
    ...allCountries.filter(c => c !== 'Slovakia' && c !== 'Czechia')
  ];

  return (
    <Select name={formName}>
  <SelectTrigger id={id}>
    <SelectValue placeholder="Vyberte krajinu"/>
  </SelectTrigger>
  <SelectContent >
    {sortedCountries.map((name) => (
      <SelectItem key={name} value={getCode(name)!} >
        {name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
  );
}