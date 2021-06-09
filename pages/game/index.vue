<template>
  <div>
    <UnderHeader :divide-line="true">
      <HeadingWithAction> Danh sách game này hơi dài </HeadingWithAction>
    </UnderHeader>

    <FrameBox>
      <div class="grid grid-cols-5 mb-8">
        <SearchBase
          class="col-start-4 col-span-2"
          placeholder="search..."
        ></SearchBase>
      </div>
      <GameList class="mb-4" :games="games"></GameList>
      <PaginationCenteredNumbers v-model="currentPage" :last-page="7" />
    </FrameBox>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      currentPage: 4,
      games: [
        {
          id: 1,
          name: 'lang la',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
        {
          id: 2,
          name: 'ngoc rong',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
        {
          id: 2,
          name: 'ngoc rong',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
        {
          id: 2,
          name: 'ngoc rong',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
        {
          id: 2,
          name: 'ngoc rong',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
        {
          id: 2,
          name: 'ngoc rong',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
        {
          id: 2,
          name: 'ngoc rong',
          publisherName: 'sohagame',
          imagePath:
            'https://images.all-free-download.com/images/graphicthumb/beautiful_scenery_02_hd_picture_166319.jpg',
        },
      ],
    };
  },
};
</script>
