import { CountrySelect } from "./countrySelect";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "./field";
import { Input } from "./input";

export function AddressForm({ formId }: { formId: string }) {
    return (<>
          <form id={formId} className="mb-4">
            <FieldGroup>
                <FieldSet>
                <Field>
                    <FieldLabel htmlFor={`name-input-for-${formId}`}>Meno a Priezvisko</FieldLabel>
                    <Input 
                    id={`name-input-for-${formId}`}
                    className="" 
                    placeholder="Meno a priezvisko" 
                    required 
                    type="text" 
                    name="Meno a prizvisko" 
                    autoComplete="given-name"/>
                </Field>
                </FieldSet>
                <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`adr-input-for-${formId}`}>Adresa</FieldLabel>
                        <Input 
                    id={`adr-input-for-${formId}`}
                    className="" 
                    placeholder="Ulica a číslo domu" 
                    required 
                    type="text" 
                    name="Adresa" 
                    autoComplete="street-address"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`city-input-for-${formId}`}>Mesto</FieldLabel>
                        <Input 
                    id={`city-input-for-${formId}`}
                    className="" 
                    placeholder="Mesto" 
                    required 
                    type="text" 
                    name="Mesto" 
                    autoComplete="address-level2"/>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel htmlFor={`postal-input-for-${formId}`}>PSČ</FieldLabel>
                        <Input 
                    id={`postal-input-for-${formId}`}
                    className="" 
                    placeholder="PSČ" 
                    required 
                    type="text" 
                    name="PSČ" 
                    autoComplete="postal-code"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`country-input-for-${formId}`}>Krajina</FieldLabel>
                        <CountrySelect id={`country-input-for-${formId}`}/>
                    </Field>
                </div>
                </FieldSet>
                <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`mail-input-for-${formId}`}>E-mail</FieldLabel>
                        <Input 
                    id={`mail-input-for-${formId}`}
                    className="" 
                    placeholder="E-mail" 
                    required 
                    type="text" 
                    name="E-mail" 
                    autoComplete="email"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`tel-input-for-${formId}`}>Telefónne číslo</FieldLabel>
                        <Input 
                    id={`tel-input-for-${formId}`}
                    className="" 
                    placeholder="+421 ..." 
                    required 
                    type="text" 
                    name="Telefónne číslo" 
                    autoComplete="tel"/>
                    </Field>
                </div>
                </FieldSet>
            </FieldGroup>
            <FieldSeparator className="my-2"/>
            <FieldGroup>
                <FieldSet>
                <FieldLegend>Nepovinné polia</FieldLegend>
                <FieldDescription>Objednávka na právnickú osobu</FieldDescription>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`ico-input-for-${formId}`}>IČO</FieldLabel>
                        <Input 
                    id={`ico-input-for-${formId}`}
                    className="" 
                    placeholder="IČO" 
                    type="text" 
                    name="IČO" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`dic-input-for-${formId}`}>DIČ</FieldLabel>
                        <Input 
                    id={`dic-input-for-${formId}`}
                    className="" 
                    placeholder="DIČ" 
                    type="text" 
                    name="DIČ" />
                    </Field>
                </div>
                <Field>
                    <FieldLabel htmlFor={`dph-input-for-${formId}`}>IČ DPH</FieldLabel>
                    <Input 
                    id={`dph-input-for-${formId}`}
                    className="" 
                    placeholder="SK..." 
                    type="text" 
                    name="IČ DPH" />
                </Field>
                </FieldGroup>
                </FieldSet>
            </FieldGroup>
          </form>
          </>)
}