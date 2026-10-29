/* Click-to-load YouTube player.
 *
 * The YouTube iframe (and its cookies/JS) is only created after the visitor
 * presses the play control on a poster, which keeps the initial page light and
 * avoids third-party requests until they are wanted. The player itself is the
 * privacy-enhanced youtube-nocookie.com embed; autoplay is enabled only for
 * this user-initiated load.
 */
(function () {
  "use strict";

  /* If a YouTube thumbnail is unavailable, hide the image so the poster
   * background shows instead of a broken-image icon. */
  function guardThumbnails() {
    var thumbs = document.querySelectorAll("img[data-video-thumb]");

    Array.prototype.forEach.call(thumbs, function (img) {
      function hide() {
        img.style.visibility = "hidden";
      }
      img.addEventListener("error", hide, { once: true });
      if (img.complete && img.naturalWidth === 0) {
        hide();
      }
    });
  }

  function loadVideo(video) {
    var id = video.getAttribute("data-video-id");
    var poster = video.querySelector(".video__poster");
    if (!id || !poster || video.querySelector("iframe")) {
      return;
    }

    var frame = document.createElement("div");
    frame.className = "video__frame";

    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(id) +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    iframe.title = video.getAttribute("data-video-title") || "Research demo video";
    iframe.allow =
      "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");
    iframe.className = "video__iframe";

    frame.appendChild(iframe);
    poster.replaceWith(frame);
    iframe.focus();
  }

  function initVideos() {
    Array.prototype.forEach.call(document.querySelectorAll(".video__poster"), function (poster) {
      var video = poster.closest(".video");
      if (!video) {
        return;
      }
      /* The poster contains the play <button>; its click (mouse, Enter or
         Space) bubbles up to here, so one listener covers keyboard and touch. */
      poster.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          return;
        }
        loadVideo(video);
      });
    });
  }

  initVideos();
  guardThumbnails();
})();
