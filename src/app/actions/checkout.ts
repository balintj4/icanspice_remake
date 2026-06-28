'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function processOrderAction(formData: FormData) {
  const billingData = {
    name: formData.get('name-billing'),
    address: formData.get('address-billing'),
    city: formData.get('city-billing'),
    postalCode: formData.get('postal-billing'),
    country: formData.get('country-billing'), 
    email: formData.get('email-billing'),
    phone: formData.get('phone-billing'),
  };

  const companyData = {
    companyName: formData.get('comp'),
    ico: formData.get('ico'),
    dic: formData.get('dic'),
    icDph: formData.get('dph'),
  };

  const shippingData = {
    name: formData.get('name-shipping'),
    address: formData.get('address-shipping'),
    city: formData.get('city-shipping'),
    postalCode: formData.get('postal-shipping'),
    country: formData.get('country-shipping'), 
    email: formData.get('email-shipping'),
    phone: formData.get('phone-shipping'),
  };
  
  const terms = formData.get('terms-checkbox');
  
  if (terms !== 'on') {
    throw Error("Súhlas s podmienkami je povinný!");
  }


  const cookieStore = await cookies();
  
  cookieStore.set('shipping_info', JSON.stringify(shippingData), {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 15, 
  });

  cookieStore.set('billing_info', JSON.stringify(billingData), {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 15,
  });

  cookieStore.set('company_info', JSON.stringify(companyData), {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 15,
  });


  cookieStore.set('checkout_authorized', 'true', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 15,
  });

  redirect('/');
}