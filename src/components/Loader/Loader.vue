<template>
  <div class="loading">
    <p>Chargement...</p>
    <circles-to-rhombuses-spinner
      :animation-duration="1200"
      :circles-num="5"
      :circle-size="30"
      color="#01212C"
    />
  </div>
</template>

<script>
import { CirclesToRhombusesSpinner } from "epic-spinners";
export default {
  name: "Loader",
  components: { CirclesToRhombusesSpinner },
};
</script>

<style>
.loading {
  margin-top: 10%;
}
.loading > .circles-to-rhombuses-spinner {
  margin: 0 auto;
}
.loading > p {
  text-align: center;
  font-size: 30px;
}
</style>
