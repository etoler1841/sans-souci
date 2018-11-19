const today = new Date()

document.addEventListener("DOMContentLoaded", () => {
  // Page setup....

  // Populate the navbar
  let sections = $(".section")
  createNavigation(sections)

  // Create units
  createUnits()

  // Random unit shown on load
  let $unitTabs = $("#unit-tabs .nav-item .nav-link");
  let index = Math.floor(Math.random() * $unitTabs.length)
  $unitTabs.eq(index).tab("show")

  // Contact form action
  $("#contact-form").attr("action", `mailto:${INFO.contact.email}`)

  // Copyright date
  if(today.getFullYear() > 2018) $("#copyright-date").innerText += " - " + today.getFullYear()

  // Determine screen size and adjust some elements' classes
  displaySize($(window).width())

  // Event listeners
  $(".nav-link").click(e => {
    $(".nav-item.active").removeClass("active")
    $(e.currentTarget).parent().addClass("active")
    $("#navbar-content").collapse("hide")
  })

  $(document).scroll(() => {
    let active = $("#navbar .nav-item.active").children(".nav-link").text()
    let pos = $(document).scrollTop()
    let stops = $(".scroll-stop")
    let current = "home"
    for(let stop of stops) {
      let stopPos = $(stop).position()
      if(stopPos.top <= pos) current = $(stop).attr("id").replace("-stop", "")
    }
    if(current !== active) {
      $("#navbar .nav-item.active").removeClass("active")
      let navItems = $("#navbar .nav-item")
      for(let item of navItems) {
        if($(item).text().toLowerCase().trim() === current) $(item).addClass("active")
      }
    }
  })

  $(".lightbox .fas").click(e => {
    let button = $(e.currentTarget)
    let currentUnit = parseInt($(button).parent().parent().parent().attr("id").replace("unit-", ""))
    let currentImg = $(button).siblings(".unit-image").children().attr("src")
    let imgNum = parseInt(currentImg.substr(currentImg.lastIndexOf("/") + 1, 1))
    let maxImg = 0
    for(unit of INFO.units) {
      if(unit.num === currentUnit) maxImg = unit.photos
    }
    let newImg
    switch(true) {
      case $(button).hasClass("fa-chevron-circle-left"):
        newImg = imgNum <= 1 ? maxImg : imgNum - 1
        setUnitImage(currentUnit, newImg)
        break
      case $(button).hasClass("fa-chevron-circle-right"):
        newImg = imgNum >= maxImg ? 1 : imgNum + 1
        setUnitImage(currentUnit, newImg)
        break
      default:
        return
    }
  })

  // $(window).resize(() => {console.log($(window).width())})
})

const createNavigation = (sections) => {
  let navLinks = []
  for(let section of sections) {
    let sectionName = $(section).attr("id")
    $(section).before(
      `<div id="${sectionName}-stop" class="scroll-stop" style="position: relative; top: -${$("#navbar").height() + 16}px"></div>`
    )
    navLinks.push(
      `<li class="nav-item">
        <a href="#${sectionName}-stop" class="nav-link">${sectionName}</a>
      </li>`
    )
  }
  $("#navbar-content ul").append(navLinks.join(""))
}

const createUnits = () => {
  let tabs = []
  let cards = []
  let options = []

  for(let unit of INFO.units) {
    tabs.push(
      `<li class="nav-item">
        <a data-toggle="pill" href="#unit-${unit.num}" class="nav-link">#${unit.num}</a>
      </li>`
    )
    cards.push(
      `<div id="unit-${unit.num}" class="tab-pane fade" role="tabpanel">
        <div class="container my-3 text-center">
          <div class="lightbox">
            <i class="fas fa-chevron-circle-left fa-3x"></i>
            <div class="unit-image"></div>
            <i class="fas fa-chevron-circle-right fa-3x"></i>
          </div>
        </div>
      </div>`
    )
    options.push(
      `<option value="${unit.num}">#${unit.num}</option>`
    )
  }
  $("#unit-tabs").html(tabs.join(""))
  $("#unit-cards").html(cards.join(""))
  $("#contact-unit").append(options.join(""))
  for(let unit of INFO.units) {
    setUnitImage(unit.num, 1)
  }
}

const setUnitImage = (unit, img) => {
  $(`#unit-${unit} .unit-image`).html(`<img src="./res/img/${unit}/${img}.jpg" class="card-img m-3" alt="" />`)
}

const displaySize = width => {

}