import { getNames, getCode } from 'country-list';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from './select'

export function CountrySelect() {
  const allCountries = getNames(); 

  const sortedCountries = [
    'Slovakia', 
    'Czech Republic', 
    ...allCountries.filter(c => c !== 'Slovakia' && c !== 'Czech Republic')
  ];

  return (
    <Select>
  <SelectTrigger>
    <SelectValue placeholder="Vyberte krajinu" />
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