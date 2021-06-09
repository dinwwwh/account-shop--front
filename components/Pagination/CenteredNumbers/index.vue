<template>
  <nav
    class="
      border-t border-gray-200
      px-4
      flex
      items-center
      justify-between
      sm:px-0
    "
  >
    <!-- Previous page -->
    <div class="-mt-px w-0 flex-1 flex">
      <PaginationCenteredNumbersPreviousPage
        v-if="previousPage"
        @click="changePage(previousPage)"
      />
    </div>

    <div class="hidden md:-mt-px md:flex">
      <!-- First page -->
      <PaginationCenteredNumbersPage
        :highlighted="currentPage === 1"
        @click="changePage(1)"
      >
        1
      </PaginationCenteredNumbersPage>

      <!-- ... -->
      <PaginationCenteredNumbersTripleDot v-if="pages[0] > 2" />

      <!-- Pages -->
      <PaginationCenteredNumbersPage
        v-for="(page, i) in pages"
        :key="i"
        :highlighted="page === currentPage"
        @click="changePage(page)"
      >
        {{ page }}
      </PaginationCenteredNumbersPage>

      <!-- ... -->
      <PaginationCenteredNumbersTripleDot
        v-if="pages.slice(-1)[0] < lastPage - 1"
      />

      <!-- Last page -->
      <PaginationCenteredNumbersPage
        v-if="lastPage > 1"
        :highlighted="lastPage === currentPage"
        @click="changePage(lastPage)"
      >
        {{ lastPage }}
      </PaginationCenteredNumbersPage>
    </div>

    <!-- Next page -->
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <PaginationCenteredNumbersNextPage
        v-if="nextPage"
        @click="changePage(nextPage)"
      />
    </div>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'currentPage',
    event: 'changed',
  },
  props: {
    // last page number
    lastPage: {
      type: Number,
      required: true,
      default: 5000,
    },
    // current page up-to-date with parent scope
    currentPage: {
      type: Number,
      required: true,
      default: 300,
    },
    // Determine page quantity in per end
    quantityPerEnd: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      pages: [],
      previousPage: undefined,
      nextPage: undefined,
    };
  },
  watch: {
    currentPage() {
      this.generatePage();
    },
  },
  created() {
    this.generatePage();
  },
  methods: {
    generatePage() {
      this.pages = [];

      let minPage = this.currentPage - this.quantityPerEnd;
      while (minPage <= 1) {
        minPage++;
      }

      let maxPage = minPage + 2 * this.quantityPerEnd;
      while (maxPage >= this.lastPage) {
        maxPage--;
        if (minPage - 1 > 1) {
          minPage--;
        }
      }

      // Cases special
      if (minPage === 2 && maxPage < this.lastPage - 1) {
        maxPage++;
      }
      if (minPage === 3) {
        minPage--;
      }
      if (maxPage === this.lastPage - 1 && minPage > 2) {
        minPage--;
      }
      if (maxPage === this.lastPage - 2) {
        maxPage++;
      }

      for (let page = minPage; page <= maxPage; page++) {
        this.pages.push(page);
      }

      this.nextPage =
        this.currentPage < this.lastPage ? this.currentPage + 1 : null;
      this.previousPage = this.currentPage > 1 ? this.currentPage - 1 : null;
    },
    changePage(pageNumber) {
      this.$emit('changed', pageNumber);
    },
  },
};
</script>
