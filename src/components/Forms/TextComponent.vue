<template>
  <div class="q-px-md q-gutter-sm">
    <h3 class="title-text q-ma-none" v-if="title != ''">{{ title }}</h3>
    <q-editor
      class="full-height"
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Salve sua anotação',
          icon: 'save',
          label: 'Salvar',
          handler: saveWork
        }
      }"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: [String],
      default: ""
    }
  },
  data() {
    return {
      editor: ""
    };
  },
  methods: {
    saveWork() {
      this.$emit("newItem", this.editor);
    }
  }
};
</script>
<style scoped>
.title-text {
  font-size: 2em;
  line-height: 3rem;
}
</style>
