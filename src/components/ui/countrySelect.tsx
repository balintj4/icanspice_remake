import { getNames, getCode } from 'country-list';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from './select'

export function CountrySelect() {
  const allCountries = getNames(); 

  const sortedCountries = [
    'Slovakia', 
    'Czechia', 
    ...allCountries.filter(c => c !== 'Slovakia' && c !== 'Czechia')
  ];

  return (
    <Select defaultValue="SK">
  <SelectTrigger>
    <SelectValue placeholder="Vyberte krajinu"/>
  </SelectTrigger>
  <SelectContent>
    {sortedCountries.map((name) => (
      <SelectItem key={name} value={getCode(name)!}>
        {name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
  );
}