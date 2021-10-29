<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">28</span>
      <span class="mx-1 fs-5">Octubre</span>
      <span class="mx-2 fw-light">2021, Jueves</span>
    </div>
    <div class="entry-description">
      Cupidatat enim consequat qui cillum. Sunt tempor exercitation ullamco
      labore excepteur veniam velit dolore aliqua reprehenderit. Excepteur
      cupidatat commodo voluptate irure veniam aliquip proident. Eu consequat
      pariatur veniam quis aliqua elit incididunt irure do consequat deserunt
      ipsum incididunt proident. Sit proident minim id sint ipsum duis labore
      sunt ullamco voluptate proident commodo.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }
  .entry-description {
    font-size: 12px;
  }
}
</style>
