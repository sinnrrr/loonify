<template>
  <main>
    <Steps :components="input" type="edit"/>
  </main>
</template>

<script>
import Type from "@/components/TypeStep";
import Location from "@/components/LocationStep";
import Category from "@/components/CategoryStep";
import General from "@/components/GeneralStep";
import Review from "@/components/ReviewStep";

export default {
  data() {
    return { input: [Type, Location, Category, General, Review] }
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

