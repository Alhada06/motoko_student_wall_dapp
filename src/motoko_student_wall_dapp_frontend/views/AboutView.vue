<script setup lang="ts">

const isDark = useDark({ 

  attribute:'data-theme',
  valueDark:'night',
  valueLight:'winter',
  storageKey: "app-theme-appearance",
})
const isDark2=useDark({storageKey:"isdark2"})
const toggleDark = useToggle(isDark)
const toggleDark2= useToggle(isDark2)
const input =ref(null);
const change=ref(false);
const theThoggle= ()=>{
  setTimeout(() => {
  toggleDark();
   toggleDark2();
}, 200);
}
const test=ref(isDark.value)


// const mode = useColorMode({attribute:'data-theme',modes:{dark:'night',light:'winter'}})


// const { state, next } = useCycleList(['night', 'winter'], { initialValue: mode.value })

// watchEffect(()=>mode.value=state.value as any)
</script>
<template>
  <div class=" w-full mb-[1500px] mt-10 scroll-pt-16 ">
    <h1>This is an about page</h1>
    <i-mdi-account-box style="font-size: 2em; color: red" />
    <button data-act-class="shadow-outline" data-set-theme="night" class="bg-green-700 focus:outline-none m-1 rounded p-2">Dark</button>
    <button @click="toggleDark(),toggleDark2()" class="btn-primary btn">Button</button>
    <div class="inline-block w-10">
      <span data-toggle-theme="dark" data-act-class="pl-4" class="border rounded-full border-green-700 flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out pl-0">
        <span class="rounded-full w-3 h-3 m-1 bg-green-700">
        </span>
      </span>
    </div>
    <div >
      <button @click="theThoggle" class="btn btn-secondary">toggle</button>
    <label  class="swap-rotate swap text-base-content">
      <!-- this hidden checkbox controls the state -->
      <input ref="input" v-model="test" @input.passive="theThoggle" type="checkbox" />

      <!-- sun icon -->

      <i-ic-outline-wb-sunny  class="swap-on h-10 w-10 fill-current" />
      <!-- moon icon -->

      <i-mdi-weather-night  class="swap-off h-10 w-10 fill-current" />
    </label></div>
    <!-- <div>mode{{mode}}</div> -->
    <div>test{{test}}</div>
    <div>isdark{{isDark}}</div>

    <div>
      <select data-choose-theme>
        <option value="">Default</option>
        <option value="night">Dark</option>
        <option value="winter">Pink</option>
      </select>
    </div>
    <div>
      <button data-set-theme="dark" data-act-class="dark">
        <i-mdi-weather-night class="text-base-100" />
      </button>
      <button data-set-theme="light" data-act-class="light">
        <i-ic-outline-wb-sunny class="text-base-100" />
      </button>
    </div>
    orem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris lorem, bibendum vitae lobortis sed, blandit eu felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec venenatis tellus augue, in dignissim ipsum molestie et. Donec lacus sapien, hendrerit ut tincidunt convallis, pellentesque non sapien. Cras lobortis hendrerit turpis in efficitur. Sed venenatis lacinia scelerisque. Donec malesuada nunc vel venenatis interdum.

    Quisque euismod accumsan elementum. Suspendisse aliquet nisi eget odio dignissim, vel dictum sem ullamcorper. Sed commodo arcu at condimentum iaculis. Vestibulum risus odio, sodales vel felis id, maximus tempor velit. Donec hendrerit sem non neque auctor, ac suscipit lorem imperdiet. Etiam tincidunt turpis in ligula varius, at fermentum risus consequat. Fusce non metus in nibh consequat sodales vel sed nibh. Vestibulum dignissim luctus mattis. Suspendisse quam risus, lacinia mattis cursus quis, mattis in neque.
    
    Nam fringilla mi tristique velit tempus consectetur. Duis tincidunt interdum neque vitae mattis. Phasellus feugiat efficitur metus, eu sagittis magna faucibus a. Nullam iaculis interdum mattis. Duis eget ultricies leo. Suspendisse nec imperdiet nunc, vel accumsan mi. Vivamus at lacus ac lorem aliquam rutrum. Integer arcu neque, elementum a porttitor eget, accumsan vel magna. Duis id convallis eros. Proin condimentum rutrum ante, a dictum nunc interdum sed. Vestibulum porta justo nec maximus volutpat. Cras mauris metus, sollicitudin vitae nisi eu, eleifend tristique felis. Vivamus volutpat bibendum mauris ac consectetur. Sed et tellus nec diam tristique placerat ut commodo est. Donec ac quam sed urna cursus fermentum.
    
    Sed eu fermentum tellus. Cras risus ligula, malesuada a augue vitae, fermentum auctor leo. Quisque sit amet turpis ultrices, accumsan quam efficitur, consequat nibh. Donec condimentum enim quis ipsum ullamcorper semper. In eget lorem sem. Sed at imperdiet odio, ac vestibulum odio. Maecenas sed egestas ipsum. Nullam venenatis nec lorem et vestibulum. Donec pulvinar pellentesque nunc et egestas. Proin tristique diam ac enim sollicitudin iaculis. Suspendisse a est eu dui pretium egestas.
    
    Nam auctor maximus auctor. Donec non arcu ac ante convallis pretium eu non lacus. In at dui at nisi feugiat malesuada. Suspendisse potenti. Curabitur in sapien risus. Fusce blandit orci at sagittis maximus. Morbi eu congue ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris blandit arcu id mi hendrerit, sed viverra dui condimentum.

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
