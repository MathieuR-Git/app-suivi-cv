<template>
  <section>
    <h2>
      Détail de l'offre : <span id="idOffre">{{ job.idOffre }}</span>
    </h2>
    <hr class="solid" />
    <article>
      <p>identifiant de l'offre : {{ job.idOffre }}</p>
      test
    </article>
    <article>
      <p>identifiant de l'offre : {{ job.idOffre }}</p>
      test
    </article>
  </section>
</template>

<script>
export default {
  name: "JobInfo",
  props: ["job"],
  methods: {},
};
</script>
<style scoped>
#idOffre {
  text-decoration: underline;
  font-style: italic;
  text-transform: uppercase;
}
</style>
