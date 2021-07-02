<template>
  <div class="py-10">
    <AccountImageSection :image-paths="images" />
    <div class="h-screen"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://thegioinickgame.vn/upload/photos/2020/06/2877/417d4e5b66260b662297ab9463764d94.jpg',
        'https://thegioinickgame.vn/upload/photos/2020/06/2877/0dd74464a5dde630f570a7c6c5342c1b.jpg',
        'https://thegioinickgame.vn/upload/photos/2020/06/2877/c5a5c0325939a5fd94da6570dd8222e7.jpg',
        'https://thegioinickgame.vn/upload/photos/2020/06/2877/196346df16de9439c91aae4bfbf61e8c.jpg',
        'https://thegioinickgame.vn/upload/photos/2020/06/2877/4402bf0802e7b3e210ace9f847c1b371.jpg',
      ],
    };
  },
};
</script>
