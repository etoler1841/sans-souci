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

  // Copyright date
  if(today.getFullYear() > 2018) $("#copyright-date").innerText += " - " + today.getFullYear()

  // Event listeners
  $("#navbar .nav-link").click(e => {
    $("#navbar .nav-item.active").removeClass("active")
    $(e.target).parent().addClass("active")
    navScroll(e)
    $("#navbar-content").collapse("hide")
  })

  $(document).scroll(() => {
    let active = $("#navbar .nav-item.active").children(".nav-link").text()
    let pos = $(document).scrollTop()
    let sections = $(".section")
    let current = "home"
    if(pos + $(window).height() >= $("body").height()) {
      current = $("#section:last-child").attr("id")
    } else {
      for(let section of sections) {
        let sectPos = $(section).position().top
        if(sectPos <= pos + $("#navbar").height() + 17) current = $(section).attr("id")
      }
    }
    if(current !== active) {
      $("#navbar .nav-item.active").removeClass("active")
      let navItems = $("#navbar .nav-item")
      for(let item of navItems) {
        if($(item).text().toLowerCase().trim() === current) $(item).addClass("active")
      }
    }
  })
})

const createNavigation = (sections) => {
  let navLinks = []
  for(let section of sections) {
    let sectionName = $(section).attr("id")
    navLinks.push(
      `<li class="nav-item">
        <a href="#${sectionName}" class="nav-link">${sectionName}</a>
      </li>`
    )
  }
  $("#navbar-content ul").append(navLinks.join(""))
}

const navScroll = e => {
  e.preventDefault()
  let target = $(e.target).attr("href")
  let dropdownHeight = $("#navbar .navbar-collapse.show").height()
  $(window).scrollTop($(target).position().top - $("#navbar").height() + (dropdownHeight ? dropdownHeight : 0) - 16)
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
          ${createUnitImages(unit)}
        </div>
      </div>`
    )
    options.push(
      `<option value="${unit.num}">#${unit.num}</option>`
    )
  }
  $("#unit-tabs").html(tabs.join("\n"))
  $("#unit-cards").html(cards.join("\n"))
  $("#contact-unit").append(options.join("\n"))
}

const createUnitImages = unit => {
  let images = []
  for(let i = 1; i <= unit.photos; i++) {
    images.push(
      `<a href="./res/img/${unit.num}/${i}.jpg" data-lightbox="unit-${unit.num}"><img src="./res/img/${unit.num}/${i}.jpg" class="thumbnail" alt="" /></a>`
    )
  }
  return images.join("\n")
}