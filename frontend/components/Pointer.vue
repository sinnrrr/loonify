<template>
  <div class="cursor">
    <div ref="bigBall" class="cursor__ball cursor__ball--big ">
      <svg height="30" width="30">
        <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
      </svg>
    </div>
    <div ref="smallBall" class="cursor__ball cursor__ball--small">
      <svg height="10" width="10">
        <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Pointer",
    data: () => {
      return {
        bigBall: null,
        smallBall: null,
        hoverables: null
      }
    },
    mounted() {
      window.addEventListener('mousemove', this.onMouseMove)

      this.bigBall = document.querySelector('.cursor__ball--big');
      this.smallBall = document.querySelector('.cursor__ball--small');
      this.hoverables = document.querySelectorAll('.hoverable');

      for (let i = 0; i < this.hoverables.length; i++) {
        this.hoverables[i].addEventListener('mouseenter', this.onMouseHover);
        this.hoverables[i].addEventListener('mouseleave', this.onMouseHoverOut);
        this.hoverables[i].addEventListener('click', this.onMouseClick);
      }
    },
    methods: {
      onMouseMove: function (e) {
        TweenMax.to(this.$data.bigBall, .4, {
          x: e.pageX - 15,
          y: e.pageY - 15
        })
        TweenMax.to(this.$data.smallBall, .1, {
          x: e.pageX - 5,
          y: e.pageY - 7
        })
      },
      onMouseHover: function (e) {
        TweenMax.to(this.$data.bigBall, .3, {
          scale: 2
        })
      },
      onMouseHoverOut: function (e) {
        TweenMax.to(this.$data.bigBall, .3, {
          scale: 1
        })
      },
      onMouseClick: function (e) {
        TweenMax.to(this.$data.bigBall, .3, {
          scale: 3
        })
      }
    }
  }
</script>

<style scoped>
  .cursor {
    pointer-events: none;
  }

  .cursor__ball {
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: difference;
    z-index: 1000;
  }

  circle {
    fill: #f7f8fa;
  }
</style>
