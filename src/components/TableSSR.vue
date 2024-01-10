<template>
  <VxTable
    ref="tableSSR"
    :search="search"
    pagination
    :key="tableKey"
    :currentPage="currentPage"
    :data="dataFetch.data"
    :max-items="perPage"
    notSpacer
    stripe
    @search="handleSearch"
    @change-page="handleChangePage"
    :sst="true"
    :total="totalItems"
  >
    <template slot="header">
      <h3 class="ml-3">
        {{ title }}
      </h3>
      <div class="w-full flex float-right text-right justify-end">
        <slot name="actions"></slot>
      </div>
    </template>
    <template slot="thead">
      <slot name="head"></slot>
    </template>

    <template slot-scope="{ data }">
      <slot name="body" :data="data"></slot>
    </template>
  </VxTable>
</template>

<script>
import useHTTP from "@/common/mixins/useHTTP";
import VxTable from "@/components/vx-table/VxTable";

export default {
  mixins: [useHTTP],
  components: { VxTable },
  props: {
    route: { type: String, default: "" },
    search: { type: Boolean, default: false },
    customSearch: { type: String, default: "" },
    customPageChange: { type: String, default: "" },
    customInit: { type: String, default: "" },
    title: { type: String, default: "" },
    currentPage: { type: Number, default: 1 }
  },
  data: () => ({
    totalItems: 0,
    perPage: 20,
    tableKey: 0,
    searchKey: "",
    dataFetch: { data: [] }
  }),
  methods: {
    async handleSearch(searching) {
      this.dataFetch = await this.fetchData(
        `${this.route}?search=${searching}&${this.customSearch}`
      );
      this.searchKey = searching;
      this.totalItems = this.dataFetch.meta.total;
      this.perPage = this.dataFetch.meta.per_page;
    },
    async handleChangePage(page) {
      this.$emit("pageChange", page);
      if (
        this.searchKey != null &&
        this.searchKey != undefined &&
        this.searchKey != ""
      ) {
        this.dataFetch = await this.fetchData(
          `${this.route}?page=${page}&${this.customPageChange}&search=${this.searchKey}`
        );
      } else {
        this.dataFetch = await this.fetchData(
          `${this.route}?page=${page}&${this.customPageChange}`
        );
      }
      this.totalItems = this.dataFetch.meta.total;
      this.perPage = this.dataFetch.meta.per_page;
    }
  },
  async mounted() {
    this.dataFetch = await this.fetchData(`${this.route}?${this.customInit}`);
    this.totalItems = this.dataFetch.meta.total;
    this.perPage = this.dataFetch.meta.per_page;
  }
};
</script>
