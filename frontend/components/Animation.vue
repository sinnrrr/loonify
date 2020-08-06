<template>
  <section class="animation">
    <div class="block"></div>
    <div class="logo hoverable">
      <span>loonify</span>
      <p>Lost and found <br> of the future</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Animation",
  }
</script>

<style scoped>
  section {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 3;
    opacity: 0;
    user-select: none;
    background-color: var(--bs-indigo);
    animation: 3.5s ease-in-out fadeOut;
  }

  div.logo {
    display: flex;
    position: absolute;
    margin-top: 32px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    left: 50%;
    top: 0;
    transform: translateX(-65%);
    font-family: 'Rubik Mono One', sans-serif;
    color: var(--bs-gray-dark);
    animation: 3s ease-in-out opacity;
  }

  div.logo > span {
    font-size: 48px;
    line-height: 40px;
    letter-spacing: 1px;
  }

  div.logo > p {
    font-size: 18px;
    line-height: 18px;
    opacity: 80%;
  }

  div.block {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    animation: 3s ease-in-out scaleIn;
    background-color: var(--bs-yellow);
  }

  @keyframes scaleIn {
    0% {
      top: 50%;
      transform: translateY(-50%);
      height: 2px;
      width: 0;
    }

    40% {
      height: 2px;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }

    65% {
      height: 140px;
      top: 50%;
      transform: translateY(-50%);
    }

    80% {
      height: 140px;
      top: 50%;
      transform: translateY(-50%);
    }

    100% {
      height: 100%;
      top: 0;
    }
  }

  @keyframes opacity {
    0% {
      top: 50%;
      left: 50%;
      margin-top: 0;
      transform: translate(-60%, -50%);
      opacity: 0;
    }

    60% {
      top: 50%;
      left: 50%;
      margin-top: 0;
      transform: translate(-65%, -50%);
      opacity: 0;
    }

    80% {
      top: 50%;
      left: 50%;
      margin-top: 0;
      transform: translate(-65%, -50%);
      opacity: 100%;
    }

    100% {
      top: 0;
      left: 50%;
      transform: translateX(-65%);
      margin-top: 32px;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 100%;
    }

    90% {
      opacity: 100%;
    }

    100% {
      opacity: 0;
    }
  }
</style>
