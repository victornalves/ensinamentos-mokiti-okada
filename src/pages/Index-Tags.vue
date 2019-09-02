<template>
  <q-page class="flex justify-start items-center column">

    <h1>Ensinamentos de Mokiti Okada</h1>
    <p>Um guia sobre onde encontrar os ensinamentos de Meishu-Sama</p>
    <p>Digite abaixo um trecho do nome e veja onde foi publicado</p>

    <q-input outlined v-model="filtro" label="Busca" />

    <q-list class="q-my-md" v-if="getTeachings().length">
      <q-item v-for="(teaching, index) in getTeachings()" :key="index">
        <q-item-section>
          <q-item-label>{{index+1}} - {{teaching.name}}</q-item-label>
          <q-item-label caption>
            <span v-for="(meta, index) in teaching.meta" :key="index">
              <span><strong>{{meta.key}}:</strong></span> {{meta.value}}
            </span>
          </q-item-label>
          <q-item-label caption><strong>Tags:</strong>
            <span v-for="(tag, index) in teaching.tags" :key="index">
              {{tag.name}}
            </span>
            <span @click="promptTag(teaching.id)">Adicionar</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-my-md" v-else-if="!loading">Não há ensinamentos com a busca <strong>{{filtro}}</strong></div>
    <div class="q-my-md" v-else>Carregando</div>

    <div class="q-my-md text-center"><em>Esse aplicativo foi desenvolvido pela comunidade messiânica.
      <BR/>Contribua em <a href="https://github.com/victornalves/ensinamentos-mokiti-okada" target="_blank">https://github.com/victornalves/ensinamentos-mokiti-okada</a>
      <BR/>Ideias de melhorias ou de outros aplicativos? Envie uma mensagem para <a href="mailto:victor@w16.com.br" target="_blank">victor@w16.com.br</a>
    </em></div>

    <q-dialog v-model="prompt" persistent position="bottom">
      <q-card>
        <q-card-section>
          <div class="text-h6">Nova Tag</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newTag" autofocus @keyup.enter="submitTag" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar tag" @click="submitTag" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<style>
</style>

<script>
import { mapState } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      filtro: "",
      prompt: false,
      newTag: '',
      newTagTeachingId: ''
    };
  },
  beforeMount() {
    this.$store.dispatch("database/loadData");
  },
  computed: {
    loading() {
      return this.$store.state.database.loading;
    }
  },
  methods: {
    getTeachings(){
      return this.$store.state.database.teachings_view.filter(t => {
          let name = t.name.toLowerCase().normalize("NFD");
          let tags = t.tags.map(t=>t.name).join(',').toLowerCase().normalize("NFD");

          return  name.includes(this.filtro.toLowerCase().normalize("NFD")) ||
                  tags.includes(this.filtro.toLowerCase().normalize("NFD"))
        }
      )
    },
    promptTag(teaching_id) {
      this.newTagTeachingId = teaching_id;

      console.log('Prompt for ' + this.newTagTeachingId);
      this.newTag = '';
      this.prompt = true;
    },
    submitTag() {
      this.prompt = false;
      console.log(`TODO: Add nova tag '${this.newTag}' para teaching ${this.newTagTeachingId}`)
    }
  }
};
</script>

<style scoped>
  .q-page {
    border: 1rem solid var(--q-color-primary);
  }
  .q-list {
    text-align: center;
  }
  @media (min-width: 1024px) {
    .q-list {
      text-align: left;
    }
  }
  h1 {
    font-size: 2rem;
    line-height: 3rem;
    text-align: center;
  }

  p {
    padding: 0 1rem;
    text-align: center;
  }

</style>
