<script setup lang="ts">
import { sendMessage } from 'api/messages.api'
import { computed, ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { wait } from 'helpers/api.helpers'
import TextInput from '../atoms/TextInput.vue'
import DescriptionInput from '../atoms/DescriptionInput.vue'
import ImageInput from '../atoms/ImageInput.vue'
import RangeInput from '../atoms/RangeInput.vue'

const recaptcha = useReCaptcha();
const { executeRecaptcha, recaptchaLoaded } = recaptcha || { executeRecaptcha: null, recaptchaLoaded: null };

const priceRange = ref<[number, number]>([1500, 4200]);
const email = ref('');
const city = ref('');
const authorName = ref('');
const text = ref('');
const images = ref<File[]>([]);
const phoneNumber = ref('');
const website = ref('');

const submitting = ref(false);
const isError = ref(false);

const isSubmitDisabled = computed<boolean>(() => submitting.value || [email, authorName, city, text].some((inputRef) => !inputRef.value));

function onChangeMin(value: number): void {
  priceRange.value[0] = value
}

function onChangeMax(value: number): void {
  priceRange.value[1] = value
}

async function onSubmit(event: Event): Promise<void> {
  submitting.value = true;
  isError.value = false;
  event.preventDefault();

  try {
    let token = 'development-token';
    
    // Only use reCAPTCHA if it's properly configured
    if (recaptchaLoaded && executeRecaptcha) {
      await recaptchaLoaded();
      token = await executeRecaptcha('submit_contact_form');
    } else {
      console.log('reCAPTCHA not configured - using development token');
    }
    
    await sendMessage({
      authorName: authorName.value,
      email: email.value,
      city: city.value,
      phoneNumber: Number(phoneNumber.value),
      text: text.value,
      images: images.value,
      minPrice: priceRange.value[0],
      maxPrice: priceRange.value[1],
      recaptchaToken: token,
      website: website.value
    })  

    isError.value = false;
    await wait(2000);
    
  } catch (error: unknown) {
    isError.value = Boolean(error);
  } finally {
    submitting.value = false;
  }


}
</script>

<template>
  <section id="contact-form" class="w-full max-w-[750px]">
    <h2>Napisz do mnie z Twoim pomysłem na mebel</h2>
    <p>
      Nie ma przede mną tajemnic 🙂. Jeśli masz konkretny pomysł, chciałbyś coś zaznaczyć już na początku albo chcesz zapytać- tutaj jest na to miejsce. Zwykle odpisuję w ciągu dnia.
    </p>

    <form @submit="onSubmit">
      <TextInput
        v-model:value="email"
        type="email"
        id="email"
        label="E-mail"
        hint="np. jankowalski@gmail.com"
        required
      />

      <TextInput
        v-model:value="city"
        type="text"
        id="city"
        label="Miejscowość"
        hint="np. Pyrzyce"
        required
      />

      <TextInput
        v-model:value="authorName"
        type="text"
        id="name"
        label="Imię i nazwisko"
        hint="Możesz podać także swój pseudonim. Będzie on widoczny w mojej skrzynce odbiorczej."
        required
      />

      <TextInput
        v-model:value="phoneNumber"
        type="tel"
        id="phone"
        label="Numer telefonu"
        hint="polski numer telefonu np. 607 978 023"
      />

      <DescriptionInput
        v-model:value="text"
        label="Opis"
        id="text"
        hint="opis nie może być pusty"
        required
      />

      <ImageInput
        v-model:images="images"
        id="image"
        label="Możesz także podesłać zdjęcie"
        hint="Dozwolone formaty: jpg, png..."
        multiple
      />

      <RangeInput
        v-model="priceRange"
        id="price"
        label="Wybierz przedział cenowy"
        hint="Przeciągnij suwaki, aby ustawić minimum i maksimum"
        :onChangeMin="onChangeMin"
        :onChangeMax="onChangeMax"
        :min="0"
        :max="10000"
        :step="10"
        class="mb-10"
      />

      <TextInput
        tabindex="-1"
        aria-hidden="true"
        autocomplete="off"
        v-model:value="website"
        type="text"
        id="website"
        label="website"
        hint="E.g. www.my-awesome-website.pl"
        class="opacity-0 absolute top-0 left-0 w-[1px] h-[1px] -z-1 whitespace-nowrap overflow-hidden invisible"
      />

      <button type="submit" class="capitalize bg-black-earth mb-5 w-40 disabled:opacity-40 disabled:cursor-default" :disabled="isSubmitDisabled">{{ submitting ? "Wysyłanie..." : "Wyślij" }}</button>
      <small>* wymagane</small>
    </form>
  </section>
</template>
