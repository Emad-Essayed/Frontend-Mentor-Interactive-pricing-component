/**
 * Sniffs for Older Edge or IE,
 * more info here:
 * https://stackoverflow.com/q/31721250/3528132
 */
function isOlderEdgeOrIE() {
  return (
    window.navigator.userAgent.indexOf("MSIE ") > -1 ||
    !!navigator.userAgent.match(/Trident.*rv\:11\./) ||
    window.navigator.userAgent.indexOf("Edge") > -1
  );
}

function valueTotalRatio(value, min, max) {
  return ((value - min) / (max - min)).toFixed(2);
}

function getLinearGradientCSS(ratio, leftColor, rightColor) {
  return [
    "-webkit-gradient(",
    "linear, ",
    "left top, ",
    "right top, ",
    "color-stop(" + ratio + ", " + leftColor + "), ",
    "color-stop(" + ratio + ", " + rightColor + ")",
    ")",
  ].join("");
}

function updateRangeEl(rangeEl) {
  var ratio = valueTotalRatio(rangeEl.value, rangeEl.min, rangeEl.max);

  rangeEl.style.backgroundImage = getLinearGradientCSS(
    ratio,
    "hsl(174, 77%, 80%)",
    "hsl(224, 65%, 95%)"
  );
}

function initRangeEl() {
  let rangeEl = document.querySelector("input[type=range]"),
    textEl = document.querySelector(".price-value");

  const style = document.createElement("style");
  const head = document.head || document.getElementsByTagName("head")[0];
  style.type = "text/css";
  head.appendChild(style);
  /**
   * IE/Older Edge FIX
   * On IE/Older Edge the height of the <input type="range" />
   * is the whole element as oposed to Chrome/Moz
   * where the height is applied to the track.
   *
   */
  if (isOlderEdgeOrIE()) {
    rangeEl.style.height = "20px";
    // IE 11/10 fires change instead of input
    // https://stackoverflow.com/a/50887531/3528132
    rangeEl.addEventListener("change", function (e) {
      textEl.innerHTML = "$" + e.target.value + ".00";
    });
    rangeEl.addEventListener("input", function (e) {
      textEl.innerHTML = "$" + e.target.value + ".00";
    });
  } else {
    updateRangeEl(rangeEl);
    rangeEl.addEventListener("input", function (e) {
      updateRangeEl(e.target);
      textEl.innerHTML = "$" + e.target.value + ".00";
    });

    rangeEl.addEventListener("mousedown", function () {
      this.classList.add("draged");
    });

    rangeEl.addEventListener("mouseup", function () {
      this.classList.remove("draged");
    });
  }
}

initRangeEl();
