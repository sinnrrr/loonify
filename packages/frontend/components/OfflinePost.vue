<template>
  <div class="wrapper">
    <header>
      <section class="images">
        <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"
             alt="Image 1">
        <div>
          <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"
               alt="Image 1">
          <img src="https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg"
               alt="Image 1">
        </div>
      </section>
      <article>
        <main class="info">
          <h1>Lost orange cat near the city center school</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit rhoncus congue egestas fames libero
            amet
            purus
            iaculis vitae. Mi, urna molestie lorem sit et neque feugiat aliquet maecenas. Sed mattis lobortis
            orci
            laoreet.
            Posuere congue tortor, suspendisse maecenas gravida mattis viverra odio purus.</p>
          <section>
            <div>category1asfds</div>
            <div>dsr</div>
            <div>categorysdfssd dfsdf3</div>
            <div>category1asfds</div>
            <div>categor</div>
            <div>categorysdfssd dfsdf3</div>
            <div>category1asfds</div>
            <div>categor</div>
            <div>categorysdfssd dfsdf3</div>
          </section>
        </main>
        <aside>
          <h1>Have found or seen anything?</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit rhoncus congue egestas fames libero
            amet
            purus
            iaculis vitae. Mi, urna molestie lorem sit et neque feugiat aliquet maecenas. Sed mattis lobortis
            orci
            laoreet.
            Posuere congue tortor, suspendisse maecenas gravida mattis viverra odio purus.</p>
        </aside>
      </article>
    </header>
    <main class="main">
      <img src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"
           alt="Map location">
      <img src="https://miro.medium.com/max/1424/1*sHmqYIYMV_C3TUhucHrT4w.png" alt="QR code">
    </main>
    <footer>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg"
             width="30" height="30" viewBox="0 0 480.000000 480.000000"
             preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M0 2400 l0 -2400 2400 0 2400 0 0 2400 0 2400 -2400 0 -2400 0 0
-2400z m2100 1050 l0 -450 -450 0 -450 0 0 450 0 450 450 0 450 0 0 -450z
m1500 0 l0 -450 -450 0 -450 0 0 450 0 450 450 0 450 0 0 -450z m-1800 -1950
l0 -300 600 0 600 0 0 300 0 300 300 0 300 0 0 -600 0 -600 -1200 0 -1200 0 0
600 0 600 300 0 300 0 0 -300z"/>
          </g>
        </svg>
        <span class="logo-text">Loonify</span>
      </div>
      <span class="motto">Lost and Found of the Future</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'OfflinePost',
};
</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0;
  padding: 30px;

  width: 21cm;
  height: 29.7cm;
  border: 1px solid black;

  font-family: 'Rubik', sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

p {
  font-size: 14px;
}

header {
  display: flex;
  flex-direction: column;
}

aside {
  width: 40%;
  margin-left: 15px;
}

article {
  display: flex;
}

.images {
  display: flex;

  img {
    width: calc(60% - 15px);
    height: auto;
    margin-right: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-left: 15px;

    img {
      width: 100%;
    }

    img:nth-child(2n) {
      margin-top: 10px;
    }
  }
}

.info {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-right: 15px;

  section {
    display: flex;
    flex-wrap: wrap;

    div {
      font-size: 12px;
      margin-top: 10px;
      margin-right: 10px;
      border-radius: 10px;
      border: 1px solid black;
      padding: 2px 10px 2px 10px;
    }
  }
}

.main {
  display: flex;

  img:first-child {
    width: calc(60% - 15px);
    height: auto;
    margin-right: 15px;
  }

  img:last-child {
    width: calc(40% - 15px);
    height: auto;
    margin-left: 15px;
  }
}

footer {
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
}

span.logo-text {
  margin-left: 10px;
  font-weight: bold;
  font-size: 28px;
}

span.motto {
  font-size: 24px;
  font-weight: 500;
}
</style>
