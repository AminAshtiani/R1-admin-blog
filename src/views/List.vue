<template>
  <div class="admin">
    <layout>
      <h2 class="text-left">All Posts</h2>
      <b-table
        :fields="fields"
        :items="articles"
        responsive
        head-variant="light"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template v-slot:cell(author)="data">
          {{ data.value.username }}
        </template>
        <template v-slot:cell(tagList)="data">
          {{ data.value.join() }}
        </template>
        <template v-slot:cell(body)="data">
          {{ data.value.substring(0, 20) }}
        </template>
        <template v-slot:cell(createdAt)="data">
          {{ moment(data.value).format("DD MMMM, YYYY") }}
        </template>
        <template v-slot:cell(actions)="row">
          <b-dropdown right split text="..." variant="info">
            <b-dropdown-item v-bind:to="'/admin/edit/' + row.item.slug"
              >Edit</b-dropdown-item
            >
            <b-dropdown-item @click="deleteItem(row.item.slug)"
              >Delete</b-dropdown-item
            >
          </b-dropdown>
        </template>
      </b-table>
      <!-- create a modal -->
      <b-modal id="modal-1" title="Delete Article" centered>
        <p class="my-4">Are you sure to delete Article?</p>
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              squared
              variant="danger"
              size="md"
              class="float-right"
              @click="confirmDelete"
            >
              Yes
            </b-button>
            <b-button
              squared
              variant="outline-secondary"
              class="float-right mr-1"
              size="md"
              @click="$bvModal.hide('modal-1')"
              >Button</b-button
            >
          </div>
        </template>
      </b-modal>
    </layout>
  </div>
</template>
<script>
import Layout from "@/components/Layout";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "List",
  components: {
    Layout,
  },
  data() {
    return {
      sortBy: 'createdAt',
      sortDesc: false,
      fields: [
        { key: "index", label: "#" },
        { key: "title", label: "Title", sortable: true},
        { key: "author", label: "Author", sortable: true},
        "tagList",
        "body",
        { key: "createdAt", label: "Created At", sortable: true},
        "actions",
      ],
      selectedPost: null,
    };
  },
  mounted() {
    this.$store.dispatch("getArticles");
  },
  computed: {
    ...mapGetters({
      articles: "getArticles",
    }),
  },
  methods: {
    moment: function() {
      return moment();
    },
    deleteItem: function(slug) {
      this.selectedPost = slug;
      this.$bvModal.show("modal-1");
    },
    confirmDelete() {
      this.selectedPost = "";
      this.$bvModal.hide("modal-1");
    },
  },
};
</script>
