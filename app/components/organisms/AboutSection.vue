<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { nextTick, ref, watch } from 'vue'

const isOpen = ref(false)

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(isOpen, async (value) => {
  await nextTick()

  const dialog = dialogRef.value
  if (!dialog) return

  if (value) {
    dialog.showModal()
  } else {
    dialog.close()
  }
})
</script>

<template>
  <section id="about" class="py-5 px-8.6 mt-8">
      <div class="mb-8">
        <h2>O mnie</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias laborum maxime
          voluptatem fuga quia velit aliquid sed, odio aut tempora. Quibusdam id molestiae alias
          reprehenderit, doloremque debitis quod sunt consequuntur praesentium eveniet quos animi
          nihil necessitatibus neque magnam nobis. Culpa debitis itaque amet necessitatibus labore
          ducimus officiis nemo magni odit cumque vel tenetur quam doloribus, iure temporibus
          voluptate suscipit reiciendis expedita sint non ipsam, ad perspiciatis?
        </p>
      </div>
      <button
        @click="isOpen = true"
        class="bg-light-beige shadow-lg rounded-lg group p-0 hover:brightness-105 hover:shadow-xl focus-visible:brightness-105"
      >
        <img
          alt="Artykuł o mnie z Gazety Przemysłu Drzewnego z listopada 2017. Kliknij, aby zobaczyć cały."
          src="/img/uncle.png"
        />
      </button>

      <dialog
        ref="dialogRef"
        id="uncle-article-dialog"
        class="m-auto rounded-lg p-6 z-10 w-[min(100%,_720px)] open:flex open:gap-8 open:flex-col xl:open:flex-row shadow-sm bg-linear-to-r from-light-beige-300 from-0% via-light-beige-200 via-25% to-50% to-light-beige-100"
        @close="isOpen = false"
      >
        <article>
          <header class="flex flex-col-reverse sm:flex-row justify-between">
            <h1>Stolarz może też być artystą</h1>
            <button
              aria-labelledby="close-label"
              @click="isOpen = false"
              class="size-10 rounded-lg bg-black-earth text-light-beige shadow-md flex justify-center items-center min-w-min px-1 py-1 max-w-fit max-h-fit ml-auto"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </header>

          <p class="font-bold">
            Dla pyrzyckiego stolarza artysty każde zamówienie to wyzwanie w zakresie twórczego
            myślenia, by wykonać je jak najoryginalniej i zachęcająco dla wszystkich patrzących na
            taki stolarski eksponat.
          </p>

          <p>
            Piotr Domański jest rodowitym mieszkańcem Pyrzyc (woj. zachodniopomorskie). W miejscowej
            szkole zawodowej pobierał naukę w zawodzie stolarza, uzyskując zawód stolarza
            budowlanego, z dyplomem czeladnika. Potem przez prawie 10 lat pracował w pobliskim
            Starym Czarnowie jako stolarz meblowy, po czym w 1999 r. założył własną działalność.
          </p>

          <p>
            Przez pierwszych kilka lat świadczył usługi dla firmy Navigo, mającej siedzibę w
            Szczecinie, a także wykonywał zlecenia dla osób prywatnych, przede wszystkim ze
            Szczecina. Po powrocie do Pyrzyc wynajął pracownię stolarską od Józefa Powroźnika,
            doświadczonego mistrza stolarskiego. Wykonuje terminowo, precyzyjnie, z wielką dbałością
            o szczegóły wszystkie zlecenia klientów, nawet te najbardziej nietypowe. Wykorzystuje
            niektóre maszyny swojego poprzednika oraz własny sprzęt i elektronarzędzia.
          </p>

          <blockquote>
            <p>
              Najczęściej zamawiane są meble kuchenne i szafy
              <span>– mówi Piotr Domański –</span> ale jestem w stanie wykonać prawie wszystko,
              czego życzy sobie klient. Dlatego tworzę również garderoby, sypialnie, meble
              łazienkowe i biurowe, schody oraz meble sklepowe. Jakość wykonania, poza moimi
              umiejętnościami, zależy również od zastosowania rozwiązań technologicznych, okuć
              renomowanych firm oraz blatów, frontów itp. Sięgam zatem po najlepsze produkty.
            </p>
          </blockquote>

          <p>
            Piotr Domański wspiera klienta od etapu projektu, przez wybór najwłaściwszego materiału
            i kolorystyki, aż do finalnego efektu.
          </p>

          <blockquote>
            <p>
              W obecnych czasach wiele firm stawia na szybkość, bylejakość surowca oraz taniość, na
              czym traci jakość mebli <span> żali się gospodarz. –</span> Taka produkcja ma również
              swoich odbiorców, ale twierdzę, że coraz więcej ludzi szuka trwałych i dobranych pod
              każdym względem mebli w stolarniach, w których odbywa się cały proces wytwarzania – od
              przygotowania projektu aż do wykonania zamówienia.
            </p>
          </blockquote>

          <p>
            Piotr Domański jest prawdopodobnie jedynym na Pomorzu Zachodnim stolarzem artystą,
            potrafi bowiem wykonać z drewna unikalne przedmioty, nietypowo uformowane i z bogatymi
            wzorami, jak choćby biurko, żyrandol czy stół grillowy. Jest zwolennikiem eksponowania
            sęków i słoi w zrealizowanym meblu, bo świadczą one o tym, iż jest to autentyczne
            drewno, ze swoim charakterystycznym wnętrzem.
          </p>

          <blockquote>
            <p>
              Stolarstwo to nie tylko mój zawód <span>– mówi Piotr Domański –</span> ale to przede
              wszystkim moja pasja życiowa, której poświęcam wiele czasu. Drewno jest przecież darem
              natury, przez co jest zdrowe i przyjazne człowiekowi, a zastosowane w wystroju wnętrz,
              nadaje im szlachetny wygląd i tworzy niepowtarzalny klimat.
            </p>
          </blockquote>

          <p>
            Na prośbę jednego z koneserów sztuki stolarskiej wykonał z cedru hiszpańskiego
            ekskluzywne pudełko na cygara, wzorowane na amerykańskim humidorze.
          </p>

          <p>
            Każde zamówienie traktuje jako twórcze wyzwanie, zawsze dążąc do jak najlepszego efektu.
            Marzy, by zamówienia w stolarstwie artystycznym były liczniejsze od wykonywania domowych
            mebli na wymiar. Z wielkim uznaniem wypowiada się na temat wielopokoleniowego umiłowania
            sztuki stolarskiej przez górali i sądzi, że lepiej prosperowałby w spółce, gdzie mógłby
            całkowicie oddać się stolarstwu, a wspólnik zajmowałby się logistyką i sprzedażą.
          </p>
        </article>
      </dialog>
  </section>
</template>

<style scoped>
@reference '../../assets/css/tailwind.css';

dialog {
  scrollbar-color: var(--color-black-earth-700) var(--color-black-earth-200);
  scrollbar-width: thin;
}

article {
  padding: 16px 16px 40px;

  & p {
    margin-block: 16px;

    &:first-of-type {
      margin-block: 32px;
    }
  }

  & blockquote {
    & p {
      font-style: italic;

      & span {
        font-style: normal;
      }
    }
  }
}
</style>
