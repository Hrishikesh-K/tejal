{
  "description": "Advertise four brands without using resources from the internet.",
  "index": 11,
  "resources": [{
    "src": "assets/img1.jpg",
    "title": "Allstar OOH ad"
  }, {
    "src": "assets/img2.png",
    "title": "Allstar Instagram ad 1"
  }, {
    "src": "assets/img3.png",
    "title": "Allstar Instagram ad 2"
  }, {
    "src": "assets/img4.jpg",
    "title": "Durex OOH ad"
  }, {
    "src": "assets/img5.jpg",
    "title": "Durex bus-stop ad"
  }, {
    "src": "assets/img6.gif",
    "title": "Hamilton Beach animated ad"
  }, {
    "src": "assets/img7.jpg",
    "title": "Hamilton Beach OOH ad"
  }, {
    "src": "assets/img8.png",
    "title": "Hershey's Instagram ad"
  }],
  "title": "Four Forty-Four"
}

For this project, the goal was to develop and steer the art in a direction that would help advertise a few brands. The challenge was to create everything from scratch without relying on any existing graphical resources.

## Allstar

<div
  data-masonry
  w-m = "t-5">
  <div
    w-m = "b-5"
    w-w = "full lg:masonryLg sm:masonrySm">
    <img
      alt = "Allstar OOH"
      data-lazy = "/projects/four-forty-four/assets/img1.jpg"
      height = "768"
      src = "/projects/four-forty-four/assets/img1-low.jpg"
      width = "1024"
      w-m = "b-5"
      w-object = "cover"
      w-transition = "duration-250 ease-in-out filter"
      w-w = "full"/>
  </div>
  <div
    w-m = "b-5"
    w-w = "full lg:masonryLg sm:masonrySm">
    <div
      data-gallery = '{"effect": "cards"}'
      w-m = "x-auto"
      w-max-w = "xs lg:sm"
      w-position = "relative"
      w-w = "card"
      x-data = "gallery">
      <div
        class = "swiper"
        w-text = "dark-500"
        w-w = "full">
        {{< gallery/buttons >}}
        <div
          class = "swiper-wrapper"
          w-w = "full">
          {{< gallery/slide "2" >}}
          {{< gallery/slide "3" >}}
        </div>
      </div>
      <div
        class = "swiper thumb"
        w-m = "t-5"
        w-w = "full">
        <div
          class = "swiper-wrapper"
          w-w = "full">
          {{< gallery/slide "2" >}}
          {{< gallery/slide "3" >}}
        </div>
      </div>
    </div>
  </div>
</div>

## Durex

{{< masonry end = "5" start = "4" >}}

## Hamilton Beach

{{< masonry end = "7" start = "6" >}}

## Hershey's

![Hershey's Instagram ad](assets/img8.png)