<template>
  <div class="q-pa-md">
    <q-card
      style="max-width: 100%; height: 300px; background-color: yellow"
      class="q-pa-sm"
    >
      <div style="background-color: white; height: 100%">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton height="100px" square />

        <q-item-section class="q-pa-lg">
          <q-skeleton type="text" />
          <q-skeleton type="text" />
        </q-item-section>
      </div>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'LoadItem'
}
</script>
