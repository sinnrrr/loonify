<template>
  <main>
    <Steps :components="input"/>
  </main>
</template>

<script>
import Type from "@/components/TypeStep";
import Location from "@/components/LocationStep";
import Category from "@/components/CategoryStep";

export default {
  data() {
    return {
      input: [Type, Location, Category]
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
