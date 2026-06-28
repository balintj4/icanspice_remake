'use client'
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { CountrySelect } from "../ui/countrySelect";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function AddressForm({ formId }: { formId: string }) {
    const [isDifferentAddress, setIsDifferentAddress] = useState(false);
    return (<>
          <form id={formId} className="mb-4">

             {/***************************************************************
    
                            BILLING
    
    *****************************************************************/}

            <FieldGroup>
                <FieldSet>
                <Field>
                    <FieldLabel htmlFor={`name-billing-for-${formId}`}>Meno a Priezvisko</FieldLabel>
                    <Input 
                    id={`name-billing-for-${formId}`}
                    className="" 
                    placeholder="Meno a priezvisko" 
                    required 
                    type="text" 
                    name="name-billing" 
                    autoComplete="given-name"/>
                </Field>
                </FieldSet>
                <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`adr-billing-for-${formId}`}>Adresa</FieldLabel>
                        <Input 
                    id={`adr-billing-for-${formId}`}
                    className="" 
                    placeholder="Ulica a číslo domu" 
                    required 
                    type="text" 
                    name="address-billing" 
                    autoComplete="street-address"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`city-billing-for-${formId}`}>Mesto</FieldLabel>
                        <Input 
                    id={`city-billing-for-${formId}`}
                    className="" 
                    placeholder="Mesto" 
                    required 
                    type="text" 
                    name="city-billing" 
                    autoComplete="address-level2"/>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel htmlFor={`postal-billing-for-${formId}`}>PSČ</FieldLabel>
                        <Input 
                    id={`postal-billing-for-${formId}`}
                    className="" 
                    placeholder="PSČ" 
                    required 
                    type="text" 
                    name="postal-billing" 
                    autoComplete="postal-code"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`country-billing-for-${formId}`}>Krajina</FieldLabel>
                        <CountrySelect id={`country-billing-for-${formId}`} formName='country-billing'/>
                    </Field>
                </div>
                </FieldSet>
                <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`mail-billing-for-${formId}`}>E-mail</FieldLabel>
                        <Input 
                    id={`mail-billing-for-${formId}`}
                    className="" 
                    placeholder="E-mail" 
                    required 
                    type="text" 
                    name="email-billing" 
                    autoComplete="email"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`tel-billing-for-${formId}`}>Telefónne číslo</FieldLabel>
                        <Input 
                    id={`tel-billing-for-${formId}`}
                    className="" 
                    placeholder="+421 ..." 
                    required 
                    type="text" 
                    name="phone-billing" 
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
                    <Field>
                    <FieldLabel htmlFor={`c-name-billing-for-${formId}`}>Názov spoločnosti</FieldLabel>
                    <Input 
                    id={`c-name-billing-for-${formId}`}
                    className="" 
                    placeholder="Názov spoločnosti" 
                    type="text" 
                    name="comp" />
                </Field>
                    <div className="grid grid-cols-3 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`ico-billing-for-${formId}`}>IČO</FieldLabel>
                        <Input 
                    id={`ico-billing-for-${formId}`}
                    className="" 
                    placeholder="IČO" 
                    type="text" 
                    name="ico" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`dic-billing-for-${formId}`}>DIČ</FieldLabel>
                        <Input 
                    id={`dic-billing-for-${formId}`}
                    className="" 
                    placeholder="DIČ" 
                    type="text" 
                    name="dic" />
                    </Field>
                    <Field>
                    <FieldLabel htmlFor={`dph-billing-for-${formId}`}>IČ DPH</FieldLabel>
                    <Input 
                    id={`dph-billing-for-${formId}`}
                    className="" 
                    placeholder="SK..." 
                    type="text" 
                    name="dph" />
                </Field>
                </div>
                <div className="flex items-center space-x-2 my-6">
                <Checkbox 
                    id="diff-address-check" 
                    checked={isDifferentAddress}
                    onCheckedChange={(checked) => setIsDifferentAddress(checked === true)}
                    name="check-shipping"
                />
                <Label htmlFor="diff-address-check">Doručiť na inú adresu</Label>
            </div>
                </FieldGroup>
                </FieldSet>
            </FieldGroup>

             {/***************************************************************
    
                            SHIPPING
    
    *****************************************************************/}
            {isDifferentAddress && (
<FieldGroup>
                <FieldSet>
                <Field>
                    <FieldLabel htmlFor={`name-billing-for-${formId}`}>Meno a Priezvisko</FieldLabel>
                    <Input 
                    id={`name-billing-for-${formId}`}
                    className="" 
                    placeholder="Meno a priezvisko" 
                    required 
                    type="text" 
                    name="name-shipping" 
                    autoComplete="given-name"/>
                </Field>
                </FieldSet>
                <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`adr-billing-for-${formId}`}>Adresa</FieldLabel>
                        <Input 
                    id={`adr-billing-for-${formId}`}
                    className="" 
                    placeholder="Ulica a číslo domu" 
                    required 
                    type="text" 
                    name="address-shipping" 
                    autoComplete="street-address"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`city-billing-for-${formId}`}>Mesto</FieldLabel>
                        <Input 
                    id={`city-billing-for-${formId}`}
                    className="" 
                    placeholder="Mesto" 
                    required 
                    type="text" 
                    name="city-shipping" 
                    autoComplete="address-level2"/>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field>
                        <FieldLabel htmlFor={`postal-billing-for-${formId}`}>PSČ</FieldLabel>
                        <Input 
                    id={`postal-billing-for-${formId}`}
                    className="" 
                    placeholder="PSČ" 
                    required 
                    type="text" 
                    name="postal-shipping" 
                    autoComplete="postal-code"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`country-billing-for-${formId}`}>Krajina</FieldLabel>
                        <CountrySelect id={`country-billing-for-${formId}`} formName='country-shipping'/>
                    </Field>
                </div>
                </FieldSet>
                <FieldSet>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor={`mail-billing-for-${formId}`}>E-mail</FieldLabel>
                        <Input 
                    id={`mail-billing-for-${formId}`}
                    className="" 
                    placeholder="E-mail" 
                    required 
                    type="text" 
                    name="email-shipping" 
                    autoComplete="email"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={`tel-billing-for-${formId}`}>Telefónne číslo</FieldLabel>
                        <Input 
                    id={`tel-billing-for-${formId}`}
                    className="" 
                    placeholder="+421 ..." 
                    required 
                    type="text" 
                    name="phone-shipping" 
                    autoComplete="tel"/>
                    </Field>
                </div>
                </FieldSet>
            </FieldGroup>

            )
        

            }

          </form>
          </>)
}