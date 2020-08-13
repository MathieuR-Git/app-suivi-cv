<template>
  <a @click="$router.go(-1)">
    <svg
      id="Composant_2_1"
      data-name="Composant 2 – 1"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 39 36"
    >
      <g
        id="Rectangle_15"
        data-name="Rectangle 15"
        fill="#fff"
        stroke="#000"
        stroke-width="3"
      >
        <rect width="36" height="36" rx="4" stroke="none" />
        <rect x="1.5" y="1.5" width="33" height="33" rx="2.5" fill="none" />
      </g>
      <rect
        id="Rectangle_16"
        data-name="Rectangle 16"
        width="33"
        height="16"
        transform="translate(6 10)"
        fill="#fff"
      />
      <path
        id="Icon_awesome-long-arrow-alt-left"
        data-name="Icon awesome-long-arrow-alt-left"
        d="M8.4,23.317H27.329c.415,0,.752-.467.752-1.044V17.4c0-.577-.337-1.044-.752-1.044H8.4V12.35c0-1.86-1.62-2.792-2.568-1.476L.441,18.361a2.694,2.694,0,0,0,0,2.953L5.835,28.8c.948,1.315,2.568.384,2.568-1.476Z"
        transform="translate(7.919 -2)"
      />
    </svg>
    <span> Retour</span>
  </a>
</template>

<script>
export default {
  name: "FaBack",
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
svg {
  margin-top: -4px;
}
span {
  margin-top: 5px;
  font-size: 30px;
  color: black;
}
</style>
