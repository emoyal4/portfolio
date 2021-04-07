'use strict'

$(window).init(function () {
    renderPortfolio()
    renderModals()
    $('.btn-play-project')
})
 

function renderPortfolio() {
    var strHTMLs = getProjs().map(function (proj) {
        var str = `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#${proj.name}-Modal">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                     <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                <img class="img-fluid" src="./img/portfolio/${proj.name}-thumbnail.png" alt="">
            </a>
            <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
            </div>
        </div>`
        return str
    })
    var strHTML = strHTMLs.join('')
    $('.app-portfolio').html(strHTML)
}


function renderModals() {
    var strHTMLs = getProjs().map(function (proj) {
        var str = `
        <div class="portfolio-modal modal fade" id="${proj.name}-Modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="./img/portfolio/${proj.name}-thumbnail.png" alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                        <li>Date: ${proj.publishedAt}</li>
                        <li>Client: Threads</li>
                        <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>

                        <a href="${proj.url}">
                        <button class="btn btn-success btn-play-project" type="button">
                        <i class="fa fa-play"></i>
                        Play Now</button>
                        </a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
        return str
    })
    var strHTML = strHTMLs.join('')
    $('.modal-container').html(strHTML)
}


function sendMail() {
    var subjectStr = document.querySelector('.input-subject').value
    var messageStr = document.querySelector('.input-message').value
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to="&su=${subjectStr}&body=${messageStr}`
}