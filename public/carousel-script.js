document.addEventListener("click", e => {
  let handle
  if (e.target.matches(".handle")) {
    handle = e.target
  } else {
    handle = e.target.closest(".handle")
  }
  if (handle != null) onHandleClick(handle)
})

const throttleProgressBar = throttle(() => {
  console.log("throttleProgressBar")
  document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
}, 250)

//throttleProgressBar()
//window.onpageshow = function() {throttleProgressBar()};
//window.addEventListener("pageshow", throttleProgressBar);
// document.addEventListener('pageshow', (event) => {
//   console.log("pageshow event")
//   if (event.persisted) {
//     // page was restored from the bfcach
//     // Do your reload or re-render page with data
//     console.log("pageshow event persisted")
//     throttleProgressBar()
//   }
// });
window.addEventListener("DOMContentLoaded", throttleProgressBar());
window.addEventListener("load", throttleProgressBar());

// window.addEventListener('readystate', (event) => {
//   console.log("readystate event")
// });

document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)

function calculateProgressBar(progressBar) {
  //console.log("calculate progress bar: ", progressBar)
  progressBar.innerHTML = ""
  const slider = progressBar.closest(".row").querySelector(".slider")
  const itemCount = slider.children.length
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  )
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1)
    sliderIndex = progressBarItemCount - 1
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div")
    barItem.classList.add("progress-item")
    if (i === sliderIndex) {
      barItem.classList.add("active")
    }
    progressBar.append(barItem)
  }
}

function onHandleClick(handle) {
  //console.log("HANDLE: " , document.querySelector(".slider"))
  const progressBar = handle.closest(".row").querySelector(".progress-bar")
  //const slider = handle.closest(".container").querySelector(".slider")
  const slider = document.querySelector(".slider");
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const progressBarItemCount = progressBar.children.length
  if (handle.classList.contains("left-handle")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[progressBarItemCount - 1].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex - 1].classList.add("active")
    }
  }

  if (handle.classList.contains("right-handle")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[0].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex + 1].classList.add("active")
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}
