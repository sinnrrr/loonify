<template>
  <b-modal
    v-model='modalActive'
    :on-cancel='onCancel'
    trap-focus
    has-modal-card
    scroll='keep'>
    <template #default='props'>
      <auth-form @close='props.close' />
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'AuthModal',
  data() {
    return {
      modalActive: true,
    };
  },
  methods: {
    onCancel() {
      this.$router.push({ name: 'index' });
    },
  },
};
</script>
