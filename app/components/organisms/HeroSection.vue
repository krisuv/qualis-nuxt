<template>
  <div class="flex justify-between">
    <section class="pt-40 lg:pt-0 flex-1/2 lg:px-40 flex flex-col lg:justify-center lg:-mt-40">
      <h2 class="pb-5 font-black">Meble na Wymiar w Pyrzycach</h2>
      <p class="pb-10">
        Tworzę meble, które idealnie dopasowują się do Twojego wnętrza i stylu życia. Każdy projekt powstaje z pasją, precyzją i dbałością o najdrobniejsze detale — od pierwszego szkicu po montaż. Wykorzystuję najwyższej jakości materiały i sprawdzone rozwiązania stolarskie, by Twoje meble służyły przez lata. Postaw na rzemiosło z duszą prosto z Pyrzyc.
      </p>

      <div class="flex flex-col gap-7.5 w-fit">
        <a href="#gallery" class="button bg-dust-olive">
          zobacz meble
        </a>
        <a href="#contact-form" class="button bg-black-earth">
          stwórz własny mebel
        </a>
      </div>
    </section>

    <div class="side-images-wrapper flex-1/2">
      <NuxtImg src="/img/hero-1.jpg" alt="" class="side-image side-image-1" loading="eager" :preload="true" placeholder="blur" />
      <!-- <img class="side-image side-image-1" src="/img/hero-1.jpg" alt="" > -->
      <img class="side-image side-image-2" src="/img/hero-2.jpg" alt="" >
      <img class="side-image side-image-3" src="/img/hero-3.jpg" alt="" >
      <img class="side-image side-image-4" src="/img/hero-4.jpg" alt="" >
      <img class="side-image side-image-5" src="/img/hero-5.jpg" alt="" >
    </div>
  </div>
</template>

<style scoped>
@reference '../../assets/css/tailwind.css';

section {
  min-height: calc(100vh - (var(--spacing) * 16));
}

section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom right, #694f35, #fbf7f25d),
    url('../../assets/img/hand-drawn-abstract-outline-background.jpg') center / cover no-repeat;
  z-index: -1;
  top: 0;
  bottom: -120px;
  left: 0;
  filter: blur(2px);
  mix-blend-mode: hard-light;
  opacity: 0.45;
}


.side-images-wrapper {
  @apply  py-5 pl-5 gap-5 hidden lg:grid relative bottom-16;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, minmax(0, 130px));
}

.side-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;  
  @apply shadow-sm;

  &.side-image-1 {
    grid-column: 1 / 4;
    grid-row: 1 / 3;
  }

  &.side-image-2 {
    grid-column: 4 / 6;
    grid-row: 1 / 3;
    height: 130%;
    position: relative;
    @apply bottom-21; 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.side-image-3 {
   grid-column: 1 / 3;
   grid-row: 3 / 5;
  }

  &.side-image-4 {
    grid-column: 1 / 3;
    grid-row: 5 / 6;
  }

  &.side-image-5 {
    grid-column: 3 / 6;
    grid-row: 3 / 7;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
